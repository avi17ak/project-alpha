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

document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.pathname.includes("mainQuestions.html")) return;

  const questionContainer = document.querySelector(".question-container");
  const difficultyContainer = document.querySelector(".difficulty");
  const contentContainer = document.querySelector(".quiz-content");

  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  let questions = [];
  let currentIndex = 0;
  let score = 0;

  if (!category) {
    questionContainer.textContent = "No category selected.";
    return;
  }

  fetchQuestionData(category);

  async function fetchQuestionData(category) {
    try {
      console.log("📡 Fetching questions for category:", category);
      const options = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      console.log(`http://localhost:3000/questions/subject/${category}`);

      const resp = await fetch(
        `http://localhost:3000/questions/subject/${category}`,
        options
      );

      console.log("Response status:", resp.status);

      if (!resp.ok) {
        throw new Error("API request failed");
      }

      const data = await resp.json();
      console.log("Raw API response:", data);

      questions = Array.isArray(data) ? data : data.data;

      if (!Array.isArray(questions) || questions.length === 0) {
        questionContainer.textContent = "No questions found for this category.";
        console.warn("⚠️ No questions found in API response");
        return;
      }

      console.log(`✅ Loaded ${questions.length} questions`);
      renderQuestion(questions[currentIndex]);
    } catch (err) {
      console.error("Error fetching question:", err);
      questionContainer.textContent = "Error loading question.";
    }
  }

  function renderQuestion(q) {
    if (!q) {
      console.error(
        "⚠️ Tried to render undefined question at index:",
        currentIndex
      );
      return;
    }

    questionContainer.textContent = q.question ?? "⚠️ Missing question text";
    difficultyContainer.textContent = `Difficulty: ${q.difficulty ?? "N/A"}`;

    const options = [q.answer, q.optionone, q.optiontwo, q.optionthree].filter(
      Boolean
    );

    if (options.length === 0) {
      console.error("⚠️ No options found for question:", q);
      contentContainer.innerHTML = "<p>No options available</p>";
      return;
    }

    options.sort(() => Math.random() - 0.5);

    contentContainer.innerHTML = "";
    options.forEach((opt) => {
      const btn = document.createElement("button");
      const answers = document.getElementsByClassName("option-btn");

      btn.classList.add("option-btn", "btn-outline-primary", "btn", "m-1");
      // "btn", "btn-outline-primary", "m-1"
      btn.textContent = opt;

      btn.addEventListener("click", () => {
        checkAnswer(opt, q.answer, btn);
      });

      contentContainer.appendChild(btn);
    });
  }

  function checkAnswer(selected, correct, btn) {
    if (selected === correct) {
      score++;
      console.log("✅ Correct! Score:", score);
      btn.classList.remove("btn-outline-primary");
      btn.classList.add("btn-success");
    } else {
      console.log("❌ Wrong. Correct answer was:", correct);
      btn.classList.remove("btn-outline-primary");
      btn.classList.add("btn-danger");
    }
    setTimeout(() => {
      currentIndex++;
      if (currentIndex < questions.length) {
        renderQuestion(questions[currentIndex]);
      } else {
        showResults();
      }
    }, 1000);
  }

  //Results at end of quiz n
  function showResults() {
    questionContainer.textContent = "🎉 Quiz Finished!";
    difficultyContainer.textContent = "";
    contentContainer.innerHTML = `<p>Your final score is: ${score} / ${questions.length}</p>`;
  }
});
