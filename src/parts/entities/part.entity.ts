import {Entity, Column, OneToMany, IsNull, PrimaryGeneratedColumn} from 'typeorm';
import { Histroy } from './history.entity';

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

    @OneToMany(() => Histroy, (history) => history.part)
    histories: Histroy[]
}