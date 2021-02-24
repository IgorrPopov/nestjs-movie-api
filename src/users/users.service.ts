import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FirestoreClientService } from 'src/firestore-client/firestore-client.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly firestoreClientService: FirestoreClientService,
  ) {}

  create(createUserDto: CreateUserDto): Promise<void> {
    return this.firestoreClientService.create('users', createUserDto);
  }

  batch(createUserDtos: CreateUserDto[]): Promise<void> {
    return this.firestoreClientService.batch('users', createUserDtos);
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    return this.firestoreClientService.update('users', id, updateUserDto);
  }

  findAll(paginationDto: PaginationDto): Promise<User[]> {
    return this.firestoreClientService.findAll('users', paginationDto);
  }

  find(findUsersDto: FindUsersDto): Promise<any[]> {
    return this.firestoreClientService.find('users', findUsersDto);
  }

  findOne(id: string): Promise<User> {
    return this.firestoreClientService.findOne('users', id);
  }

  remove(id: string): Promise<void> {
    return this.firestoreClientService.remove('users', id);
  }
}
