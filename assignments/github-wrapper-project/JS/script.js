const usernameInput = document.querySelector("#github-profile input");
const showDetailsBtn = document.querySelector(".btn");
const profileInfoDiv = document.querySelector(".profile-info");
const profileReposDiv = document.querySelector(".profile-repos");

showDetailsBtn.addEventListener("click", async () => {
    profileInfoDiv.classList.add("hide");
    profileReposDiv.classList.add("hide");

    profileInfoDiv.innerHTML = "";
    profileReposDiv.innerHTML = "";

    const username = usernameInput.value;
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();

    if (res.status == 404) {
        profileInfoDiv.classList.remove("hide");
        profileInfoDiv.innerHTML = `<h2 style="text-align:center; margin-top: 42%">Please Enter a Valid Username</h2>`;
        usernameInput.value = "";
        return;
    }

    profileInfoDiv.classList.remove("hide");
    profileReposDiv.classList.remove("hide");

    showProfileInfo(data);
    showProfileRepos(username);
    usernameInput.value = "";
})


function showProfileInfo(data) {
    profileInfoDiv.innerHTML = `<div class="info-card">
    <img src="${data.avatar_url}" alt=${data.name}>
    <h1>${data.name}</h1>
    <h3>@${data.login}</h3>
    <p>${data.bio}</p>
    <p>${data.followers} Followers, ${data.following} Following</p>
    <button>
        <a href="${data.html_url}">Go to Profile</a>
    </button>
</div>`
}


async function showProfileRepos(username) {
    const res = await fetch(`https://api.github.com/users/${username}/repos`)
    const projects = await res.json();

    for (let i = 0; i < projects.length; i++) {
        profileReposDiv.innerHTML += `<div class="repos-card">
        <img src="Assets/book.jpg" alt="Project">
        <h2>${projects[i].name}</h2>
        <div>
        <h4>${projects[i].language}</h4>
        </p>${projects[i].size} KB</p>
        </div>
        <button>
            <a href="${projects[i].html_url}">Checkout the Project</a>
        </button>
    </div>`
    }
}