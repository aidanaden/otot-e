import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

import { env } from "src/env/server.mjs";
import { prisma } from "src/server/db/client";
import { activityRouter } from "src/server/trpc/router/activity";

const redis = new Redis({ host: env.REDIS_HOST, port: env.REDIS_PORT });

const activity = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  const caller = activityRouter.createCaller({
    prisma,
    session: null,
  });

  switch (method) {
    case "GET":
      const cache = await redis.get("activities");
      if (cache) {
        return res.status(200).json(JSON.parse(cache));
      }
      try {
        const activities = await caller.getAll();
        await redis.set("activities", JSON.stringify(activities), "EX", 10);
        return res.status(200).json(activities);
      } catch (err: any) {
        return res.status(500).json({ statusCode: 500, message: err.message });
      }
    case "POST":
      try {
        const newActivity = await caller.add(body);
        return res.status(200).json(newActivity);
      } catch (err: any) {
        return res.status(500).json({ statusCode: 500, message: err.message });
      }
    default:
      return res
        .status(405)
        .json({ success: false, message: `Method ${method} Not Allowed` });
  }
};

export default activity;
