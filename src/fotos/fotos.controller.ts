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
  Query,
  DefaultValuePipe,
  ParseFloatPipe,
} from '@nestjs/common';
import { FotosService } from './fotos.service.js';
import type { Foto } from './entities/foto.entity.js';
import { max } from 'rxjs';

@Controller('fotos')
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}

  

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
  // /api/fotos?min=3&max=5&1=foto&page=1&limit=5
  @Get()
  findAll(
    @Query('min',new DefaultValuePipe(0), ParseFloatPipe) min: number,
    @Query('max',new DefaultValuePipe(5), ParseFloatPipe) max: number,
    @Query('q') q: string | undefined,
    @Query('page', new DefaultValuePipe(10),ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
){
  return this.fotosService.findAll({ min, max, q, page, limit});
}

}
