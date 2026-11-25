import { Controller } from '@nestjs/common';
import { AlbumesService } from './albumes.service.js';
import { Get } from '@nestjs/common';
import { Param, ParseIntPipe } from '@nestjs/common';

@Controller('albumes')
export class AlbumesController {
    constructor(private readonly albumesService: AlbumesService) {}
    @Get()
    findAll(){
        return this.albumesService.findAll();
    }

    @Get(':id/fotos')
    findFotos(@Param('id', ParseIntPipe) id: number){
        return this.albumesService.findFotos(id);
    }
}
