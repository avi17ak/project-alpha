// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // --- Protect page: redirect if not logged in ---
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in first.");
    window.location.assign("index.html"); // redirect to login
    return;
  }

  // --- Logout button ---
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token"); // remove JWT
      alert("You have been logged out.");
      window.location.assign("index.html"); // redirect to login page
    });
  }
});

// homepage.js
const categoryButtons = document.querySelectorAll('.subject-btn');

categoryButtons.forEach(button => { 
  button.addEventListener('click', () => { 
    const category = button.getAttribute('data-category');
    // ✅ just navigate — don't fetch here
    window.location.href = `mainQuestions.html?category=${category}`;
  });
});
