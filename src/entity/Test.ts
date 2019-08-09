import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity()
export class Test extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ unique: true })
    username: string

    @Column()
    password: string
    
    @Column()
    encrypted: string

}
