import { getGithubProfile } from "./api/getGithubProfile";
import { getGithubProfileRepos } from "./api/getGithubProfileRepos";
import { Profile, Repo } from "./entities/vite-env";
import { buttonRepo } from "./helpers/buttonRepo";
import { clearHtml } from "./helpers/clearHtml";
import "./styles.css";

const alertH2 = document.querySelector(".alert_h2") as HTMLHeadingElement;
const alertContainer = document.querySelector(".alert") as HTMLHeadingElement;
const containerCardInit = document.querySelector(
  ".section_container_card_init"
) as HTMLElement;
const containerCardProfile = document.querySelector(
  ".section_container_card"
) as HTMLElement;
const imgProfile = document.getElementById("img-profile") as HTMLImageElement;
const nameProfile = document.getElementById(
  "name-profile"
) as HTMLHeadingElement;
const descriptionProfile = document.getElementById(
  "description-profile"
) as HTMLParagraphElement;
const followersProfile = document.getElementById(
  "followers-profile"
) as HTMLHeadingElement;
const followingProfile = document.getElementById(
  "following-profile"
) as HTMLHeadingElement;
const reposProfile = document.getElementById(
  "repos-profile"
) as HTMLHeadingElement;
const inputSearchProfile = document.querySelector(
  ".section_container_search input"
) as HTMLInputElement;
const buttonSearchProfile = document.querySelector(
  ".section_container_search button"
) as HTMLButtonElement;
const reposContainer = document.querySelector(".card-repos") as HTMLDivElement;
const listReposContainer = document.querySelector(
  ".card-repos-list"
) as HTMLUListElement;

let firstSearch = true;

buttonSearchProfile.addEventListener("click", async () => {
  if (!firstSearch)
    clearHtml(
      imgProfile,
      nameProfile,
      descriptionProfile,
      followersProfile,
      followingProfile,
      reposProfile,
      reposContainer,
      listReposContainer
    );

  const inputSearchProfileValue: string = inputSearchProfile.value;

  const githubProfile = await getGithubProfile(inputSearchProfileValue);

  inputSearchProfile.value = "";

  if (!githubProfile) {
    containerCardInit.style.display = "flex";
    containerCardProfile.style.display = "none";

    console.log("The profile dosen´t exist");
    alertH2.innerHTML = `The profile dosen´t exist 😔`;
    alertContainer.style.opacity = "100";

    setTimeout(() => {
      alertContainer.style.opacity = "0";
    }, 2000);

    return;
  }

  const profile = githubProfile as Profile;

  containerCardInit.style.display = "none";
  containerCardProfile.style.display = "flex";

  imgProfile.src = profile.avatar_url;
  imgProfile.alt = profile.name;
  nameProfile.textContent = profile.name || "N/A";
  descriptionProfile.textContent = profile.bio || "N/A";
  followersProfile.prepend(String(profile.followers) || "0");
  followingProfile.prepend(String(profile.following) || "0");
  reposProfile.prepend(String(profile.public_repos) || "0");

  const githubProfileReposUrl = await getGithubProfileRepos(profile.repos_url);

  if (
    typeof githubProfileReposUrl === "object" &&
    githubProfileReposUrl.length > 0
  ) {
    const repos = githubProfileReposUrl as Repo[];

    reposContainer.style.display = "flex";

    repos.slice(0, 8).forEach((repo) => {
      const li = buttonRepo(repo.html_url, repo.name);

      listReposContainer.append(li);
    });
  }

  alertH2.innerHTML = `The profile exist ✅`;
  alertContainer.style.opacity = "100";

  setTimeout(() => {
    alertContainer.style.opacity = "0";
  }, 2500);

  firstSearch = false;

  return;
});
