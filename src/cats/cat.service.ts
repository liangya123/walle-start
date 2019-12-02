import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatsDto } from './dto/cat.dto';
import { Cat } from './cat.entity';

@Injectable()
export class CatService {
  
  constructor(
    @InjectRepository(Cat) private readonly repository: Repository<Cat>
  ) {}
  
  // 列表
  public async get (): Promise<Cat[]> {
  return await this.repository.find()
  }

  // 添加
  public async save(dto: CreateCatsDto) {
    return await this.repository.save(dto)
  }

  public async update() {
    
  }

}
