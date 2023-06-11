import { IsString, IsUrl } from "class-validator";

export class AddLinkBody {
  @IsString()
  @IsUrl()
  readonly link: string;
  constructor(body: any) {
    this.link = body.link;
  }
}
