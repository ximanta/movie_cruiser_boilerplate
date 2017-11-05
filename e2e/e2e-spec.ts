import { browser, by, element } from 'protractor';

describe('Movie Cruiser App', function() {

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Movie Cruiser');
  });

  it('should be redirected to /home route on opening the application', () => {
    expect(browser.getCurrentUrl()).toContain('/home');
  });

  it('should be able to search for movies', () => {
    browser.element(by.id('search-box')).sendKeys('Super');
    browser.element(by.id('search-button')).click();

    const searchItems = element.all(by.css('.movieTitle'));
    expect(searchItems.count()).toBe(20);
    for (let i = 0; i < 2; i += 1) {
      expect(searchItems.get(i).getText()).toContain('Super');
    }
  });

  it('should be able to add  to watchlist', () => {
    const searchItems = element.all(by.css('.movieItem'));
    expect(searchItems.count()).toBe(20);
    searchItems.get(0).click();
    browser.element(by.id('addBtn')).click();
  });

  it('should be able to retrieve watchlist and do comments and remove', () => {
    browser.element(by.cssContainingText('a', 'Your Watchlist')).click();

    let watchlistItems = element.all(by.css('.movieDescription'));
    expect(watchlistItems.count()).toBe(1, `There should be one movie item displaying
      on watchlist page displaying description decorated with class-name: 'movieDescription'`);
    expect(watchlistItems.get(0).getText()).toContain('Super', `The movie showing up on
      watchlist page is expected to contain text 'Super'`);

    watchlistItems = element.all(by.css('.movieCommentsInpt'));
    expect(watchlistItems.count()).toBe(1, `Expected an input element
      for the watchlist movie item decorated with class-name: 'movieCommentsInpt'`);
    watchlistItems.get(0).sendKeys('test comment');
    watchlistItems = element.all(by.css('.movieUpdateCommentsBtn'));
    expect(watchlistItems.count()).toBe(1, `Expected a button for the watchlist movie
      item decorated with class-name: 'movieUpdateCommentsBtn' tp update comments on the movie`);
    watchlistItems.get(0).click();

    browser.refresh();

    watchlistItems = element.all(by.css('.movieCommentsInpt'));
    expect(watchlistItems.count()).toBe(1, `Expected an input element for
      the watchlist movie item decorated with class-name: 'movieCommentsInpt'`);
    expect(watchlistItems.get(0).getAttribute('value')).toContain('test comment', `Expected movie
      comment to be showing up for every movie item (if set) on the watchlist page`);

    watchlistItems = element.all(by.css('.movieRemoveBtn'));
    expect(watchlistItems.count()).toBe(1, `Expected a button for the watchlist movie
      item decorated with class-name: 'movieRemoveBtn' to remove the movie from watchlist`);
    watchlistItems.get(0).click();

    watchlistItems = element.all(by.css('.movieDescription'));
    expect(watchlistItems.count()).toBe(0, `Clicking on the remove button for a movie item should
      remove that movie from the watchlist page`);
  });
});
