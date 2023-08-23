const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const groups = [{ name: "a" }, { name: "b" }];

const fileName = [
  "idea.mp3",
  "One_Einstein_Is_Worth_A_Legion_Of_P_(getmp3.pro).mp3",
  "Its_Mind_Blowing_That_Our_Minds_Ca_(getmp3.pro).mp3",
  "This Book Changed the Way I Think.mp3",
  "We Can’t Prove Most Theorems with Known Physics.mp3",
  "The Multiverse.mp3",
  "Science_Broadens_Our_Vision_of_Real_(getmp3.pro).mp3",
  "Science_Advances_One_Funeral_at_a_T_(getmp3.pro).mp3",
  "We_Are_Qualitatively_Different_From_(getmp3.pro).mp3",
  "Were_All_Equal_in_Our_Infinite_Ign_(getmp3.pro).mp3",
  "Dont_Rely_on_Credibility_Stamps_(getmp3.pro).mp3",
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
            file_name: fileName[i],
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
