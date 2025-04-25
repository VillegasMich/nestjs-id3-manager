import { IsArray, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateSongMetadataDto {
  @IsString() title: string;
  @IsArray() artists: string[];
  @IsString() albumArtist: string;
  @IsArray() albums: string[];
  @IsArray() years: number[];
  @IsArray() genres: string[];
  @IsNumber() trackNumber: number;
  @IsNumber() discNumber: number;
  @IsString() duration: string;
  @IsString() bitrate: string;
  @IsString() sampleRate: string;
  @IsNumber() channels: number;
  @IsString() encoder: string;
  @IsString() fileSize: string;
  @IsArray() composers: string[];
  @IsArray() conductors: string[];
  @IsString() publisher: string;
  @IsString() copyright: string;
  @IsString() isrc: string;
  @IsNumber() bpm: number;
  @IsString() key: string;
  @IsString() mood: string;
  @IsString() language: string;
  @IsString() comments: string;
  @IsString() lyrics: string;
  @IsArray() paths: string[];
  @IsDateString() lastModified: string;
  @IsNumber() playCount: number;
  @IsNumber() rating: number;
}
