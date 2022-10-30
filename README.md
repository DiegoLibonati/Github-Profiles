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

## Feel free to edit my code

I use api github to find the profile name.

```
let apiPetition =  await fetch(`https://api.github.com/users/${profile}`);
```

Here i create the html in javascript and called with a function:

```
const createHTMLWithOutRepositories = (img, name, description, followers, following, reposCount) => {

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

}
```

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

`https://diegolibonati.github.io/DiegoLibonatiWeb/#/projects?q=Github%20profile%20page`

## Video
