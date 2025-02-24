const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function generatePhone() {
  const number = Math.floor(Math.random() * 9000000000) + 1000000000;
  return `+91${number}`;
}

async function main() {
  await prisma.issuance.deleteMany();
  await prisma.book.deleteMany();
  await prisma.category.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.member.deleteMany();

  const memberPromises = [];
  for (let i = 1; i <= 25; i++) {
    memberPromises.push(
      prisma.member.create({
        data: {
          mem_name: `Member ${i}`,
          mem_phone: generatePhone(),
          mem_email: `member${i}@example.com`,
        },
      }),
    );
  }
  const members = await Promise.all(memberPromises);

  const collections = [];
  const collectionNames = ["Fiction", "Non-Fiction", "Science"];
  for (const name of collectionNames) {
    const collection = await prisma.collection.create({
      data: {
        collection_name: name,
      },
    });
    collections.push(collection);
  }

  const categories = [];
  const categoryData = [
    { cat_name: "Sci-Fi", sub_cat_name: "Dystopia" },
    { cat_name: "Biography", sub_cat_name: "Historical" },
    { cat_name: "History", sub_cat_name: "Modern" },
  ];
  for (const cat of categoryData) {
    const category = await prisma.category.create({
      data: {
        cat_name: cat.cat_name,
        sub_cat_name: cat.sub_cat_name,
      },
    });
    categories.push(category);
  }

  const bookPromises = [];
  for (let i = 1; i <= 25; i++) {
    const randomCollection =
      collections[Math.floor(Math.random() * collections.length)];
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    bookPromises.push(
      prisma.book.create({
        data: {
          book_name: `Book ${i}`,
          book_cat_id: randomCategory.cat_id,
          book_collection_id: randomCollection.collection_id,
          book_launch_date: new Date(
            2023,
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28) + 1,
          ),
          book_publisher: `Publisher ${i}`,
        },
      }),
    );
  }
  const books = await Promise.all(bookPromises);

  const issuancePromises = [];
  for (let i = 1; i <= 25; i++) {
    const randomMember = members[Math.floor(Math.random() * members.length)];
    const randomBook = books[Math.floor(Math.random() * books.length)];
    const today = new Date();
    const targetReturnDate = new Date();
    targetReturnDate.setDate(today.getDate() + Math.floor(Math.random() * 5));

    issuancePromises.push(
      prisma.issuance.create({
        data: {
          book_id: randomBook.book_id,
          issuance_date: today,
          issuance_member: randomMember.mem_id,
          issued_by: `Librarian ${Math.floor(Math.random() * 5) + 1}`,
          target_return_date: targetReturnDate,
          issuance_status: "pending",
        },
      }),
    );
  }
  await Promise.all(issuancePromises);

  console.log("Seeds added");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
