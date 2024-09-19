# Github Profiles

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

---

1. Clone the repository
2. Join to the correct path of the clone
3. Execute: `yarn install`
4. Execute: `yarn dev`

## Description

I made a web page that allows the user to search for github profiles. If you find a profile it will show: its profile image, its user, its description, how many followers it has, how many people it follows and how many repos it has. And it will make a list of buttons with each repo, also if you click on any repo it will take you to the official link of that repository in github. If it doesn't find it, it will launch an alert.

## Technologies used

1. Typescript
2. TailwindCSS
3. HTML5

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/Github-Profiles`](https://www.diegolibonati.com.ar/#/project/Github-Profiles)

## Video

https://github.com/DiegoLibonati/Github-Profile-Page/assets/99032604/7f2dc86a-c82a-4159-bce7-d651991426df

## Documentation

In container card you get the element in which we are going to dump all the profile information. In `inputSearchProfile` we use it to obtain the value of the input and in `buttonSearchProfile` will be the button to search in the API the value that we enter in the input:

```
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
```

When you click on buttonSearchProfile what it will do is to get the value of the input to search for the github profile. Based on the response it will filter the corresponding html.

```
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
```
