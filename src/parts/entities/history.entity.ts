import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Part } from "./part.entity";

export enum HistroyType {
    IMPORT = "import",
    EXPORT = "export"
}

export class Histroy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: HistroyType,
        default: HistroyType.IMPORT       
    })
    type: HistroyType;

    @Column()
    date: Date

    @Column()   
    quantity: number; 

    @ManyToOne(() => Part, (part) => part.histories)
    part: Part;
}