import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { Part } from './entities/part.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SavePartDto } from './dtos/savePart.dto';
import { History } from 'src/histories/entities/history.entity';
import { UpdatePartDto } from './dtos/updatePart.dto';

@Injectable()
export class PartsService {
    constructor(
        @InjectRepository(Part) private partRepository: Repository<Part>
    ) {}

    public findAll(): Promise<Part[]> {
        return this.partRepository.find();
    }

    public async findOneById(id: number): Promise<Part> {
        const part = await this.identifyExistenceById(id);

        return part
    }

    public save(savePartDto: SavePartDto): Promise<Part> {
        const {isImport, date, quantity, ...partProperties} = savePartDto;
        
        const history = new History({isImport, date, quantity});
        const part = new Part(partProperties);
        
        part.histories = [history];

        return this.partRepository.save(part)
    }

    public async remove(id: number): Promise<Part> {
        const part = await this.identifyExistenceById(id);

        return this.partRepository.remove(part);
    }

    public async modify(id: number, UpdatePartDto: UpdatePartDto):Promise<UpdateResult> {
        const {number, name, manufacturer, storageLocation, detailedStorageLocation, isImport, date, quantity} = UpdatePartDto;
        await this.identifyExistenceById(id)
        
        return this.partRepository.update({id}, UpdatePartDto);
    }

    private async identifyExistenceById(id: number): Promise<Part> {
        const part = await this.findOneById(id);
        if (!part) {
            throw new NotFoundException()
        }
        return part
    }
}
