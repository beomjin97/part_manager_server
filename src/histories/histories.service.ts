import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { History } from "./entities/history.entity";
import { Repository } from "typeorm";

@Injectable()
export class HistoriesService {
    constructor(@InjectRepository(History) private readonly historyRepository : Repository<History> ) {}

    public create(history: Partial<History>) {
        this.historyRepository.save(new History(history))
    }

    public delete(id:number) {
        this.historyRepository.delete(id);
    }

    public update(id:number, partial: Partial<History>) {
        this.historyRepository.update(id, partial);
    }

    private async identifyExistenceById(id:number) {
        const history = await this.historyRepository.findOne({
            where: {id}
        })
    }

}