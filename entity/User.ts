import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    BeforeInsert
} from 'typeorm';
import bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    username: string;


    @Column()
    lastName: string;

    @Column()
    age: number;


    @Column()
    password: string;


    @BeforeInsert()
    async hashPasswordBeforeInsert(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

}
