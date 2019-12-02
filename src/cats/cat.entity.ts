import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsString, IsNumber } from "class-validator";

@Entity()
export class Cat {

  @PrimaryGeneratedColumn()
  id: number

  @IsString({always: true})
  @Column({type: 'varchar', nullable: false})
  name: string

  @IsNumber({}, {always: true})
  @Column({type: 'int'})
  age: number

  @Column('varchar')
  description: string
}