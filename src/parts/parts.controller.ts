import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { PartsService } from './parts.service';

@Controller('parts')
export class PartsController {
    
    constructor(private partsService:PartsService ) {}
    
    @Get()
    async findAll() {
        return await this.partsService.findAll();
    }

    @Get("/:id")
    async findOne(@Param("id") id: string) {
        const part =  await this.partsService.findOneById(parseInt(id));
        if (!part) {
            throw new NotFoundException();
        }
        return part;
    }
}
