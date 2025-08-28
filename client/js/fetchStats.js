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



console.log(localStorage.getItem("username"));


document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.pathname.includes("accountpage.html")) return;

  const usernameContainer = document.querySelector(".username-btn");
  const statsContainer = document.querySelector(".stats-box");
  const historybox = document.querySelector(".history-box");
  const geographybox = document.querySelector(".geography-box");
  const musicbox = document.querySelector(".music-box");
  const spanishbox = document.querySelector(".spanish-box");

  const params = new URLSearchParams(window.location.search);
      const userid = localStorage.getItem("username");

  if (!userid) {
    usernameContainer.textContent = "No username selected.";
    return;
  }

  async function fetchUser(userid) {
    try {
      console.log("Fetching user data for:", userid);
      const options = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const resp = await fetch(
        `http://localhost:3000/userstats/${userid}`,
        options
      );

      console.log("Response status:", resp.status);

      if (!resp.ok) {
        throw new Error("API request failed");
      }

      const data = await resp.json();
      console.log("Raw API response:", data);

      const user = data.data ? data.data : data;

      if (!user) {
        usernameContainer.textContent = "No user found.";
        statsContainer.textContent = "No stats available.";
        console.error(" No user found in API response");
        return;
      }

      usernameContainer.textContent = `Welcome ${userid}, here are your stats:`;
      historybox.innerHTML = `
        <div class="stats-item">
          <br>
          <strong>History questions answered correctly:</strong> ${user.historycorrect}
          <br>
        </div>
      `;
      geographybox.innerHTML = `
        <div class="stats-item">
          <br>
          <strong>Geography questions answered correctly:</strong> ${user.geographycorrect}
          <br>
        </div>
      `;
      musicbox.innerHTML = `
        <div class="stats-item">
          <br>
          <strong>Music questions answered correctly:</strong> ${user.musiccorrect}
          <br>
        </div>
      `;
      spanishbox.innerHTML = `
        <div class="stats-item">
          <br>
          <strong>Spanish questions answered correctly:</strong> ${user.spanishcorrect}
          <br>
        </div>
      `;
    } catch (err) {
      console.error("Error fetching user:", err);
      usernameContainer.textContent = "Error loading user.";
      historybox.textContent = "Error loading stats.";
      geographybox.textContent = "Error loading stats.";
      musicbox.textContent = "Error loading stats.";
      spanishbox.textContent = "Error loading stats.";
    }
  }

  fetchUser(userid);
});
