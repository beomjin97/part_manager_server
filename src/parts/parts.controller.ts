import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PartsService } from './parts.service';
import { SavePartDto } from './dtos/savePart.dto';
import { UpdatePartDto } from './dtos/updatePart.dto';
import { AddHistoryDto } from '../histories/dtos/addHistory.dto';

@Controller('part')
export class PartsController {
    
  constructor(private partsService:PartsService) {}
  
  @Get()
  async findAll(
    @Query('type') type?: string,
    @Query('detailedType') detailedType?: string,
    @Query('name') name?: string,
    @Query('number') number?: string,
    @Query('manufacturer') manufacturer?: string,
    @Query('storageLocation') storageLocation?: string,
    @Query('detailedStorageLocation') detailedStorageLocation?: string
  ) {
    return await this.partsService.findAll(type, detailedType, name, number, manufacturer, storageLocation, detailedStorageLocation);
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
