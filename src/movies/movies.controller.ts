import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiBody({ type: CreateMovieDto })
  @ApiResponse({
    status: 201,
    description: `Add one movie instance and after it was created (added to the DB) 
    returns void`
  })
  @ApiResponse({
    status: 400,
    description: `If the request body does not match CreateMovieDto 
    then the API will return 400 bad request`
  })
  create(@Body() createMovieDto: CreateMovieDto): Promise<void> {
    return this.moviesService.create(createMovieDto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    example: '5QujReZ4R2tHQNPwip66'
  })
  @ApiBody({ type: UpdateMovieDto })
  @ApiResponse({
    status: 200,
    description:
      'Update existing movie instance in the database and return void'
  })
  @ApiResponse({
    status: 400,
    description: `If the request body does not match UpdateMovieDto or it's empty 
    then the API will return 400 bad request`
  })
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto
  ): Promise<void> {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    example: '5QujReZ4R2tHQNPwip66'
  })
  @ApiResponse({
    status: 200,
    description: 'Returns one movie from the database by it\'s id',
    type: Movie
  })
  @ApiResponse({
    status: 404,
    description:
      'If movie with provided id does not exist API will return 404 NotFoundException'
  })
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: `Returns an array of all movies from the database 
      or an empty array if there are no movies`,
    type: [Movie]
  })
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    example: '5QujReZ4R2tHQNPwip66'
  })
  @ApiResponse({
    status: 200,
    description: 'Removes movie from the database by it\'s id'
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.moviesService.remove(id);
  }
}
