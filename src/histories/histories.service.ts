import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { History } from "./entities/history.entity";
import { Repository } from "typeorm";

@Injectable()
export class HistoriesService {
    constructor(@InjectRepository(History) private readonly historyRepository : Repository<History> ) {}

    public create(history: Partial<History>):Promise<History> {
        return this.historyRepository.save(new History(history))
    }

    public async delete(id:number) {
        await this.identifyExistenceById(id);
        return this.historyRepository.delete(id);
    }

    public async update(id:number, partial: Partial<History>) {
        await this.identifyExistenceById(id);
        return this.historyRepository.update(id, partial);
    }

    private async identifyExistenceById(id:number) {
        const history = await this.historyRepository.findOne({
            where: {id}
        })

        if (!history) {
            throw new NotFoundException('해당 기록이 없습니다.')
        }
    }

}