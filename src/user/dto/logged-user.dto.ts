import { IsString } from 'class-validator';

export class LoggedUserDto {
  @IsString()
  sub: string;
  @IsString()
  username: string;
}
