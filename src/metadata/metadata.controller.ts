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
  Req,
  UseGuards,
} from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { CreateSongMetadataDto } from './dto/create-song-metadata.dto';
import { UpdateSongMetadataDto } from './dto/update-song-metadata.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { mp3FileFilter } from './utils/mp3-file-filter.util';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { LoggedUserDto } from 'src/user/dto/logged-user.dto';

@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() dto: CreateSongMetadataDto,
    @Req() req: Request & { user: LoggedUserDto },
  ) {
    const user: LoggedUserDto = req.user;
    return this.metadataService.create(dto, user);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAllByUser(@Req() req: Request & { user: LoggedUserDto }) {
    console.log(req);
    const user: LoggedUserDto = req.user;
    return this.metadataService.findAllByUser(user);
  }

  @Get('all')
  findAll() {
    return this.metadataService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metadataService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSongMetadataDto) {
    return this.metadataService.update(id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metadataService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: mp3FileFilter,
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request & { user: LoggedUserDto },
  ) {
    const user: LoggedUserDto = req.user;
    return this.metadataService.uploadFile(file, user);
  }
}
