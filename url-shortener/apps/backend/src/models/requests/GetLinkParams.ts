import { isNumberString, IsNumber, IsInt, Min, Max } from "class-validator";
import { MAX_SHORT_ID } from "../../constants";

export class GetLinkParams {
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(MAX_SHORT_ID)
  readonly shortId: number;

  constructor(params: any) {
    this.shortId = isNumberString(params.shortId) ? Number(params.shortId) : -1;
  }
}
