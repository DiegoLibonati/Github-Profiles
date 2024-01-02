# Github-Profile-Page

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
2. CSS3
3. HTML5

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/73`](https://www.diegolibonati.com.ar/#/project/73)

## Video

https://user-images.githubusercontent.com/99032604/198900756-5b0d19d8-5779-47ed-b0fe-d27ef1a4c37d.mp4

## Documentation

In `containerCard` you get the element in which we are going to dump all the profile information. In `inputSearchProfile` we use it to obtain the value of the input and in `buttonSearchProfile` will be the button to search in the API the value that we enter in the input:

```
const containerCard = document.querySelector(
  ".section_container_card"
) as HTMLElement;
const headerSectionH2 = document.querySelector(
  ".header_section_h2"
) as HTMLHeadingElement;
const inputSearchProfile = document.querySelector(
  ".section_container_search input"
) as HTMLInputElement;
const buttonSearchProfile = document.querySelector(
  ".section_container_search button"
) as HTMLButtonElement;
```

When you click on buttonSearchProfile what it will do is to get the value of the input to search for the github profile. Based on the response it will filter the corresponding html.

```
buttonSearchProfile.addEventListener("click", async () => {
  const inputSearchProfileValue: string = inputSearchProfile.value;

  const githubProfile = await getGithubProfile(inputSearchProfileValue);

  containerCard.innerHTML = createHTMLWithOutRepositories(
    githubProfile.avatar_url || "",
    githubProfile.name || "N/A",
    githubProfile.bio || "N/A",
    githubProfile.followers || 0,
    githubProfile.following || 0,
    githubProfile.public_repos || 0
  );

  if (githubProfile.repos_url) {
    const githubProfileReposUrl = await getGithubProfileRepos(
      githubProfile.repos_url
    );

    if (githubProfileReposUrl.length > 0)
      createHTMLRepositories(githubProfileReposUrl);
  }
});
```

This function `getGithubProfile()` is the one in charge of getting the information from the api passing it by parameter the value of the input in which we enter the name of the profile to look for:

```
const getGithubProfile = async (profile: string): Promise<Profile> => {
  const request = await fetch(`https://api.github.com/users/${profile}`);

  if (!request.ok) {
    console.log("The profile dosen´t exist");
    headerSectionH2.innerHTML = `The profile dosen´t exist 😔`;
    headerSectionH2.classList.add("show-info");

    setTimeout(() => {
      headerSectionH2.classList.remove("show-info");
    }, 2000);
  }

  headerSectionH2.innerHTML = `The profile exist ✅`;
  headerSectionH2.classList.add("show-info");

  setTimeout(() => {
    headerSectionH2.classList.remove("show-info");
  }, 2500);

  const response: Profile = await request.json();

  return response;
};
```

This function `getGithubProfileRepos()` is in charge of fetching all the repositories if it has the account associated with the name entered:

```
const getGithubProfileRepos = async (reposLink: string): Promise<Repo[]> => {
  const request = await fetch(`${reposLink}`);

  if (!request.ok) {
    console.log("The repos profile dosen´t exist");
  }

  const response: Repo[] = await request.json();
  return response;
};
```

This function `createHTMLWithOutRepositories()` is in charge of generating the HTML without the repositories that will later be added in the relevant container:

```
const createHTMLWithOutRepositories = (
  img: string,
  name: string,
  description: string,
  followers: number,
  following: number,
  reposCount: number
): string => {
  return `

        <div class="section_container_card-img">
            <img src="${img}" alt="${name}">
        </div>

        <div class="section_container_card-information">

            <h2>${name}</h2>

            <p>${description}</p>

            <div class="card-followers">

                <h3><span>${followers}</span>Followers</h3>
                <h3><span>${following}</span>Following</h3>
                <h3><span>${reposCount}</span>Repos</h3>

            </div>

        </div>

    `;
};
```

This function `createHTMLRepositories()` is in charge of generating the HTML of the repositories, basically it will generate 10 repositories, that is to say, 10 li elements that will be integrated to an ordered list:

```
const createHTMLRepositories = (repo: Repo[]): void => {
  const div = document.createElement("DIV");
  const h3 = document.createElement("H3");
  const ul = document.createElement("UL");

  div.setAttribute("class", "card-repos");
  ul.setAttribute("class", "card-repos-list");

  const containerCardInformation = document.querySelector(
    ".section_container_card-information"
  ) as HTMLElement;

  containerCardInformation.append(div);
  div.append(h3);
  div.append(ul);

  h3.innerHTML = "Repositories";

  for (let i = 0; i < 10; i++) {
    ul.innerHTML += `<li><a href=${repo[i].html_url} target="BLANK">${repo[i].name}</a></li>`;
  }
};
```