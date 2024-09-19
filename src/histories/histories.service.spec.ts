import { TestingModule, Test } from "@nestjs/testing"
import { HistoriesService } from "./histories.service"
import { getRepositoryToken } from "@nestjs/typeorm"
import { History } from "./entities/history.entity"
import { DeleteResult, Repository, UpdateResult } from "typeorm"
import { Part } from "../parts/entities/part.entity"
import { AddHistoryDto } from "./dtos/addHistory.dto"
import { UpdateHistoryDto } from "./dtos/updateHistory.dto"

describe('HistoriesService', () => {
  let service: HistoriesService
  let repository: Repository<History>
  let history: History = {
    id: 1,
    isImport: false,
    date: new Date(),
    quantity: 1,
    part: new Part()
  }
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoriesService,
          {
            provide: getRepositoryToken(History),
            useValue: {
              save: jest.fn(),
              delete: jest.fn(),
              update: jest.fn(),
              findOne: jest.fn(() => Promise.resolve(history))
            }
          }
        ]
    }).compile() 
    
    repository = module.get(getRepositoryToken(History))
    service = module.get<HistoriesService>(HistoriesService)
  })

  it('create', async () => {
    jest.spyOn(repository, 'save')
        .mockImplementation(() => Promise.resolve(history))
    
    const addHistoryDto: AddHistoryDto = {
      isImport: true,
      date: new Date(),
      quantity: 1
    }  
      expect(await service.create(addHistoryDto)).toEqual(history)   
  })

  it('delete', async() => {
    const deleteResult: DeleteResult = {raw: [], affected: 1}

    jest.spyOn(repository, 'delete')
        .mockImplementation(() => Promise.resolve(deleteResult));

    expect(await service.delete(1)).toEqual(deleteResult);
  })

  it('update', async() => {
    const updateResult: UpdateResult = {
      raw: [], 
      affected: 1, 
      generatedMaps: []
    }

    const updateHistoryDto: UpdateHistoryDto = {
      isImport: false
    }

    jest.spyOn(repository, 'update')
        .mockImplementation(() => Promise.resolve(updateResult))
    
    expect(await service.update(1, updateHistoryDto)).toEqual(updateResult)  
  })
})