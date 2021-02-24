import { Module } from '@nestjs/common';
import { FirestoreClientModule } from 'src/firestore-client/firestore-client.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [FirestoreClientModule]
})
export class UsersModule {}
