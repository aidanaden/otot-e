import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "src/server/db/client";
import {
  activityRouter,
  AddActivitySchemaType,
} from "src/server/trpc/router/activity";

const generatedActivity: AddActivitySchemaType = {
  name: "generated name",
  category: {
    name: "generated category",
  },
  location: "generated location",
};

const generate = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const caller = activityRouter.createCaller({
    prisma,
    session: null,
  });

  switch (method) {
    case "GET" || "POST":
      try {
        for (let i = 0; i < 1000; i++) {
          await caller.add(generatedActivity);
        }
        return res.status(200).json({ statusCode: 200, message: "success" });
      } catch (err: any) {
        return res.status(500).json({ statusCode: 500, message: err.message });
      }
    default:
      return res
        .status(405)
        .json({ success: false, message: `Method ${method} Not Allowed` });
  }
};

export default generate;
