import { IsBoolean, IsDateString, IsNumber } from "class-validator"

export class AddHistoryDto {
    
    @IsBoolean()
    isImport: boolean
    
    @IsDateString()
    date: Date

    @IsNumber()
    quantity: number
}