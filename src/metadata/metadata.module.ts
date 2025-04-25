import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongMetadata } from './entities/song-metadata.entity';
import { MetadataService } from './metadata.service';
import { MetadataController } from './metadata.controller';
import { CreateSongMetadataDto } from './dto/create-song-metadata.dto';
import { UpdateSongMetadataDto } from './dto/update-song-metadata.dto';

@Module({
  imports: [TypeOrmModule.forFeature([SongMetadata])],
  providers: [MetadataService, CreateSongMetadataDto, UpdateSongMetadataDto],
  controllers: [MetadataController],
  exports: [MetadataService, CreateSongMetadataDto, UpdateSongMetadataDto],
})
export class MetadataModule {}
