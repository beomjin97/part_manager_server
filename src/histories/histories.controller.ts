import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { UpdateHistoryDto } from './dtos/updateHistory.dto';

@Controller('history')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}
  
  @Patch("/:id")
  update(@Param("id") id: string, @Body()updateHistoryDto: UpdateHistoryDto) {
    return this.historiesService.update(parseInt(id),updateHistoryDto);
  } 

  @Delete("/:id")
  delete(@Param('id') id: string) {
    return this.historiesService.delete(parseInt(id));
  }
}