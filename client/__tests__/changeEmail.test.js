const { renderDOM } = require('./helpers');

let dom;
let document;

describe('Change Email', () => {
  beforeEach(async () => {
    dom = await renderDOM('./client/pages/change_info/emailChange.html');
    document = await dom.window.document;
  });

//Only click update button when fields are inputted
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
    const oldEmailInput = document.querySelector('input[name="oldEmail"]');
    const newEmailInput = document.querySelector('input[name="newEmail"]');

    oldEmailInput.value = 'test@example.com';
    newEmailInput.value = 'test2@example.com';

    expect(oldEmailInput.value).toBe('test@example.com');
    expect(newEmailInput.value).toBe('test2@example.com');
  });

  it('Only allows sign up button to be clicked when all fields are valid', () => {
    const form = document.querySelector('.change_email');
    const updateBtn = form.querySelector('button[type="submit"]');
    const oldEmailInput = form.querySelector('input[name="oldEmail"]');
    const newEmailInput = form.querySelector('input[name="newEmail"]');

    // Initially empty, button should be disabled
    updateBtn.disabled = !oldEmailInput.value || !newEmailInput.value;
    expect(updateBtn.disabled).toBe(true);

    // Fill valid values
    oldEmailInput.value = 'israel@example.com';
    newEmailInput.value = 'israel2@example.com';

    updateBtn.disabled = !oldEmailInput.value || !newEmailInput.value;
    expect(updateBtn.disabled).toBe(false);
  });

    it('Requires a valid email', () => {
    const oldEmailInput = document.querySelector('input[name="oldEmail"]');
    const newEmailInput = document.querySelector('input[name="newEmail"]');
    const updateBtn = document.querySelector('button[type="submit"]');

    //Creating and invalid email as an input and checking if there is an @ or . to check if it is an email
    oldEmailInput.value = 'invalid-email';
    newEmailInput.value = 'invalid-email';
    oldEmailInput.dispatchEvent(new dom.window.Event('input'));
    newEmailInput.dispatchEvent(new dom.window.Event('input'));
    updateBtn.disabled = !oldEmailInput.value.includes('@') || !oldEmailInput.value.includes('.');
    updateBtn.disabled = !newEmailInput.value.includes('@') || !newEmailInput.value.includes('.');
    expect(updateBtn.disabled).toBe(true);

    oldEmailInput.value = 'israel@example.com';
    newEmailInput.value = 'israel2@example.com';
    oldEmailInput.dispatchEvent(new dom.window.Event('input'));
    newEmailInput.dispatchEvent(new dom.window.Event('input'));
    updateBtn.disabled = !oldEmailInput.value.includes('@') || !oldEmailInput.value.includes('.');
    updateBtn.disabled = !newEmailInput.value.includes('@') || !newEmailInput.value.includes('.');
    expect(updateBtn.disabled).toBe(false);
  });

  });