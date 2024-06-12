import { Test, TestingModule } from '@nestjs/testing';
import { PartsController } from './parts.controller';
import { PartsService } from './parts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Part } from './entities/part.entity';
import { SavePartDto } from './dtos/savePart.dto';
import { AddHistoryDto } from 'src/histories/dtos/addHistory.dto';

describe('PartsController', () => {
  let controller: PartsController;
  let service: PartsService;
  let part: Part 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartsController],
      providers: [
        {
          provide: PartsService,
          useValue : {
            findAll: jest.fn(),
            findOneById: jest.fn(),
            save: jest.fn(),
            addHistory: jest.fn(),
            modify: jest.fn(),
            remove: jest.fn()
          }
        } ]
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
        .mockImplementation(() => Promise.resolve([part]))

      expect(await controller.findAll()).toEqual([part]);
      expect(spy).toHaveBeenCalledTimes(1)
  })

  it('findOne', async () => {
    const spy = jest
      .spyOn(service, 'findOneById')
      .mockImplementation(() => Promise.resolve(part));
    
    expect(await controller.findOne('1')).toEqual(part);
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('create', async() => {
    const spy = jest
      .spyOn(service, 'save')
      .mockImplementation(() => Promise.resolve(part));
    
    const savePartDto: SavePartDto = {
      number: "test_number",
      name: "test_name",
      manufacturer: "test_company",
      storageLocation: "test_storageLocation",
      detailedStorageLocation: "test_DetailedStorageLocation",
      isImport: true,
      date: new Date("2024-05-04"),
      quantity: 1    
    }

    expect(await controller.create(savePartDto)).toEqual(part);
    expect(spy).toHaveBeenCalledTimes(1);
  })

  it('addHistory', async () => {
    const addHistoryDto: AddHistoryDto = {
      isImport: true, 
      date: new Date('2024-05-03'), 
      quantity: 1
    }  
    
      const partWithAddedHistory:Part = {
        ...part, 
        histories: [
          ...part.histories, 
          {
            id: 2, isImport: true, date: new Date('2024-05-03'), quantity: 1,
            part: new Part()
          }
    ]}

    const spy = jest
      .spyOn(service, 'addHistory') 
      .mockImplementation(() => Promise.resolve(partWithAddedHistory));
    
    expect(await controller.addHistory('1', addHistoryDto)).toEqual(partWithAddedHistory)  
  })

  it('update', async () => {
    const updateResult: UpdateResult = {
      raw: [],
      affected: 1,
      generatedMaps: []
    }

    const spy = jest
      .spyOn(service, 'modify')
      .mockImplementation(() => Promise.resolve(updateResult))

    expect(await controller.update('1', {number: "updated_number"}))
  })

  it('delete', async () => {
    const spy = jest
      .spyOn(service, 'remove')
      .mockImplementation(() => Promise.resolve(part))

    expect(await controller.delete('1')).toEqual(part);
  })
});
