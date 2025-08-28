const { renderDOM } = require('./helpers');

let dom;
let document;

xdescribe('index.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./client/pages/index.html');
    document = await dom.window.document;
  });
})