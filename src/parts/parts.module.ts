import { Module } from '@nestjs/common';
import { PartsController } from './parts.controller';
import { PartsService } from './parts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from './entities/part.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Part])],
  controllers: [PartsController],
  providers: [PartsService]
})
export class PartsModule {}
