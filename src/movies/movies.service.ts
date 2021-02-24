import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FirestoreClientService } from 'src/firestore-client/firestore-client.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(private readonly firestoreClient: FirestoreClientService) {}

  create(createMovieDto: CreateMovieDto): Promise<void> {
    return this.firestoreClient.create('movies', createMovieDto);
  }

  update(id: string, updateMovieDto: UpdateMovieDto): Promise<void> {
    return this.firestoreClient.update('movies', id, updateMovieDto);
  }

  findOne(id: string): Promise<Movie> {
    return this.firestoreClient.findOne('movies', id);
  }

  findAll(paginationDto: PaginationDto): Promise<Movie[]> {
    return this.firestoreClient.findAll('movies', paginationDto);
  }

  remove(id: string): Promise<void> {
    return this.firestoreClient.remove('movies', id);
  }
}
