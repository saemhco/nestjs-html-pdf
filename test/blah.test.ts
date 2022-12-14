import { createPdf } from '../src';
import * as path from 'path';

describe('blah', () => {
  it('works', async() => {
    const filePath = path.join(process.cwd(), 'templates', 'pdf-profile.hbs');
    const buffer = await createPdf(filePath);
    expect(typeof buffer).toEqual('object');
  });
});
