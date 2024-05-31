import { Test, TestingModule } from '@nestjs/testing';
import { PartsService } from './parts.service';
import { Part } from './entities/part.entity';
import { TypeOrmModule} from '@nestjs/typeorm';
import { History } from './entities/history.entity';

describe('PartsService', () => {
  let service: PartsService;
  let part:Part;

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
          TypeOrmModule.forFeature([Part, History])],
        providers: [
          PartsService,
        ],
      }).compile();

      service = module.get<PartsService>(PartsService);

      part = new Part ();
      part.number = "test_number";
      part.name = "test_name";
      part.manufacturer = "test_company";
      part.storageLocation = "test_storageLocation";
      part.DetailedStorageLocation = "test_DetailedStorageLocation";
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('save', async () => {
    const result = await service.save(part);
    expect(result.name).toBe(part.name);
  });

  it('findAll', async () => {
    const result = await service.findAll();
    expect(result).toEqual([part]);
  });

  it('remove',  async () => {
    const result = await service.remove(part);
    expect(result).toEqual(part);

    const empty = await service.findAll();
    expect(empty).toEqual([]);
  })

  it('modify', async () => {
    const existingEntity = await service.save(part);

    const updatedName = 'updated_name';
    await service.modify(existingEntity.id, {name: updatedName});
    
    const updatedEntity = await service.findOneById(existingEntity.id);
    expect(updatedEntity.name).toBe(updatedName);
  })
});
