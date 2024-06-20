import { PartialType } from "@nestjs/mapped-types";
import { IsOptional, IsString } from "class-validator";

class PartDtoExceptHistory {
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    number?: string

    @IsString()
    type: string

    @IsString()
    detailedType: string
    
    @IsString()
    manufacturer: string;
    
    @IsString()
    storageLocation: string;
    
    @IsOptional()
    @IsString()
    detailedStorageLocation?: string;
}

export class UpdatePartDto extends PartialType(PartDtoExceptHistory) {}