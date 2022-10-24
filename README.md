# CS3219 OTOT Task E

- **Name**: Ryan Aidan
- **Matric. Number**: A0218327E
- **Repo Link**: [https://github.com/aidanaden/otot-e](https://github.com/aidanaden/otot-e)

## Tech stack used

- [Next.JS](https://nextjs.org/learn/foundations/about-nextjs) (frontend + backend API routes via nextjs' serverless functions)
- [TailwindCSS](https://tailwindcss.com/) (frontend styling)
- [Prisma](https://www.prisma.io/docs/concepts/overview/what-is-prisma) (database ORM)
- MySQL (database used)
- [tRPC](https://trpc.io/docs/v10/) (used to set up API routes with end-to-end typesafety)

## Task E: Backend cache

### Requirements

1. MySQL (SQL database used)
2. NodeJS >= `v14.19.2`
3. [Postman](https://www.postman.com/) is used to (manually) test CRUD for the API.

### Local Deployment

1. Install docker by clicking [here](https://docs.docker.com/get-docker/)

2. Install pnpm by clicking [here](https://pnpm.io/installation)

3. Copy the `.env-example` file to `.env` and paste the following:

```bash
# Prisma
DATABASE_URL=mysql://root:root@localhost:3369/mysqldb

# Next Auth
NEXTAUTH_SECRET=secret

# Calendarific
CALENDARIFIC_API_KEY=00e9be3d9730c3d5504e5c4794788bc428cdeea5

# Redis
REDIS_HOST=localhost
REDIS_PORT=6380
```

4. Run the following commands to deploy the app locally

```bash
# install packages
pnpm install

# start local mysql db, deploy schema, build source files
pnpm build:local

# run locally
pnpm start
```

### Verify successful deployment

Run the following commands to verify successful local deployment

```bash
# query the /api/activity endpoint
curl http://localhost:3000/api/activity

# expected output
[]
```

Visit `http://localhost:3000` to confirm successful frontend deployment

### Testing via Postman

Import the Postman collection via [this link](https://www.getpostman.com/collections/d9923d273d016d416698).

Explanation of HTTP requests:

- `activity`: get all activities in database
- `activity/generate`: generate 1000 test activities

Note:

- `params` and `body` would need to be updated manually, where they are necessary.

### Screenshots

#### Generate 1000 activities for testing

![generate test activities](https://i.ibb.co/h8D9Y8v/image.png)

#### First fetch 1000 activities

![first fetch](https://i.ibb.co/J7g4bk8/image.png)

#### Subsequent fetches

![subsequent fetches](https://i.ibb.co/Hp9kX3M/image.png)
