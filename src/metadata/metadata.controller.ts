import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { CreateSongMetadataDto } from './dto/create-song-metadata.dto';
import { UpdateSongMetadataDto } from './dto/update-song-metadata.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { mp3FileFilter } from './utils/mp3-file-filter.util';

@Controller('metadata')
export class MetadataController {
  constructor(private readonly service: MetadataService) {}

  @Post()
  create(@Body() dto: CreateSongMetadataDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSongMetadataDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: mp3FileFilter,
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('File uploaded: ' + file.originalname);
    return {
      message: 'File received',
      filename: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}
