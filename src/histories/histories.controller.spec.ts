import { Test, TestingModule } from "@nestjs/testing"
import { HistoriesController } from "./histories.controller"
import { HistoriesService } from "./histories.service"
import { DeleteResult, UpdateResult } from "typeorm";
import { UpdateHistoryDto } from "./dtos/updateHistory.dto";

describe('HistoriesController', () => {
    let controller: HistoriesController;
    let service: HistoriesService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [HistoriesController],
            providers: [
                {
                    provide: HistoriesService,
                    useValue: {
                        update: jest.fn(),
                        delete: jest.fn()
                    }
                }
            ]
        }).compile()

        controller = module.get<HistoriesController>(HistoriesController);
        service = module.get<HistoriesService>(HistoriesService)
    })

    it('update', async () => {
        const updateResult: UpdateResult = {
            raw: [], 
            affected: 1, 
            generatedMaps: []
        }

        const updateHistoryDto: UpdateHistoryDto = {
            isImport: false
        }

        jest.spyOn(service, 'update')
            .mockImplementation(() => Promise.resolve(updateResult))
        
        expect(await controller.update(1, updateHistoryDto))
    })

    it('delete', async () => {
        const deleteResult: DeleteResult = {raw: [], affected: 1}
        
        jest.spyOn(service, 'delete')
            .mockImplementation(() => Promise.resolve(deleteResult))
        
        expect(await controller.delete(1)).toEqual(deleteResult);
    })
})