import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm'
import { User } from './User';
import { Application } from './Application';

@Entity()
export class Environment extends BaseEntity {

    @PrimaryGeneratedColumn()
    env: string

    @Column({ nullable: true })
    description: string

    @Column({ nullable: true })
    url: string

    @OneToMany(type => User, user => user.env)
    users: User[]

}
