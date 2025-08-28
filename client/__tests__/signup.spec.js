const { renderDOM } = require('./helpers');

let dom;
let document;

xdescribe('signup.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./client/pages/signup.html');
    document = await dom.window.document;
  });
//Only click signup button when signed up 
//type in form
//email part of the form requires @ and stuff after 
//notnull
//name no numbers 
  it('requires a valid email', () => {
    const emailInput = document.querySelector('input[name="email"]');
    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input'));
    const signupBtn = document.querySelector('button[type="submit"]');
    expect(signupBtn.disabled).toBe(true);

    emailInput.value = 'valid@example.com';
    emailInput.dispatchEvent(new Event('input'));
    expect(signupBtn.disabled).toBe(false);
  });
});