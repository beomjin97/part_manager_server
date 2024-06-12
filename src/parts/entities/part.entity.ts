import {Entity, Column, OneToMany, PrimaryGeneratedColumn, JoinColumn} from 'typeorm';
import { History } from '../../histories/entities/history.entity';

@Entity()
export class Part {
    constructor(partial?: Partial<Part>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
    })
    number: string;

    @Column()
    name: string;

    @Column()
    manufacturer: string;

    @Column()
    storageLocation: string;

    @Column({
        nullable: true,
    })
    detailedStorageLocation: string;

    @OneToMany((type) => History, (history) => history.part,{eager: true})
    @JoinColumn()
    histories: History[]
}