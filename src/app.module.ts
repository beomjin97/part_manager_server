import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsModule } from './parts/parts.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "sqlite",
    database: "db.sqlite",
    autoLoadEntities: true,
    synchronize: true,
    dropSchema: true,
  }), PartsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
