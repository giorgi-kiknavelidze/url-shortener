import { Matches, IsString } from "class-validator";

export class SParams {
  @IsString()
  @Matches(/^[23456789CFGHJMPQRVWXcfghjmpqrvwx]+$/)
  readonly encodedShortId: string;

  constructor(params: any) {
    this.encodedShortId = params.encodedShortId ?? "";
  }
}
