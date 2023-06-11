import { validate } from 'class-validator';
import { AddLinkBody } from './AddLinkBody';

describe('AddLinkBody', () => {
  it('should validate if valid link is provided', async () => {
    const addLinkBody = new AddLinkBody({ link: 'http://example.com' });
    expect(await validate(addLinkBody)).toHaveLength(0);
  });

  it('should not validate if link is not provided', async () => {
    const addLinkBody = new AddLinkBody({
      misspelledLink: 'http://example.com',
    });
    expect(await validate(addLinkBody)).not.toHaveLength(0);
  });

  it('should not validate if link is not a valid url', async () => {
    const addLinkBody = new AddLinkBody({
      link: 'example:\\\\.com',
    });
    expect(await validate(addLinkBody)).not.toHaveLength(0);
  });

  it('should not validate if link is not a string', async () => {
    const addLinkBodyNumber = new AddLinkBody({ link: 500 });
    expect(await validate(addLinkBodyNumber)).not.toHaveLength(0);

    const addLinkBodyBoolean = new AddLinkBody({ link: true });
    expect(await validate(addLinkBodyBoolean)).not.toHaveLength(0);
  });
});
