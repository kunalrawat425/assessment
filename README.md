
## Documentation


[Backend]

```bash
$ cd backend
```

**Docker way:**


Create an image first - right click Dockerfile in visualstudio and build image with name 'postgres'

Run container 

```bash
docker run -d --name postgresCont -p 5432:5432  postgres
```

Run migration - npx prisma migrate dev 


**Normal way:**- If already postgre installed

Create db name 'Taskphin'

open .env and change user name and password with local postgre setup

Repo setup

**Install dependencies**
```bash
npm i
```

Start backend server
```bash
npm run dev
```

Open env file 

Change user name and password with local postgre

create db with name 'Taskphin'

[Frontend]

**Install dependencies**

```bash
cd frontend
```

```bash
npm i
```

Start frontend server

```bash
npm run dev
```

Open page http://localhost:3030/register



**Postman link**

https://orange-meadow-2678-1.postman.co/workspace/Team-Workspace~c9ff4a7f-3b85-42a7-8de8-5b81fab3a93b/collection/27508525-9fe28927-914c-4608-8958-9ea84374464d?action=share&creator=27508525


