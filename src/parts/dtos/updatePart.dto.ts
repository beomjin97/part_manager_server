import { PartialType } from "@nestjs/mapped-types";
import { SavePartDto } from "./savePart.dto";

export class UpdatePartDto extends PartialType(SavePartDto) {}