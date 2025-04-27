import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SongMetadata } from './entities/song-metadata.entity';
import { CreateSongMetadataDto } from './dto/create-song-metadata.dto';
import { UpdateSongMetadataDto } from './dto/update-song-metadata.dto';
import { LoggedUserDto } from 'src/user/dto/logged-user.dto';
import { songMetadataExample } from './utils/metadata-mock';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(SongMetadata)
    private readonly repo: Repository<SongMetadata>,
  ) {}

  create(dto: CreateSongMetadataDto, user: LoggedUserDto) {
    const metadata = this.repo.create({
      ...dto,
      user: { id: user.sub },
    });
    return this.repo.save(metadata);
  }

  findAll() {
    return this.repo.find();
  }

  findAllByUser(user: LoggedUserDto) {
    console.log('User:', user);
    return this.repo.find({
      where: {
        user: {
          id: user.sub,
        },
      },
    });
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

  async uploadFile(file: Express.Multer.File, user: LoggedUserDto) {
    const exampleMetadata = this.repo.create({
      ...songMetadataExample,
      user: { id: user.sub },
    });
    await this.repo.save(exampleMetadata);
    return {
      message: 'File received',
      filename: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}
