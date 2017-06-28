import { NiallDevelopmentGroupBookItPage } from './app.po';

describe('niall-development-group-book-it App', () => {
  let page: NiallDevelopmentGroupBookItPage;

  beforeEach(() => {
    page = new NiallDevelopmentGroupBookItPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
