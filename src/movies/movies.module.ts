import { Module } from '@nestjs/common';
import { FirestoreClient } from './firestore-client';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, FirestoreClient]
})
export class MoviesModule {}
