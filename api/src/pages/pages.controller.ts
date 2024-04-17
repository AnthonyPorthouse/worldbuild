import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WorldService } from 'src/world/world.service';
import { CreatePageDto } from './createPage.dto';
import { PagesService } from './pages.service';
import { UpdatePageDto } from './updatePage.dto';

@Controller('/:worldId/pages')
export class PagesController {
  constructor(
    private readonly pagesService: PagesService,
    private readonly worldService: WorldService,
  ) {}

  @Get('/')
  async getPages(@Param('worldId') worldId: string) {
    const world = await this.worldService.getWorld({ slug: worldId });
    return this.pagesService.pages({
      where: { worldId: world.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Post('/')
  @HttpCode(201)
  async createPage(
    @Param('worldId') worldId: string,
    @Body() createPageDto: CreatePageDto,
  ) {
    const world = await this.worldService.getWorld({ slug: worldId });
    return this.pagesService.create(world.id, createPageDto);
  }

  @Get('/:slug')
  async getPage(
    @Param('worldId') worldId: string,
    @Param('slug') slug: string,
  ) {
    return this.pagesService.page(worldId, slug);
  }

  @Patch('/:slug')
  async updatePage(
    @Param('worldId') worldId: string,
    @Param('slug') slug: string,
    @Body() updatePageDto: UpdatePageDto,
  ) {
    return this.pagesService.update(worldId, slug, updatePageDto);
  }
}
