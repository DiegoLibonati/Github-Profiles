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

## Description

I made a web page that allows the user to search for github profiles. If you find a profile it will show: its profile image, its user, its description, how many followers it has, how many people it follows and how many repos it has. And it will make a list of buttons with each repo, also if you click on any repo it will take you to the official link of that repository in github. If it doesn't find it, it will launch an alert.

## Technologies used

1. Javascript
2. CSS3
3. HTML5

## Galery

![Github-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/github-0.jpg)

![Github-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/github-1.jpg)
github
![Github-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/github-2.jpg)

## Portfolio Link

`https://diegolibonati.github.io/DiegoLibonatiWeb/#/projects?q=Github%20Profile%20Page`

## Video

https://user-images.githubusercontent.com/99032604/198900756-5b0d19d8-5779-47ed-b0fe-d27ef1a4c37d.mp4

## Documentation

In `containerCard` you get the element in which we are going to dump all the profile information. In `inputSearchProfile` we use it to obtain the value of the input and in `buttonSearchProfile` will be the button to search in the API the value that we enter in the input:

```
const containerCard = document.querySelector(".section_container_card");
const inputSearchProfile = document.querySelector(
  ".section_container_search input"
);
const buttonSearchProfile = document.querySelector(
  ".section_container_search button"
);
```

Once you click on `buttonSearchProfile` the input value will be obtained, the `getGithubProfile()` function will be executed with the entered value to obtain the profile with that name. Then it will check that the data found is not null through the function `checkIfBioIsNull()` and it will be saved in the variable `githubProfileValues`, the repos of the account are obtained if it has them through the function `getGithubProfileRepos()` that will be assigned to the variable `githubProfileReposUrl` and finally a function will be executed that will create the HTML of the information that we collected from the API with the function `createHTMLWithOutRepositories()` and finally another function called `createHTMLRepositories()` that will create the HTML of the repositories:

```
buttonSearchProfile.addEventListener("click", (e) => {
  let inputSearchProfileValue = inputSearchProfile.value;

  let githubProfileJson = getGithubProfile(inputSearchProfileValue);

  githubProfileJson.then((res) => {
    let githubProfileValues = checkIfBioIsNull(
      res.avatar_url,
      res.login,
      res.bio,
      res.followers,
      res.following,
      res.public_repos
    );

    let githubProfileReposUrl = getGithubProfileRepos(res.repos_url);

    githubProfileReposUrl.then((res) => {
      containerCard.innerHTML = createHTMLWithOutRepositories(
        githubProfileValues[0],
        githubProfileValues[1],
        githubProfileValues[2],
        githubProfileValues[3],
        githubProfileValues[4],
        githubProfileValues[5]
      );

      createHTMLRepositories(res);
    });
  });
});
```

This function `getGithubProfile()` is the one in charge of getting the information from the api passing it by parameter the value of the input in which we enter the name of the profile to look for:

```
const getGithubProfile = async (profile) => {
  let apiPetition = await fetch(`https://api.github.com/users/${profile}`);

  if (apiPetition.ok === false) {
    console.log("The profile dosen´t exist");
    document.querySelector(
      ".header_section_h2"
    ).innerHTML = `The profile dosen´t exist 😔`;
    document.querySelector(".header_section_h2").classList.add("show-info");

    setTimeout(() => {
      document
        .querySelector(".header_section_h2")
        .classList.remove("show-info");
    }, 2000);
  } else {
    let apiResult = await apiPetition.json();
    document.querySelector(
      ".header_section_h2"
    ).innerHTML = `The profile exist ✅`;
    document.querySelector(".header_section_h2").classList.add("show-info");

    setTimeout(() => {
      document
        .querySelector(".header_section_h2")
        .classList.remove("show-info");
    }, 2500);

    return apiResult;
  }
};
```

This function `getGithubProfileRepos()` is in charge of fetching all the repositories if it has the account associated with the name entered:

```
const getGithubProfileRepos = async (reposLink) => {
  let apiPetition = await fetch(`${reposLink}`);

  if (apiPetition.ok === false) {
    console.log("The repos profile dosen´t exist");
  } else {
    let apiResult = await apiPetition.json();
    return apiResult;
  }
};
```

This function `createHTMLWithOutRepositories()` is in charge of generating the HTML without the repositories that will later be added in the relevant container:

```
const createHTMLWithOutRepositories = (
  img,
  name,
  description,
  followers,
  following,
  reposCount
) => {
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
const createHTMLRepositories = (repo) => {
  const div = document.createElement("DIV");
  const h3 = document.createElement("H3");
  const ul = document.createElement("UL");
  const containerCardInformation = document.querySelector(
    ".section_container_card-information"
  );

  div.setAttribute("class", "card-repos");
  ul.setAttribute("class", "card-repos-list");

  containerCardInformation.append(div);
  div.append(h3);
  div.append(ul);

  h3.innerHTML = "Repositories";

  for (let i = 0; i < 10; i++) {
    ul.innerHTML += `<li><a href=${repo[i].html_url} target="BLANK">${repo[i].name}</a></li>`;
  }
};
```

This function `checkIfBioIsNull()` is in charge of checking if the description field is null, if it is it will make a default text in description. If it exists it will leave that description as it comes from the API:

```
const checkIfBioIsNull = (
  img,
  name,
  description,
  followers,
  following,
  repos
) => {
  let profileImg;
  let profileLogin;
  let profileDescription;
  let profileFollowers;
  let profileFollowing;
  let profilePublicRepos;

  if (description === null || description === undefined || description === "") {
    profileImg = img;
    profileLogin = name;
    profileDescription = "There is not description in this profile, sorry 😔";
    profileFollowers = followers;
    profileFollowing = following;
    profilePublicRepos = repos;

    return [
      profileImg,
      profileLogin,
      profileDescription,
      profileFollowers,
      profileFollowing,
      profilePublicRepos,
    ];
  } else {
    profileImg = img;
    profileLogin = name;
    profileDescription = description;
    profileFollowers = followers;
    profileFollowing = following;
    profilePublicRepos = repos;

    return [
      profileImg,
      profileLogin,
      profileDescription,
      profileFollowers,
      profileFollowing,
      profilePublicRepos,
    ];
  }
};
```
