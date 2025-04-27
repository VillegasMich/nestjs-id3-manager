import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongMetadata } from './entities/song-metadata.entity';
import { MetadataService } from './metadata.service';
import { MetadataController } from './metadata.controller';
import { CreateSongMetadataDto } from './dto/create-song-metadata.dto';
import { UpdateSongMetadataDto } from './dto/update-song-metadata.dto';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([SongMetadata]), AuthModule, JwtModule],
  providers: [MetadataService, CreateSongMetadataDto, UpdateSongMetadataDto],
  controllers: [MetadataController],
  exports: [MetadataService, CreateSongMetadataDto, UpdateSongMetadataDto],
})
export class MetadataModule {}
