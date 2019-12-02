import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {

  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'varchar', nullable: false})
  name: string

  @Column({type: 'int'})
  age: number

  @Column('varchar')
  descri: string
}