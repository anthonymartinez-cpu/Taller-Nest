
import {Body, Controller, Get, Param, ParseIntPipe, Post, Query} from '@nestjs/common';
import {FotosService} from './fotos.service.js';
import type { Foto } from './entities/foto.entity.js';

@Controller('fotos')
export class FotosController {
    constructor(private readonly fotosService: FotosService) {}

    @Get()
    findAll(): Foto[] {
        return this.fotosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Foto {
        return this.fotosService.findOne(id);
    }

    @Post()
    create(@Body() datos: Omit<Foto, 'id'>): Foto {
        return this.fotosService.create(datos);
    }

    @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: Partial<Foto>,
  ) {
    return this.fotosService.update(id, datos);
  }

  // Ruta DELETE con código de estado 204 (No Content)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // También funciona poner @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    this.fotosService.remove(id);
  }
}