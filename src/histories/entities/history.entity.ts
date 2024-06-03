import { Part } from "src/parts/entities/part.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class History {
    constructor(partial?: Partial<History>) {
        Object.assign(this, partial)
    }

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