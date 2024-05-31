import { Module } from '@nestjs/common';
import { PartsController } from './parts.controller';
import { PartsService } from './parts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from './entities/part.entity';
import { History } from './entities/history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([History, Part])],
  controllers: [PartsController],
  providers: [PartsService]
})
export class PartsModule {}
