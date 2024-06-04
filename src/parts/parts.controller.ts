import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PartsService } from './parts.service';
import { SavePartDto } from './dtos/savePart.dto';
import { UpdatePartDto } from './dtos/updatePart.dto';
import { SaveHistoryDto } from 'src/histories/dtos/saveHistory.dto';
import { UpdateHistoryDto } from 'src/histories/dtos/updateHistory.dto';

@Controller('part')
export class PartsController {
    
    constructor(private partsService:PartsService) {}
    
    @Get()
    async findAll() {
        return await this.partsService.findAll();
    }

    @Get("/:id")
    async findOne(@Param("id") id: string) {
        return await this.partsService.findOneById(parseInt(id));;
    }

    @Post()
    async create(@Body() savePartDto: SavePartDto ) {
        return await this.partsService.save(savePartDto);
    }

    @Post("/:part-id/history")
    async createHistory(
        @Param('part-id')partId: string, 
        @Body()saveHistoryDto : SaveHistoryDto) {}


    @Patch('/:id')
    async update(
        @Param("id") id: string , 
        @Body() updatePartDto: UpdatePartDto ) {
        return await this.partsService.modify(parseInt(id), updatePartDto); 
    }

    @Patch('/:part-id/history/:history-id')
    async updateHistory(
        @Param('part-id') partId, 
        @Param('history-id') historyId ,
        @Body() historyUpdateDto: UpdateHistoryDto ) {}

    @Delete('/:id')
    async delete(@Param("id") id: string) {
        return await this.partsService.remove(parseInt(id));
    }

    @Delete('/:part-id/history/:history-id')
    async deleteHistory(
        @Param('part-id') partId, 
        @Param('history-id') historyId ,
        @Body() historyUpdateDto: UpdateHistoryDto ) {}
}
