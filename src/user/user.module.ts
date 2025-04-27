import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LoggedUserDto } from './dto/logged-user.dto';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, LoggedUserDto],
  controllers: [UserController],
  exports: [UserService, LoggedUserDto],
})
export class UserModule {}
