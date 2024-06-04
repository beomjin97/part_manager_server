export class SavePartDto {
    name: string
    number?: string
    manufacturer: string;
    storageLocation: string;
    detailedStorageLocation?: string;
    isImport: boolean;
    date: Date
    quantity: number;
}