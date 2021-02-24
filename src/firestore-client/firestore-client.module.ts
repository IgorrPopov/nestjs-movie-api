import { Module } from '@nestjs/common';
import { FirestoreClientService } from './firestore-client.service';

@Module({
  providers: [FirestoreClientService],
  exports: [FirestoreClientService]
})
export class FirestoreClientModule {}
