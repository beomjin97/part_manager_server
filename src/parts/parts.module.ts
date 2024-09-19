import { Module } from '@nestjs/common';
import { PartsController } from './parts.controller';
import { PartsService } from './parts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from './entities/part.entity';
import { HistoriesModule } from 'src/histories/histories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Part]), HistoriesModule],
  controllers: [PartsController],
  providers: [PartsService]
})
export class PartsModule {}
