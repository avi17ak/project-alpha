const { renderDOM } = require('./helpers');

let dom;
let document;

describe('homepage.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./client/pages/homepage.html');
    document = await dom.window.document;
  });

  it('has 4 subject buttons', () => {
    const buttons = document.querySelectorAll('.subject-btn');
    expect(buttons.length).toBe(4);

    const categories = Array.from(buttons).map(btn => btn.dataset.category);
    expect(categories).toEqual(expect.arrayContaining(['GEO', 'HIS', 'SPA', 'MUS']));
  });

  it('has a random button', () => {
    const randomBtn = document.querySelector('.random-btn');
    expect(randomBtn).toBeTruthy();
    expect(randomBtn.dataset.category).toBe('RAN');
  });

  it('has a header with Homepage text', () => {
    const h1 = document.querySelector('header h1');
    expect(h1).toBeTruthy();
    expect(h1.innerHTML).toBe('Homepage');
  });

  it('has a user dropdown menu with Account and Log out links', () => {
    const dropdown = document.querySelector('#userDropdown');
    expect(dropdown).toBeTruthy();

    const accountLink = document.querySelector('.dropdown-item[href="accountpage.html"]');
    const logoutLink = document.querySelector('#logoutBtn');
    expect(accountLink).toBeTruthy();
    expect(logoutLink).toBeTruthy();
    expect(logoutLink.getAttribute('href')).toBe('index.html');
  });

  it('geo button simulate a subject button click with data category geo', () => {
    const geoBtn = document.querySelector('.subject-btn[data-category="GEO"]');
    expect(geoBtn).toBeTruthy();

    geoBtn.click();
    expect(geoBtn.dataset.category).toBe('GEO');
  });

  it('history button simulate a subject button click with data category HIS', () => {
    const historyBtn = document.querySelector('.subject-btn[data-category="HIS"]');
    expect(historyBtn).toBeTruthy();

    historyBtn.click();
    expect(historyBtn.dataset.category).toBe('HIS');
  });
  it('spanish button simulate a subject button click with data category SPA', () => {
    const spanishBtn = document.querySelector('.subject-btn[data-category="SPA"]');
    expect(spanishBtn).toBeTruthy();

    spanishBtn.click();
    expect(spanishBtn.dataset.category).toBe('SPA');
  });
  it('music button simulate a subject button click with data category MUS', () => {
    const musicBtn = document.querySelector('.subject-btn[data-category="MUS"]');
    expect(musicBtn).toBeTruthy();

    musicBtn.click();
    expect(musicBtn.dataset.category).toBe('MUS');

  });

  it('random button simulate a random button click with data category RAN', () => {
    const randomBtn = document.querySelector('.random-btn');
    expect(randomBtn).toBeTruthy();

    randomBtn.click();
    expect(randomBtn.dataset.category).toBe('RAN');
  });

});
