import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';

@Module({
    imports: [TypeOrmModule.forFeature([History])],
    exports: [HistoriesService],
    providers: [HistoriesService]
})
export class HistoriesModule {}
