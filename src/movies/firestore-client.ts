import { Firestore, QueryDocumentSnapshot } from '@google-cloud/firestore';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import * as path from 'path';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class FirestoreClient {
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

  public async save(
    collection: string,
    createMovieDto: CreateMovieDto
  ): Promise<void> {
    const docRef = this.firestore.collection(collection);
    await docRef.add({ ...createMovieDto });
  }

  public async update(
    collection: string,
    id: string,
    updateMovieDto: UpdateMovieDto
  ): Promise<void> {
    if (!updateMovieDto || JSON.stringify(updateMovieDto) === '{}') {
      throw new BadRequestException('update request is empty');
    }

    const docRef = this.firestore.collection(collection).doc(id);

    try {
      await docRef.update({ ...updateMovieDto });
    } catch (error) {
      if (error.code === 5) {
        // No document to update
        throw new BadRequestException(
          `There is no movie to update with id: ${id}`
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

  public async findAll(collection: string): Promise<Movie[]> {
    const snapshot = await this.firestore.collection(collection).get();

    const result: Movie[] = [];

    snapshot.forEach((doc: QueryDocumentSnapshot) => {

      const movie: Movie = { id: doc.id, ...doc.data() };
      result.push(movie);
    });

    return result;
  }

  public async remove(collection: string, id: string): Promise<void> {
    await this.firestore.collection(collection).doc(id)
.delete();
  }
}
