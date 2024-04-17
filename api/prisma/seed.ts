import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { argon2id, hash } from 'argon2';
import slug from 'slug';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'example@example.com',
      password: await hash('example', { type: argon2id }),
    },
  });

  const worlds = ['Faerûn', 'Golarion', 'Azeroth'].map(async (world) => {
    return prisma.world.create({
      data: {
        name: world,
        slug: slug(world),

        users: {
          create: [
            {
              assignedBy: user.id,
              assignedAt: new Date(),
              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          ],
        },
        categories: {
          create: [
            {
              title: 'Locations',
              slug: 'locations',
            },
            {
              title: 'People',
              slug: 'people',
            },
            {
              title: 'Factions',
              slug: 'factions',
            },
            {
              title: 'Items',
              slug: 'items',
            },
          ],
        },
      },
    });
  });

  for await (const world of worlds) {
    for (let i = 0; i < 50; i++) {
      const blocks = [];

      for (let x = 0; x < faker.number.int({ min: 2, max: 10 }); x++) {
        blocks.push({
          content: faker.lorem.paragraph(),
          revealed: Boolean(faker.number.int({ min: 0, max: 1 })),
          order: x,
        });
      }

      const title = faker.lorem.words({ min: 2, max: 4 });

      await prisma.page.create({
        data: {
          title,
          slug: slug(title),
          world: {
            connect: {
              id: world.id,
            },
          },
          categories: {
            connect: faker.helpers
              .arrayElements(['locations', 'people', 'factions', 'items'], {
                min: 1,
                max: 3,
              })
              .map((category) => ({
                worldId_slug: {
                  worldId: world.id,
                  slug: category,
                },
              })),
          },
          blocks: {
            createMany: {
              data: blocks,
            },
          },
        },
      });
    }
  }
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
