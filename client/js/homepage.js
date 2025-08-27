// homepage.js
const categoryButtons = document.querySelectorAll('.subject-btn');

categoryButtons.forEach(button => { 
  button.addEventListener('click', () => { 
    const category = button.getAttribute('data-category');
    // ✅ just navigate — don't fetch here
    window.location.href = `mainQuestions.html?category=${category}`;
  });
});
