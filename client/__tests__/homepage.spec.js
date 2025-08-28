const { renderDOM } = require('./helpers');

let dom;
let document;

describe('homepage.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./client/pages/homepage.html');
    document = await dom.window.document;
  });

  it('has subject buttons', () => {
    const buttons = document.querySelectorAll('.subject-btn');
    expect(buttons.length).toBeGreaterThan(0);

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

  it('can simulate a subject button click', () => {
    const geoBtn = document.querySelector('.subject-btn[data-category="GEO"]');
    expect(geoBtn).toBeTruthy();

    geoBtn.click();
    expect(geoBtn.dataset.category).toBe('GEO');
  });
});
