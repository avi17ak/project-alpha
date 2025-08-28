const { renderDOM } = require('./helpers');

let dom;
let document;

describe('homepage.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./client/pages/change_info/passChange.html');
    document = await dom.window.document;
  });

//Only click update button when inputs are done 
//type in form
//email part of the form requires @ and stuff after
//notnull

    it('has a button', () => {
    const btn = document.querySelector('button')
    expect(btn).toBeTruthy
    expect(btn.innerHTML).toBe("Update")
  })


  it('Home button links to student home page', () => {
    const btn = document.querySelector('#change_home');
    expect(btn).toBeTruthy();
    btn.click();
    expect(btn.getAttribute('href')).toBe('../homepage.html');
  });

    it('Account button links back to account page', () => {
    const btn = document.querySelector('#change_account');
    expect(btn).toBeTruthy();
    btn.click();
    expect(btn.getAttribute('href')).toBe('../accountpage.html');
  });

    it('Able to type in form fields', () => {
    const oldPassInput = document.querySelector('input[name="oldPassword"]');
    const newPassInput = document.querySelector('input[name="newPassword"]');

    oldPassInput.value = 'lafosse';
    newPassInput.value = 'lafosse1';

    expect(oldPassInput.value).toBe('lafosse');
    expect(newPassInput.value).toBe('lafosse1');
  });

  it('Only allows sign up button to be clicked when all fields are valid', () => {
    const form = document.querySelector('.change_email');
    const updateBtn = document.querySelector('button[type="submit"]');
    const oldPassInput = document.querySelector('input[name="oldPassword"]');
    const newPassInput = document.querySelector('input[name="newPassword"]');

    // Initially empty, button should be disabled
    updateBtn.disabled = !oldPassInput.value || !newPassInput.value;
    expect(updateBtn.disabled).toBe(true);

    // Fill valid values
    oldPassInput.value = 'lafosse';
    newPassInput.value = 'lafosse1';

    updateBtn.disabled = !oldPassInput.value || !newPassInput.value;
    expect(updateBtn.disabled).toBe(false);
  });

  it('Needs passwords to contain only letters and numbers', () => {
  const oldPassInput = document.querySelector('input[name="oldPassword"]');
  const newPassInput = document.querySelector('input[name="newPassword"]');
  const updateBtn = document.querySelector('button[type="submit"]');

  const isAlphanumeric = value => /^[A-Za-z0-9]+$/.test(value);

  //Invalid passwords (empty or with special chars)
  oldPassInput.value = '';
  newPassInput.value = '';
  oldPassInput.dispatchEvent(new dom.window.Event('input'));
  newPassInput.dispatchEvent(new dom.window.Event('input'));
  updateBtn.disabled = !isAlphanumeric(oldPassInput.value) || !isAlphanumeric(newPassInput.value);
  expect(updateBtn.disabled).toBe(true);

  oldPassInput.value = 'pass@123';  //Invalid, contains @
  newPassInput.value = 'password!';
  oldPassInput.dispatchEvent(new dom.window.Event('input'));
  newPassInput.dispatchEvent(new dom.window.Event('input'));
  updateBtn.disabled = !isAlphanumeric(oldPassInput.value) || !isAlphanumeric(newPassInput.value);
  expect(updateBtn.disabled).toBe(true);

  //Valid passwords (letters + numbers only)
  oldPassInput.value = 'Password123';
  newPassInput.value = 'NewPass456';
  oldPassInput.dispatchEvent(new dom.window.Event('input'));
  newPassInput.dispatchEvent(new dom.window.Event('input'));
  updateBtn.disabled = !isAlphanumeric(oldPassInput.value) || !isAlphanumeric(newPassInput.value);
  expect(updateBtn.disabled).toBe(false);
})


  });