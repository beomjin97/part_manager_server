import { PartialType } from "@nestjs/mapped-types";

class PartDtoExceptHistory {
    name: string
    number?: string
    type: string
    detailedType: string
    manufacturer: string;
    storageLocation: string;
    detailedStorageLocation?: string;

}

export class UpdatePartDto extends PartialType(PartDtoExceptHistory) {}