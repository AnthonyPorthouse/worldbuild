import { Injectable } from '@nestjs/common';
import { Page, Prisma } from '@prisma/client';
import slug from 'slug';
import { DatabaseService } from 'src/database/database.service';
import { CreatePageDto } from './createPage.dto';
import { UpdatePageDto } from './updatePage.dto';

@Injectable()
export class PagesService {
  constructor(private readonly db: DatabaseService) {}

  async pages(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PageWhereUniqueInput;
    where?: Prisma.PageWhereInput;
    orderBy?: Prisma.PageOrderByWithRelationInput;
    include?: Prisma.PageInclude;
  }): Promise<Page[]> {
    const { skip, take, cursor, where, orderBy, include } = params;

    return this.db.page.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async page(worldId: string, slug: string): Promise<Page> {
    const world = await this.db.world.findUniqueOrThrow({
      where: {
        slug: worldId,
      },
    });

    console.log(world, slug);

    const page = await this.db.page.findUnique({
      where: {
        worldId_slug: { worldId: world.id, slug },
      },
      include: {
        blocks: {
          orderBy: {
            order: 'asc',
          },
        },
        world: true,
      },
    });

    console.log(page);

    return page;
  }

  async create(worldId: string, data: CreatePageDto) {
    let suffix: number;

    do {
      try {
        return this.db.page.create({
          data: {
            world: {
              connect: {
                id: worldId,
              },
            },
            title: data.title,
            slug: `${slug(data.title)}${suffix ? '-' + suffix : ''}`,
            blocks: {
              createMany: {
                data: data.blocks.map((block, i) => ({ ...block, order: i })),
              },
            },
          },
          include: {
            blocks: {
              orderBy: {
                order: 'asc',
              },
            },
            world: true,
          },
        });
      } catch {
        suffix = suffix ? suffix + 1 : 1;
      }
    } while (true);
  }

  async update(worldId: string, slug: string, data: UpdatePageDto) {
    return await this.db.page.update({
      where: { worldId_slug: { worldId, slug } },
      data: {
        title: data.title,

        blocks: {
          deleteMany: {},
          createMany: {
            data: data.blocks.map((block, i) => ({ ...block, order: i })),
          },
        },
      },
      include: {
        blocks: {
          orderBy: {
            order: 'asc',
          },
        },
        world: true,
      },
    });
  }
}
