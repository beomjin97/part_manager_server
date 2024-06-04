import {Entity, Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { History } from 'src/histories/entities/history.entity';

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

    @OneToMany(() => History, (history) => history.part)
    histories: History[]
}