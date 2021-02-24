import { Module } from '@nestjs/common';
import { FirestoreClientModule } from 'src/firestore-client/firestore-client.module';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  imports: [FirestoreClientModule]
})
export class MoviesModule {}
