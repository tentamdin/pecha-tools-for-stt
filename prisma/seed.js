const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const groups = [{ name: "a" }, { name: "b" }];

const url = [
  "https://d38pmlk0v88drf.cloudfront.net/wav/STT_NS0007_0011_98134_to_107733.wav",
"https://d38pmlk0v88drf.cloudfront.net/wav/STT_NS0007_0011_98134_to_107733.wav",
"https://d38pmlk0v88drf.cloudfront.net/wav/STT_NS0007_0011_98134_to_107733.wav",
"https://d38pmlk0v88drf.cloudfront.net/wav/STT_NS0007_0011_98134_to_107733.wav",
"https://d38pmlk0v88drf.cloudfront.net/wav/STT_NS0007_0011_98134_to_107733.wav",
"https://d38pmlk0v88drf.cloudfront.net/wav/STT_NS0007_0011_98134_to_107733.wav",
"https://d38pmlk0v88drf.cloudfront.net/wav/STT_NS0007_0011_98134_to_107733.wav",
"https://d38pmlk0v88drf.cloudfront.net/wav/STT_NS0007_0011_98134_to_107733.wav",
"https://d38pmlk0v88drf.cloudfront.net/wav/STT_NS0007_0011_98134_to_107733.wav",
"https://d38pmlk0v88drf.cloudfront.net/wav/STT_NS0007_0011_98134_to_107733.wav",
"https://d38pmlk0v88drf.cloudfront.net/wav/STT_NS0007_0011_98134_to_107733.wav",
];

async function main() {

  // create  group
  const numGroup = await prisma.group.createMany({
    data: groups,
  });
  const groupList = await prisma.group.findMany();
  console.log("goup count", numGroup, "group list", groupList);

  // create user for group
  const userList = await Promise.all(
    groupList.map(async (group) => {
      console.log("group", group);
      const users = [];
      for (let i = 1; i <= 5; i++) {
        const user = await prisma.user.create({
          data: { name: group.name + i, group_id: group.id },
        });
        users.push(user);
      }
      console.log("no of users created", users.length);
    })
  );
  console.log("user created", userList);

  // create task
  const taskList = await Promise.all(
    groupList.map(async (group) => {
      const tasksForGroup = [];
      for (let i = 0; i < 11; i++) {
        const task = await prisma.task.create({
          data: {
            group_id: group.id,
            inference_transcript: "dummy transcript",
            file_name: `file no ${i}`,
            url: url[i]
          },
        });
        console.log("task", task);
        tasksForGroup.push(task);
      }
      return tasksForGroup;
    })
  );
  console.log("taskList", taskList);

}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
