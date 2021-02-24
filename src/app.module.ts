import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { FirestoreClientModule } from './firestore-client/firestore-client.module';

@Module({
  imports: [MoviesModule, UsersModule, FirestoreClientModule]
})
export class AppModule {}
