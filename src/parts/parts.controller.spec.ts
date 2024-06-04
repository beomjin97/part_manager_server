import { Test, TestingModule } from '@nestjs/testing';
import { PartsController } from './parts.controller';
import { PartsService } from './parts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Part } from './entities/part.entity';

describe('PartsController', () => {
  let controller: PartsController;
  let service: PartsService;
  let part: Part 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartsController],
      providers: [
        PartsService, 
        {
        provide: getRepositoryToken(Part),
        useClass: Repository
        }]
    }).compile();

    part = {
      id: 1,
      number: "test_part_number",
      name: "test_part_name", 
      manufacturer: "test_manufacturer", 
      storageLocation: "test_storage_location", 
      detailedStorageLocation: "testDetailedStorageLocation", 
      histories: [{
        id: 1,
        isImport: true,
        date: new Date(),
        quantity: 1,
        part: new Part()
      }]
    }

    controller = module.get<PartsController>(PartsController);
    service = module.get<PartsService>(PartsService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll', async () => {
      const spy = jest
        .spyOn(service, 'findAll')
        .mockImplementation(():any => Promise.resolve([part]))

      expect(await controller.findAll()).toEqual([part]);
      expect(spy).toHaveBeenCalledTimes(1)
  })

  it('create', async () => {
    const spy = jest.spyOn(service, 'save').mockImplementation(())
  })
});
