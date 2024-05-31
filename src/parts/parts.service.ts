import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Part } from './entities/part.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PartsService {
    constructor(@InjectRepository(Part) private partRepository: Repository<Part>) {}

    async findAll(): Promise<Part[]> {
        return this.partRepository.find();
    }

    async findOneById(id: number): Promise<Part> {
        return this.partRepository.findOne({where: {id}});
    }

    async save(part: Partial<Part>): Promise<Part> {
        return this.partRepository.save(part);
    }

    async remove(part: Part): Promise<Part> {
        return this.partRepository.remove(part);
    }

    async modify(id: number, part: Partial<Part>) {
        return this.partRepository.update({id}, part);
    }
}
