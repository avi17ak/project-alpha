// Select all buttons
const categoryButtons = document.querySelectorAll('.subject-btn');

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    window.location.href = `mainQuestions.html?category=${category}`;
  });
});
const optionButtons = document.querySelectorAll('.option-btn');
const questionContainer = document.querySelector('.question-container');
const difficultyContainer = document.querySelector('.difficulty');
const contentContainer = document.querySelector('.content');

optionButtons.forEach(button => {
  button.addEventListener('click', async () => {
    const category = button.getAttribute('data-category');
    try {
      //fwtch questions for cat
      const response = await fetch(`/questions/subject/${category}`);
      const questions = await response.json();

      // clear previous question
      questionContainer.textContent = '';
      difficultyContainer.textContent = '';
      // contentContainer.innerHTML = '';
    }
    catch(err){
      throw error
    }
  })
})