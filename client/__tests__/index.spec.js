const { renderDOM } = require('./helpers');

let dom;
let document;

xdescribe('index.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./client/pages/index.html');
    document = await dom.window.document;
  });
  
//Signup links to signup 
//home links to home 
//forget password 
//can type??? in the form 



  it('has 4 subject buttons', () => {
    const buttons = document.querySelectorAll('.subject-btn');
    expect(buttons.length).toBe(4);

    const categories = Array.from(buttons).map(btn => btn.dataset.category);
    expect(categories).toEqual(expect.arrayContaining(['GEO', 'HIS', 'SPA', 'MUS']));
  });
});