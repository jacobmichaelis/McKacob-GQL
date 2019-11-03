import { Entity, BaseEntity, Column, OneToMany, PrimaryColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Application extends BaseEntity {

    @PrimaryColumn()
    tag: string

    @Column({ unique: true })
    name: string

    @Column({ nullable: true })
    description: string

    @Column({ nullable: true })
    url: string

    @OneToMany(type => User, user => user.app)
    users: User[]

}
