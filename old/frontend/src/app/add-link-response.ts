interface AddLinkSuccessfulResponse {
  status: 'success';
  shortId: number;
}

interface AddLinkErrorResponse {
  status: 'error';
  error: string;
}

export type AddLinkResponse = AddLinkSuccessfulResponse | AddLinkErrorResponse;
