import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { User } from '@entity/User';



export enum TicketState {
    EXPIRE = "E",
    RESOLVE = "R",
    ACTIVE = "A",
    INVALID = "I"
}


@Entity()
export class Ticket extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;


    @Column()
    description: string;

    @Column({
        type: "enum",
        enum: TicketState,
        array: false,
        default: [TicketState.ACTIVE]
    })
    status: TicketState;

    @ManyToOne(_ => User, user => user.id)
    user: User;
}
