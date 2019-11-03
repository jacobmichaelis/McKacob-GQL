import { Entity, BaseEntity, Column, OneToMany, PrimaryColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Role extends BaseEntity {

    @PrimaryColumn()
    role: string

    @Column({ nullable: true })
    description: string

    @Column({ default: 0 })
    level: number

    @OneToMany(type => User, user => user.role)
    users: User[]

}
