import { Injectable } from '@nestjs/common';
import { FirestoreClientService } from 'src/firestore-client/firestore-client.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(private readonly firestoreClientService: FirestoreClientService) {}

  create(createUserDto: CreateUserDto) {
    return this.firestoreClientService.create('users', createUserDto);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.firestoreClientService.update('users', id, updateUserDto);
  }
}
