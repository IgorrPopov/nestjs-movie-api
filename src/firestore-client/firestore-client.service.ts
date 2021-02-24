import { Firestore, QueryDocumentSnapshot } from '@google-cloud/firestore';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import * as path from 'path';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
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
      keyFilename: path.join(
        __dirname,
        '..',
        '..',
        'service-account.json'
      )
    });
  }

  public async create(
    collection: string,
    createDto: CreateMovieDto | CreateUserDto
  ): Promise<void> {
    const docRef = this.firestore.collection(collection);
    await docRef.add({ ...createDto });
  }

  public async update(
    collection: string,
    id: string,
    updateDto: UpdateMovieDto | UpdateUserDto
  ): Promise<void> {
    if (!updateDto || JSON.stringify(updateDto) === '{}') {
      throw new BadRequestException('update request is empty');
    }

    const docRef = this.firestore.collection(collection).doc(id);

    try {
      await docRef.update({ ...updateDto });
    } catch (error) {
      if (error.code === 5) {
        // No document to update
        throw new BadRequestException(
          `There is no document to update with id: ${id}`
        );
      }

      throw new InternalServerErrorException();
    }
  }

  public async findOne(collection: string, id: string): Promise<Movie> {
    const docRef = this.firestore.collection(collection).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException();
    }

    return { id: doc.id, ...doc.data() };
  }

  public async findAll(collection: string): Promise<Movie[] | User[]> {
    const snapshot = await this.firestore.collection(collection).get();

    const result: Movie[] = [];

    snapshot.forEach((doc: QueryDocumentSnapshot) => {

      const movie: Movie = { id: doc.id, ...doc.data() };
      result.push(movie);
    });

    return result;
  }

  public async remove(collection: string, id: string): Promise<void> {
    await this.firestore.collection(collection).doc(id).delete();
  }
}
