document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in first.");
    window.location.assign("index.html"); // redirect to login
    return;
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token"); // remove JWT
      localStorage.removeItem('userid')
      localStorage.removeItem('username')
      alert("You have been logged out.");
      window.location.assign("index.html");
    });
  }
});

const categoryButtons = document.querySelectorAll('.subject-btn, .random-btn'); 

categoryButtons.forEach(button => { 
  // button.classList.add("subject-btn", "btn-outline-primary", "btn", "m-1");
// Changes the button styling shortcut !
  button.addEventListener('click', () => { 
    const category = button.getAttribute('data-category');
    window.location.href = `mainQuestions.html?category=${category}`;
  });
});
