const { renderDOM } = require('./helpers');

let dom;
let document;

describe('accountPage.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./client/pages/accountPage.html');
    document = await dom.window.document;
  });

  it('has a header with "Account Page" text', () => {
    const h1 = document.querySelector('header h1');
    expect(h1).toBeTruthy();
    expect(h1.innerHTML).toBe('Account Page');
  });

  it('has a home icon link to homepage.html', () => {
    const homeLink = document.querySelector('a.home-icon');
    expect(homeLink).toBeTruthy();
    expect(homeLink.getAttribute('href')).toBe('homepage.html');
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

  it('shows a username section', () => {
    const username = document.querySelector('.username-btn');
    expect(username).toBeTruthy();
    expect(username.innerHTML).toBe('username');
  });

  it('has 4 stats boxes and an image box', () => {
    const history = document.querySelector('.history-box');
    const geography = document.querySelector('.geography-box');
    const music = document.querySelector('.music-box');
    const spanish = document.querySelector('.spanish-box');
    const image = document.querySelector('.image-box');

    expect(history).toBeTruthy();
    expect(history.innerHTML).toBe('History Stats');
    expect(geography).toBeTruthy();
    expect(geography.innerHTML).toBe('Geography Stats');
    expect(music).toBeTruthy();
    expect(music.innerHTML).toBe('Music Stats');
    expect(spanish).toBeTruthy();
    expect(spanish.innerHTML).toBe('Spanish Stats');
    expect(image).toBeTruthy();
    expect(image.innerHTML).toBe('Image');
  });

  it('has footer buttons with correct links', () => {
    const changePassword = document.querySelector('a[href="change_info/passChange.html"]');
    const changeUsername = document.querySelector('a[href="change_info/nameChange.html"]');
    const changeEmail = document.querySelector('a[href="change_info/emailChange.html"]');

    expect(changePassword).toBeTruthy();
    expect(changeUsername).toBeTruthy();
    expect(changeEmail).toBeTruthy();
  });
});
