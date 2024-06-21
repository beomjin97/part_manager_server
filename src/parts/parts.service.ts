import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { Part } from './entities/part.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SavePartDto } from './dtos/savePart.dto';
import { UpdatePartDto } from './dtos/updatePart.dto';
import { HistoriesService } from '../histories/histories.service';
import { AddHistoryDto } from '../histories/dtos/addHistory.dto';

@Injectable()
export class PartsService {
    constructor(
        @InjectRepository(Part) private readonly partRepository: Repository<Part>,
        private readonly historiesService: HistoriesService
    ) {}

    public findAll(
        type?: string, 
        detailedType?: string,
        name?: string, 
        number?: string, 
        manufacturer?: string, 
        storageLocation?: string, 
        detailedStorageLocation?: string 
    ): Promise<Part[]> {
        return this.partRepository.find({
            where: {
                type,
                detailedType,
                name,
                number,
                manufacturer,
                storageLocation,
                detailedStorageLocation
            }
        });
    }

    public async findOneById(id: number): Promise<Part> {
        const part = await this.identifyExistenceById(id);
        
        return part
    }

    public async save(savePartDto: SavePartDto): Promise<Part> {
        const {isImport, date, quantity, ...partProperties} = savePartDto;
        
        const history = await this.historiesService.create({isImport, date, quantity});
        const part = new Part(partProperties);
        part.histories = [history];

        return this.partRepository.save(part)
    }

    public async remove(id: number): Promise<Part> {
        const part = await this.identifyExistenceById(id);

        return this.partRepository.remove(part);
    }

    public async modify(id: number, UpdatePartDto: UpdatePartDto):Promise<UpdateResult> {
        await this.identifyExistenceById(id)
        
        return this.partRepository.update({id}, UpdatePartDto);
    }

    private async identifyExistenceById(id: number): Promise<Part> {
        const part = await this.partRepository.findOne({
            where: {
                id
            },
        });

        if (!part) {
            throw new NotFoundException()
        }
        return part
    }

    public async addHistory(partId: number, addHistoryDto: AddHistoryDto) {
        const part = await this.identifyExistenceById(partId);
        const history = await this.historiesService.create(addHistoryDto);

        part.histories = [...part.histories,history]
        
        return this.partRepository.save(part);
    }
}
