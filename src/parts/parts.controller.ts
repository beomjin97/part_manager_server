import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PartsService } from './parts.service';
import { SavePartDto } from './dtos/savePart.dto';
import { UpdatePartDto } from './dtos/updatePart.dto';
import { AddHistoryDto } from '../histories/dtos/addHistory.dto';

@Controller('part')
export class PartsController {
    
  constructor(private partsService:PartsService) {}
  
  @Get()
  async findAll() {
    return await this.partsService.findAll();
  }

  @Get("/:id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return await this.partsService.findOneById(id);
  }

  @Post()
  async create(@Body() savePartDto: SavePartDto ) {
    return await this.partsService.save(savePartDto);
  }

  @Post("/:partId/history")
  async addHistory(
    @Param('partId', ParseIntPipe)partId: number, 
    @Body()addHistoryDto : AddHistoryDto
  ) {
    return this.partsService.addHistory(partId, addHistoryDto);
  }

  @Patch('/:id')
  async update(
    @Param("id", ParseIntPipe) id: number , 
    @Body() updatePartDto: UpdatePartDto 
  ) {
      return await this.partsService.modify(id, updatePartDto); 
  }

  @Delete('/:id')
  async delete(@Param("id", ParseIntPipe) id: number) {
    return await this.partsService.remove(id);
  }
}
