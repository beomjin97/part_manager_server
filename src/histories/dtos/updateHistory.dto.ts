import { PartialType } from "@nestjs/mapped-types"
import { AddHistoryDto } from "./addHistory.dto"

export class UpdateHistoryDto extends PartialType(AddHistoryDto) {}