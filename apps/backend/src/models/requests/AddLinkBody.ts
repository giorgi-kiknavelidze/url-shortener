import { IsString, IsUrl } from 'class-validator';

export class AddLinkBody {
  @IsString()
  @IsUrl()
  readonly link: string;
  constructor(body: { link: string }) {
    this.link = body.link;
  }
}
