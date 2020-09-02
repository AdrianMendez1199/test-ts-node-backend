import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    BeforeInsert,
    Unique,
    OneToMany
} from 'typeorm';
import bcrypt from 'bcrypt';
import { Ticket } from '@entity/Ticket';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(_ => Ticket, ticket => ticket.user)
    photos: Ticket[];

    @BeforeInsert()
    async hashPasswordBeforeInsert(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

}
