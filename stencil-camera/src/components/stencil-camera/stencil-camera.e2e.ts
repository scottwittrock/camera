import { newE2EPage } from '@stencil/core/testing';

describe('stencil-camera', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stencil-camera></stencil-camera>');

    const element = await page.find('stencil-camera');
    expect(element).toHaveClass('hydrated');
  });
});
