import { Entity, BaseEntity, Column, OneToMany, ManyToMany, PrimaryColumn } from 'typeorm'
import { User } from './User';
import { Application } from './Application';

@Entity()
export class Environment extends BaseEntity {

    @PrimaryColumn()
    env: string

    @Column({ nullable: true })
    description: string

    @Column({ nullable: true })
    url: string

    @OneToMany(type => User, user => user.env)
    users: User[]

}
