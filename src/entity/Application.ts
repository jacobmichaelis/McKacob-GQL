import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { User } from "./User";

@Entity()
export class Application extends BaseEntity {

    @PrimaryGeneratedColumn()
    tag: string

    @Column({ unique: true })
    name: string

    @Column({ nullable: true })
    description: string

    @Column({ nullable: true })
    url: number

    @OneToMany(type => User, user => user.app)
    users: User[]

}
