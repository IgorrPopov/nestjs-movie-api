import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FirestoreClientService } from 'src/firestore-client/firestore-client.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { collectionName } from './constants/user.const';

@Injectable()
export class UsersService {
  constructor(
    private readonly firestoreClientService: FirestoreClientService,
  ) {}

  create(createUserDto: CreateUserDto): Promise<void> {
    return this.firestoreClientService.create(collectionName, createUserDto);
  }

  batch(createUserDtos: CreateUserDto[]): Promise<void> {
    return this.firestoreClientService.batch(collectionName, createUserDtos);
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    return this.firestoreClientService.update(collectionName, id, updateUserDto);
  }

  findAll(paginationDto: PaginationDto): Promise<User[]> {
    return this.firestoreClientService.findAll(collectionName, paginationDto);
  }

  find(findUsersDto: FindUsersDto): Promise<User[]> {
    return this.firestoreClientService.find(collectionName, findUsersDto);
  }

  findOne(id: string): Promise<User> {
    return this.firestoreClientService.findOne(collectionName, id);
  }

  remove(id: string): Promise<void> {
    return this.firestoreClientService.remove(collectionName, id);
  }
}
