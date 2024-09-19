import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { History } from "./entities/history.entity";
import { Repository } from "typeorm";
import { AddHistoryDto } from "./dtos/addHistory.dto";
import { UpdateHistoryDto } from "./dtos/updateHistory.dto";

@Injectable()
export class HistoriesService {
	constructor(@InjectRepository(History) private readonly historyRepository : Repository<History> ) {}

	public create(addHistoryDto: AddHistoryDto):Promise<History> {
		return this.historyRepository.save(addHistoryDto)
	}

	public async delete(id:number) {
		await this.identifyExistenceById(id);
		return this.historyRepository.delete(id);
	}

	public async update(id:number, updateHistoryDto: UpdateHistoryDto) {
		await this.identifyExistenceById(id);
		return this.historyRepository.update(id, updateHistoryDto);
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