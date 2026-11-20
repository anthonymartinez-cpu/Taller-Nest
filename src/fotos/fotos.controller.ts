import {
  HttpStatus,
  HttpCode,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { FotosService } from './fotos.service.js';
import type { Foto } from './entities/foto.entity.js';

@Controller('fotos')
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}

  @Get()
  async findAll(): Promise<Foto[]> {
    return this.fotosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Foto> {
    return this.fotosService.findOne(id);
  }

  @Post()
  async create(@Body() datos: Partial<Foto>): Promise<Foto> {
    return this.fotosService.create(datos);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: Partial<Foto>,
  ): Promise<Foto> {
    return this.fotosService.update(id, datos);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.fotosService.remove(id);
  }
}