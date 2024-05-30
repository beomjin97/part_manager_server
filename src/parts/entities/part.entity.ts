import {Entity, Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { History } from './history.entity';

@Entity()
export class Part {
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
    DetailedStorageLocation: string;

    @OneToMany(() => History, (history) => history.part)
    histories: History[]
}