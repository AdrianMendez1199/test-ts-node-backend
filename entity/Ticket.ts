import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from '@entity/User';

@Entity()
export class Ticket {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;


    @Column()
    description: string;

    @ManyToOne(_ => User, user => user.id)
    user: User;
}
