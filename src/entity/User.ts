import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Application } from './Application'
import { Environment } from './Environment'
import { Role } from './Role'
import * as bcrypt from 'bcryptjs'

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    password: string

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

    @ManyToOne(type => Application, app => app.tag, { eager: true })
    @JoinColumn({ name: 'app' })
    app: Application

    @ManyToOne(type => Environment, env => env.env, { eager: true })
    @JoinColumn({ name: 'env' })
    env: Environment

    @ManyToOne(type => Role, role => role.role, { eager: true })
    @JoinColumn({ name: 'role' })
    role: Role

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 17)
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password)
    }
}
