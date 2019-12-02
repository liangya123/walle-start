import { Controller, Get, HttpException, HttpStatus, Header, Redirect } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService){}

  @Get()
  // 自定义响应头
  // @Header('Cache-Control', 'none')
  // @Redirect('https://nestjs.com', 301)
  async findUser () {
    console.log( process.argv.slice(3))
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
