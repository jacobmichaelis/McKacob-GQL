import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Application } from './Application'
import { Environment } from './Environment'
import { Role } from './Role'

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    encrypted: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ nullable: true })
    phone: string

    @Column({ nullable: true })
    street: string

    @Column({ nullable: true })
    city: string

    @Column({ nullable: true })
    state: string

    @Column({ nullable: true })
    zip: string

    @ManyToOne(type => Application, app => app.tag)
    app: Application

    @ManyToOne(type => Environment, env => env.env)
    env: Environment

    @ManyToOne(type => Role, role => role.role)
    role: Role
}
