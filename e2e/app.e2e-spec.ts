import { MoviedbPage } from './app.po';

describe('moviedb App', () => {
  let page: MoviedbPage;

  beforeEach(() => {
    page = new MoviedbPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
