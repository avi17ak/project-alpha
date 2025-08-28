// --- Logout button ---
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("token"); 
    alert("You have been logged out.");
    window.location.assign("index.html"); 
  });
}

console.log(localStorage.getItem("username"));


document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.pathname.includes("accountpage.html")) return;

  const usernameContainer = document.querySelector(".username-btn");
  const statsContainer = document.querySelector(".stats-box");
  const params = new URLSearchParams(window.location.search);
  const userid = localStorage.getItem("username");

  if (!userid) {
    usernameContainer.textContent = "No username selected.";
    return;
  }

  async function fetchUser(userid) {
    try {
      console.log('Fetching user data for:', userid);

      let auth = '';
      try {
        const t = localStorage.getItem('token');
        if (t) { auth = t; }
      } catch (e) {}

      const options = { headers: { Authorization: auth } };

      let resp = await fetch(`http://localhost:3000/questions/subject/${userid}`, options);
      console.log('GET /userstats status:', resp.status);

      if (resp.status === 404) {
        const createOpts = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
          },
          body: JSON.stringify({ username: userid })
        };
        const createResp = await fetch('http://localhost:3000/userstats', createOpts);
        console.log('POST /userstats status:', createResp.status);

        resp = await fetch(`http://localhost:3000/userstats/${userid}`, options);
        console.log('ReGET /userstats status:', resp.status);
      }

      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error('API request failed: ' + resp.status + ' ' + txt);
      }

      const user = await resp.json();
      if (!user) {
        usernameContainer.textContent = 'No user found.';
        statsContainer.textContent = 'No stats available.';
        console.error('No user found in API response');
        return;
      }
      let geo = user.geographycorrect; if (geo == null) geo = 0;
      let his = user.historycorrect;   if (his == null) his = 0;
      let spa = user.spanishcorrect;   if (spa == null) spa = 0;
      let mus = user.musiccorrect;     if (mus == null) mus = 0;
      let quizzes = user.totalquizzes; if (quizzes == null) quizzes = 0;

      let totalCorrect = geo + his + spa + mus;
      let totalQuestions = quizzes * 10;

      let overall = 0;
      if (totalQuestions > 0) {
        overall = Math.round((totalCorrect / totalQuestions) * 100);
      }

      usernameContainer.textContent = 'Welcome ' + userid + ', here are your stats:';
      statsContainer.innerHTML =
        '<div class="stats-item">' +
          '<strong>Overall %:</strong> ' + overall + '%<br>' +
          '<strong>Geography questions answered correctly:</strong> ' + geo + '<br>' +
          '<strong>History questions answered correctly:</strong> ' + his + '<br>' +
          '<strong>Spanish questions answered correctly:</strong> ' + spa + '<br>' +
          '<strong>Music questions answered correctly:</strong> ' + mus + '<br>' +
          '<strong>Total quizzes:</strong> ' + quizzes +
        '</div>';

    } catch (err) {
      console.error('Error fetching user:', err);
      usernameContainer.textContent = 'Error loading user.';
      statsContainer.textContent = 'Error loading stats.';
    }
  }


  fetchUser(userid);
});