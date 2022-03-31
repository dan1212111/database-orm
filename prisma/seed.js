const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function seed() {
  const date = new Date(Date.parse("2022-10-01"))

  const createdCustomer = await prisma.customer.create({
    data: {
      name: "Alice",
      contact: {
        create: { phone: "0771715246", email: "alice@yahoo.com" },
      },
    },
  })

  console.log("Customer created", createdCustomer)

  // Add your code here

  const createdMovie = await prisma.movie.create({
    data: {
      title: "Dark Knight",
      runTimeMins: 145,
      screening: {
        create: [{ startsAt: date }],
      },
    },
  })

  console.log("Movie created", createdMovie)

  //   const createdScreening = await prisma.screening.create({
  //     data: {
  //       startsAt: date,
  //     },
  //   })

  //   console.log("Screening created", createdScreening)

  // Don't edit any of the code below this line
  process.exit(0)
}

seed().catch(async (error) => {
  console.error(error)
  await prisma.$disconnect()
  process.exit(1)
})
