import {
  DocumentData,
  Firestore,
  Query,
  QueryDocumentSnapshot,
} from '@google-cloud/firestore';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as path from 'path';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FindUsersDto } from 'src/users/dto/find-users.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import { CreateMovieDto } from '../movies/dto/create-movie.dto';
import { UpdateMovieDto } from '../movies/dto/update-movie.dto';
import { Movie } from '../movies/entities/movie.entity';

@Injectable()
export class FirestoreClientService {
  private readonly firestore: Firestore;

  constructor() {
    this.firestore = new Firestore({
      projectId: 'nestjs-cloud-function-app',
      keyFilename: path.join(__dirname, '..', '..', 'service-account.json'),
    });
  }

  async create(
    collection: string,
    createDto: CreateMovieDto | CreateUserDto,
  ): Promise<void> {
    const docRef = this.firestore.collection(collection);
    await docRef.add({ ...createDto });
  }

  async batch(collection: string, createUserDtos: CreateUserDto[]) {
    const batch = this.firestore.batch();

    createUserDtos.forEach((dto) =>
      this.firestore.collection(collection).add({ ...dto }),
    );

    await batch.commit();
  }

  async update(
    collection: string,
    id: string,
    updateDto: UpdateMovieDto | UpdateUserDto,
  ): Promise<void> {
    if (!updateDto || !Object.keys(updateDto)) {
      throw new BadRequestException('update request is empty');
    }

    const docRef = this.firestore.collection(collection).doc(id);

    try {
      await docRef.update({ ...updateDto });
    } catch (error) {
      if (error.code === 5) {
        // No document to update
        throw new BadRequestException(
          `There is no document to update with id: ${id}`,
        );
      }

      throw new InternalServerErrorException();
    }
  }

  async find(collection: string, findUsersDto: FindUsersDto) {
    let query: Query<DocumentData> = this.firestore.collection(collection);

    Object.entries(findUsersDto).forEach(([key, value]) => {
      query = query.where(key, '==', value);
    });

    const snapshot = await query.get();

    const result: Array<Movie | User> = [];

    snapshot.forEach((doc: QueryDocumentSnapshot) => {
      const movie: Movie | User = { id: doc.id, ...doc.data() };
      result.push(movie);
    });

    return result;
  }

  async findOne(collection: string, id: string): Promise<any> {
    const docRef = this.firestore.collection(collection).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException();
    }

    return { id: doc.id, ...doc.data() };
  }

  async findAll(
    collection: string,
    paginationDto: PaginationDto,
  ): Promise<any> {
    const { start = 5, limit = 1 } = paginationDto;

    const snapshot = await this.firestore
      .collection(collection)
      // .orderBy('year')
      // .startAt(start)
      // .limit(limit)
      .get();

    const result: Array<Movie | User> = [];

    snapshot.forEach((doc: QueryDocumentSnapshot) => {
      const movie: Movie | User = { id: doc.id, ...doc.data() };
      result.push(movie);
    });

    return result;
  }

  async remove(collection: string, id: string): Promise<void> {
    await this.firestore.collection(collection).doc(id).delete();
  }
}
