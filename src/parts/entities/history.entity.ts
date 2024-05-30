import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Part } from "./part.entity";


@Entity()
export class History {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isImport: boolean;

    @Column()
    date: Date

    @Column()   
    quantity: number; 

    @ManyToOne(() => Part, (part) => part.histories)
    part: Part;
}