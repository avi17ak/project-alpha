const { renderDOM } = require('..js/homepage');

let dom;
let document;

describe('homepage.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./homepage.html');
    document = await dom.window.document;
  })

  it('has 4 buttons', () => {
    const buttons = document.querySelectorAll('button')
    expect(buttons.length).toBe(5)
    expect(buttons[0].innerHTML).toBe(" Geography")
    expect(buttons[1].innerHTML).toBe("History")
    expect(buttons[2].innerHTML).toBe("Spanish")
    expect(buttons[3].innerHTML).toBe("Music")
    expect(buttons[4].innerHTML).toBe("Random")
})

  it('h1 is empty when website loads', () => {
    const h1 = document.querySelector('h1')
    expect(h1).toBeTruthy
    expect(h1.innerHTML).toContain('Homepage')
  })

  xit('displays morning when the btn is clicked', () => {
    const btn = document.querySelector('button')
    btn.click();
    const h1 = document.querySelector('h1')
    expect(h1.innerHTML).toContain('morning')
  })

  xit('displays dark mode', () => {
    const body = document.querySelector('body')
    const darkModeBtn = document.querySelector('#dark-mode')

    darkModeBtn.click()
    expect(body.className).toBe('dark-mode')
  })

  xit('adds the input value to the h1', () => {
    const form = document.querySelector('form')
    const h1 = document.querySelector('h1')
  
    const input = document.querySelector('#name')
    input.value = 'emile'
    form.dispatchEvent(new dom.window.Event('submit'));
  
    expect(h1.innerHTML).toContain(input.value)
  })

  xit('switches back to light mode', () => {
    const body = document.querySelector('body')
    const darkModeBtn = document.querySelector('#dark-mode')

    darkModeBtn.click()
    darkModeBtn.click()
    expect(body.className).toBe('')
  })
})
