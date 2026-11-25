import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module.js';
import { Foto } from './fotos/entities/foto.entity.js';
import { FotosModule } from './fotos/fotos.module.js';
import { Etiqueta } from './fotos/entities/etiqueta.entity.js';
import { Album } from './albumes/entities/album.entity.js';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const fotosRepo = app.get(DataSource).getRepository(Foto);

  await fotosRepo.clear(); // vacía la tabla
  for (let i = 1; i <= 10; i++) {
    await fotosRepo.save({
      titulo: `Foto ${i}`,
      descripcion: `Descripción de la foto ${i}`,
      calificacion: Math.round(Math.random() * 50) / 10, // 0.0 a 5.0
      ruta: `https://picsum.photos/id/${i * 10}/600/400`,
    });
  }
  console.log('✓ 10 fotos insertadas');
  await app.close();


  const ds = app.get(DataSource);
  await ds.query(
    'TRUNCATE fotos_etiquetas, fotos, etiquetas, albumes RESTART IDENTITY'
  );
  const albumes = await  ds.getRepository(Album).save(
    ['Viajes','Guayaquil','Naturaleza'].map((nombre)=>({nombre})),
  );
  const etiquetas = await ds.getRepository(Etiqueta).save(
    ['playa','ciudad','noche','cielo','montaña','rio'].map((texto) => ({texto}))
  );
  const azar = <T>(lista: T[] ) => lista[Math.floor(Math.random()* lista.length)];

  for(let i = 1; i<=20; i++){
    await ds.getRepository(Foto).save({
      titulo: 'Foto ${i}',
      calification: Math.round(Math.random() *50)/10,
      ruta: 'https://picsum.photos/id/${i*10}/600/400',
      album: azar(albumes),
      etiquetas: [...new Set([azar(etiquetas), azar(etiquetas)])],
    });
  }
}

bootstrap();

