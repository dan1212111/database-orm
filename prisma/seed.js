const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdCustomer = await prisma.customer.create({
    data: {
      name: "Alice",
      contact: {
        create: { phone: "0771715246", email: "alice@yahoo.com" },
      },
    },
  });

  console.log("Customer created", createdCustomer);

  // Add your code here

  const createdMovie = await prisma.movie.create({
    data: {
      title: "Dark Knight",
      runTimeMins: 145,
    },
  });

  console.log("Movie created", createdMovie);

  const createdScreen = await prisma.screen.create({
    data: {
      number: 1,
    },
  });

  console.log("Screen created", createdScreen);

  const createdScreening = await prisma.screening.create({
    data: {
      startsAt: new Date(Date.parse("2022-10-01")),
      movieId: createdMovie.id,
      screenId: createdScreen.id,
    },
  });

  console.log("Screening created", createdScreening);

  const createdTicket = await prisma.ticket.create({
    data: {
      customerId: createdCustomer.id,
      screeningId: createdScreening.id,
    },
  });


  console.log("ticket created", createdTicket);

  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
