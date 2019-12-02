import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly repository: Repository<Users>
  ) {

  }
  getUserById(ids: number) {
    const users = [
      {id: 1, name: 'zs', age: 12},
      {id: 2, name: 'ls', age: 25},
      {id: 3, name: 'wl', age: 29}
    ]
    let a= users.find(  
    ({id}) => id ===  ids    
    )
    console.log(a);
    
    return a
  }
}
