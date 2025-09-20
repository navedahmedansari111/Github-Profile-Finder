const form = document.querySelector(".input-form");

async function getUsers(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();
    console.log(data);

   
    const oldCard = document.querySelector(".github-card");
    if (oldCard) oldCard.remove();

    const card = document.createElement("div");
    card.className = "github-card";

    const img = document.createElement("img");
    img.src = data.avatar_url;
    img.className = "avatar";
    img.alt = "GitHub Avatar";
    card.append(img);

    const name = document.createElement("h1");
    name.className = "username";
    name.textContent = data.login;
    card.append(name);

    const stats = document.createElement("div");
    stats.className = "stats";

    const statFollowers = document.createElement("div");
    statFollowers.className = "stat";

    const countFollowers = document.createElement("span");
    countFollowers.className = "count";
    countFollowers.textContent = data.followers;

    const labelFollowers = document.createElement("span");
    labelFollowers.className = "label";
    labelFollowers.textContent = "Followers";

    statFollowers.append(countFollowers, labelFollowers);

    const statRepos = document.createElement("div");
    statRepos.className = "stat";

    const countRepos = document.createElement("span");
    countRepos.className = "count";
    countRepos.textContent = data.public_repos;

    const labelRepos = document.createElement("span");
    labelRepos.className = "label";
    labelRepos.textContent = "Repos";

    statRepos.append(countRepos, labelRepos);

    stats.append(statFollowers, statRepos);
    card.append(stats);

    const viewProfile = document.createElement("a");
    viewProfile.className = "profile-link";
    viewProfile.href = data.html_url;
    viewProfile.rel = "gitcat";
    viewProfile.target = "_blank";
    viewProfile.textContent = "View Profile";
    card.append(viewProfile);

    document.body.appendChild(card);
  } catch (error) { 
    console.error(error.message);
    alert("User not found. Try again!");
  }
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.querySelector("input").value.trim();
  if (username) {
    getUsers(username);
  }
});

// -----Naved ahmed ansari------