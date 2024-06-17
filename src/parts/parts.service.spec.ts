import { Test, TestingModule } from '@nestjs/testing';
import { PartsService } from './parts.service';
import { Part } from './entities/part.entity';
import { TypeOrmModule} from '@nestjs/typeorm';
import { SavePartDto } from './dtos/savePart.dto';
import { AddHistoryDto } from '../histories/dtos/addHistory.dto';
import { HistoriesModule } from '../histories/histories.module';
import { History } from '../histories/entities/history.entity';

describe('PartsService', () => {
  let service: PartsService;
  let savePartDto: SavePartDto

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [
          TypeOrmModule.forRoot({
            type: "sqlite",
            database: ":memory:",
            entities: [Part, History],
            synchronize: true,
            dropSchema: true,
            }), 
          TypeOrmModule.forFeature([Part]),
          HistoriesModule
        ],
        providers: [
          PartsService,
        ],
      }).compile();

      service = module.get<PartsService>(PartsService);
      savePartDto = {
        number: "test_number",
        name: "test_name",
        type: "cpu",
        detailedType: null,
        manufacturer: "test_company",
        storageLocation: "test_storageLocation",
        detailedStorageLocation: "test_DetailedStorageLocation",
        isImport: true,
        date: new Date("2024-05-04"),
        quantity: 1    
      }
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('save', async () => {
    const result = await service.save(savePartDto);
    expect(result.number).toBe(savePartDto.number);
  });

  it('findAll', async () => {
    const result = await service.findAll();
    expect(result).toBeInstanceOf(Array)
    expect(result[0].number).toBe(savePartDto.number);
  });

  it('findOneById', async () => {
    const result = await service.findOneById(1);
    expect(result.number).toBe(savePartDto.number);
  })

  it('modify', async () => {
    const updatedNumber = 'updated_number';
    await service.modify(1, {number: updatedNumber});
    
    const updatedEntity = await service.findOneById(1);
    expect(updatedEntity.number).toBe(updatedNumber);
  })

  it('addHistory', async () => {
    const addHistoryDto: AddHistoryDto = {
      isImport: false,
      quantity: 1,
      date: new Date("2024-01-01")
    }

    const result = await service.addHistory(1, addHistoryDto);
    expect(result.histories.length).toBe(2);
    expect(result.histories[1].isImport).toBeFalsy()
  })

  it('remove',  async () => {
    await service.remove(1);
    const empty = await service.findAll();
    expect(empty).toEqual([]);
  })
});
