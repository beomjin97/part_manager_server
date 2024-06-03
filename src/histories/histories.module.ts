import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([History])],
    exports: [HistoriesService],
    providers: [HistoriesService]
})
export class HistoriesModule {}
