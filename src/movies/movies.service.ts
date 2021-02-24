import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { FirestoreClient } from './firestore-client';

@Injectable()
export class MoviesService {
  constructor(private readonly firestoreClient: FirestoreClient) {}

  create(createMovieDto: CreateMovieDto): Promise<void> {
    return this.firestoreClient.save('movies', createMovieDto);
  }

  update(id: string, updateMovieDto: UpdateMovieDto): Promise<void> {
    return this.firestoreClient.update('movies', id, updateMovieDto);
  }

  findOne(id: string): Promise<Movie> {
    return this.firestoreClient.findOne('movies', id);
  }

  findAll(): Promise<Movie[]> {
    return this.firestoreClient.findAll('movies');
  }

  remove(id: string): Promise<void> {
    return this.firestoreClient.remove('movies', id);
  }
}
