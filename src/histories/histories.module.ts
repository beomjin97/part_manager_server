import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { HistoriesController } from './histories.controller';

@Module({
    imports: [TypeOrmModule.forFeature([History])],
    controllers: [HistoriesController],
    providers: [HistoriesService],
    exports: [HistoriesService]
})
export class HistoriesModule {}
