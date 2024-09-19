import { Body, Controller, Delete, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { UpdateHistoryDto } from './dtos/updateHistory.dto';

@Controller('history')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}
  
  @Patch("/:id")
  update(
    @Param("id", ParseIntPipe) id: number, 
    @Body()updateHistoryDto: UpdateHistoryDto
  ) {
    return this.historiesService.update(id,updateHistoryDto);
  } 

  @Delete("/:id")
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.historiesService.delete(id);
  }
}