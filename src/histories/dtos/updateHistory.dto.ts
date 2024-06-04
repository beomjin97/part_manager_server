import { PartialType } from "@nestjs/mapped-types"
import { SaveHistoryDto } from "./saveHistory.dto"

export class UpdateHistoryDto extends PartialType(SaveHistoryDto) {}