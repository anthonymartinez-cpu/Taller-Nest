//src/fotos/fotos.service.ts
import {Injectable, NotFoundException} from '@nestjs/common';
import type {Foto} from './entities/foto.entity.js';

@Injectable()
export class FotosService {
    private fotos: Foto[] = [
        {id: 1, titulo: 'Atardecer', calificacion: 4.5},
        {id: 2, titulo: 'Malecon', calificacion: 4.0},
    ];

     findAll(): Foto[] {
        return this.fotos;
    }

    findOne(id: number): Foto {
        const foto = this.fotos.find((f) => f.id === id);
        if(!foto) {
            throw new NotFoundException(`Foto con id ${id} no encontrada`);
        }
        return foto;
    }

    create(datos: Omit<Foto, 'id'>): Foto {
        const nueva = {id: this.fotos.length + 1, ...datos};
        this.fotos.push(nueva);
        return nueva;
    }

    update(id: number, datos: Partial<Foto>): Foto {
    // Reutilizamos findOne: si no existe, lanza NotFoundException automáticamente (404 gratis)
    const foto = this.findOne(id);

    // Actualizamos solo los campos que vengan en 'datos'
    if (datos.titulo !== undefined) {
      foto.titulo = datos.titulo;
    }
    if (datos.calificacion !== undefined) {
      foto.calificacion = datos.calificacion;
    }

    return foto;
  }

  // 2. Método REMOVE
  remove(id: number): void {
    // Validamos que exista antes de borrar (si no existe, lanza 404)
    this.findOne(id);

    // Filtramos el arreglo para quitar la foto con ese ID
    this.fotos = this.fotos.filter((foto) => foto.id !== id);
  }
}
