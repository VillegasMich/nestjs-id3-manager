import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SongMetadata } from './entities/song-metadata.entity';
import { CreateSongMetadataDto } from './dto/create-song-metadata.dto';
import { UpdateSongMetadataDto } from './dto/update-song-metadata.dto';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(SongMetadata)
    private readonly repo: Repository<SongMetadata>,
  ) {}

  create(dto: CreateSongMetadataDto) {
    const metadata = this.repo.create(dto);
    return this.repo.save(metadata);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  update(id: string, dto: UpdateSongMetadataDto) {
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
