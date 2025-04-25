import { PartialType } from '@nestjs/mapped-types';
import { CreateSongMetadataDto } from './create-song-metadata.dto';

export class UpdateSongMetadataDto extends PartialType(CreateSongMetadataDto) {}
