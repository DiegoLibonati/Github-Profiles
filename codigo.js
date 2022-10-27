const containerCard = document.querySelector(".section_container_card");
const inputSearchProfile = document.querySelector(".section_container_search input");
const buttonSearchProfile = document.querySelector(".section_container_search button");

buttonSearchProfile.addEventListener("click", (e)=>{

    let inputSearchProfileValue = inputSearchProfile.value;

    let githubProfileJson = getGithubProfile(inputSearchProfileValue);

    githubProfileJson.then(res => {
        
        let githubProfileValues = checkIfBioIsNull(res.avatar_url, res.login, res.bio, res.followers, res.following, res.public_repos);

        let githubProfileReposUrl = getGithubProfileRepos(res.repos_url);

        githubProfileReposUrl.then(res =>{
            
            containerCard.innerHTML = createHTMLWithOutRepositories(githubProfileValues[0], githubProfileValues[1], githubProfileValues[2], githubProfileValues[3], githubProfileValues[4], githubProfileValues[5]);

            createHTMLRepositories(res);
            
            console.log(res);
        })
    })

});

const getGithubProfile = async (profile) =>{

    let apiPetition =  await fetch(`https://api.github.com/users/${profile}`);

    if (apiPetition.ok === false){
        console.log ("The profile dosen´t exist");
        document.querySelector(".header_section_h2").innerHTML = `The profile dosen´t exist 😔`;
        document.querySelector(".header_section_h2").classList.add("show-info");

        setTimeout(()=>{

            document.querySelector(".header_section_h2").classList.remove("show-info");

        },2000);


    } else {

        let apiResult = await apiPetition.json();
        document.querySelector(".header_section_h2").innerHTML = `The profile exist ✅`;
        document.querySelector(".header_section_h2").classList.add("show-info");

        setTimeout(()=>{

            document.querySelector(".header_section_h2").classList.remove("show-info");

        },2000);

        return apiResult;
        

    }

}

const getGithubProfileRepos = async (reposLink) => {

    let apiPetition = await fetch(`${reposLink}`);

    if (apiPetition.ok === false){
        console.log ("The repos profile dosen´t exist");

    } else {

        let apiResult = await apiPetition.json();
        return apiResult;

    }

}

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

const createHTMLRepositories = (repo) =>{

    const div = document.createElement("DIV");
    const h3 = document.createElement("H3");
    const ul = document.createElement("UL");
    const containerCardInformation = document.querySelector(".section_container_card-information");

    div.setAttribute("class", "card-repos");
    ul.setAttribute("class", "card-repos-list");

    containerCardInformation.append(div);
    div.append(h3);
    div.append(ul);
    
    h3.innerHTML = "Repositories";

    if (ul.children.length === 10){
    } else {
        for (let i = 0; i < repo.length; i++){
            ul.innerHTML += `<li><a href=${repo[i].html_url} target="BLANK">${repo[i].name}</a></li>`;
        }
    }

}

const checkIfBioIsNull = (img, name, description, followers, following, repos) => {

    let profileImg;
    let profileLogin; 
    let profileDescription; 
    let profileFollowers; 
    let profileFollowing;
    let profilePublicRepos;

    if (description === null || description === undefined || description === ""){

        profileImg = img;
        profileLogin = name;
        profileDescription = "There is not description in this profile, sorry 😔";
        profileFollowers = followers;
        profileFollowing = following;
        profilePublicRepos = repos;

        return [profileImg, profileLogin, profileDescription, profileFollowers, profileFollowing, profilePublicRepos];
    } else {

        profileImg = img;
        profileLogin = name;
        profileDescription = description;
        profileFollowers = followers;
        profileFollowing = following;
        profilePublicRepos = repos;

        return [profileImg, profileLogin, profileDescription, profileFollowers, profileFollowing, profilePublicRepos];
    }

}