import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PartsService } from './parts.service';
import { SavePartDto } from './dtos/savePart.dto';
import { UpdatePartDto } from './dtos/updatePart.dto';
import { AddHistoryDto } from 'src/histories/dtos/addHistory.dto';
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
    return await this.partsService.findOneById(parseInt(id));
  }

  @Post()
  async create(@Body() savePartDto: SavePartDto ) {
    return await this.partsService.save(savePartDto);
  }

  @Post("/:partId/history")
  async addHistory(
    @Param('partId')partId: string, 
    @Body()addHistoryDto : AddHistoryDto) {
      return this.partsService.addHistory(parseInt(partId), addHistoryDto);
    }

  @Patch('/:id')
  async update(
    @Param("id") id: string , 
    @Body() updatePartDto: UpdatePartDto ) {
      return await this.partsService.modify(parseInt(id), updatePartDto); 
  }

  @Delete('/:id')
  async delete(@Param("id") id: string) {
    return await this.partsService.remove(parseInt(id));
  }
}
