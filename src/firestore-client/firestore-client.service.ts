import {
  DocumentData,
  Firestore,
  Query,
  QueryDocumentSnapshot,
} from '@google-cloud/firestore';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as path from 'path';
import { defaultLimit } from 'src/common/constants/common.const';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FindUsersDto } from 'src/users/dto/find-users.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import { CreateMovieDto } from '../movies/dto/create-movie.dto';
import { UpdateMovieDto } from '../movies/dto/update-movie.dto';
import { Movie } from '../movies/entities/movie.entity';
import { projectId, serviceAccountJsonFileName } from './config/firestore-client.config';

@Injectable()
export class FirestoreClientService {
  private readonly firestore: Firestore;

  constructor() {
    this.firestore = new Firestore({
      projectId,
      keyFilename: path.join(__dirname, '..', '..', serviceAccountJsonFileName),
    });
  }

  async create(
    collection: string,
    createDto: CreateMovieDto | CreateUserDto,
  ): Promise<void> {
    const docRef = this.firestore.collection(collection);
    await docRef.add({ ...createDto });
  }

  async update(
    collection: string,
    id: string,
    updateDto: UpdateMovieDto | UpdateUserDto,
  ): Promise<void> {   
    if (updateDto && !Object.keys(updateDto).length) {
      throw new BadRequestException('update request is empty');
    }

    const docRef = this.firestore.collection(collection).doc(id);

    try {
      await docRef.update({ ...updateDto });
    } catch (error) {
      if (error.code === 5) {
        // No document to update
        throw new NotFoundException(
          `there is no document to update with id: ${id}`
        );
      }
    }
  }

  async findOne(collection: string, id: string): Promise<any> {
    const docRef = this.firestore.collection(collection).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException(
        `there is no document with id: ${id}`
      );
    }

    return { id: doc.id, ...doc.data() };
  }

  async findAll(
    collection: string,
    paginationDto: PaginationDto,
  ): Promise<any[]> {
    let { start, limit = defaultLimit } = paginationDto; // don't know how to do skip right now

    if (limit > defaultLimit) {
      limit = defaultLimit;
    }

    const snapshot = await this.firestore
      .collection(collection)
      // .orderBy('year')
      // .startAt(1980)
      .limit(limit)
      .get();

    const result: Array<Movie | User> = [];

    snapshot.forEach((doc: QueryDocumentSnapshot) => {
      const document: Movie | User = { id: doc.id, ...doc.data() };
      result.push(document);
    });

    return result;
  }

  async remove(collection: string, id: string): Promise<void> {
    await this.firestore.collection(collection).doc(id).delete();
  }

  // logic just for users endpoints
  async batch(
    collection: string,
    createUserDtos: CreateUserDto[],
  ): Promise<void> {
    const batch = this.firestore.batch();

    createUserDtos.forEach((createUserDto) =>
      this.firestore.collection(collection).add({ ...createUserDto }),
    );

    await batch.commit();
  }

  async find(collection: string, findUsersDto: FindUsersDto): Promise<User[]> {

    if (findUsersDto.id) {
      return this.findOne(collection, findUsersDto.id);
    }

    let query: Query<DocumentData> = this.firestore.collection(collection);

    Object.entries(findUsersDto).forEach(([key, value]) => {
      query = query.where(key, '==', value);
    });

    const snapshot = await query.get();

    const result: User[] = [];

    snapshot.forEach((doc: QueryDocumentSnapshot) => {
      const document: any = { id: doc.id, ...doc.data() };
      result.push(document);
    });

    return result;
  }
}
