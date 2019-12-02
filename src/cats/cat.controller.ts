import { Controller, Get, Post, Body, OnModuleInit, Put, BadRequestException } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateCatsDto } from './dto/cat.dto';
import  {CatService as CatService} from './cat.service';

@Controller('cats')
export class CatController {
  constructor(
    private readonly cattService: CatService  ,
  )  {}


  @Post()
  async saveCat (@Body() dto: CreateCatsDto) {
    console.log(dto)
    return await this.cattService.save(dto)
  }

  @Put()
  async updateCat (@Body() dto: CreateCatsDto) {
    console.log(dto)
    return await this.cattService.save(dto)
  }

  @Get()
  async getCats () {
    return await this.cattService.get()
  }

}
