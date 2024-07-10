import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class SavePartDto {
    @IsString()
    name: string
    
    @IsOptional()
    @IsString()
    number?: string
    
    @IsString()
    type: string
    
    @IsOptional()
    @IsString()
    detailedType?: string;
    
    @IsString()
    manufacturer: string;
    
    @IsString()
    storageLocation: string;
    
    @IsOptional()
    @IsString()
    detailedStorageLocation?: string;
    
    @IsDateString()
    date: Date
    
    @IsNumber()
    quantity: number;
}