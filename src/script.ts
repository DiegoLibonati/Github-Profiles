import { Profile, Repo } from "./entities/vite-env";

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

const getGithubProfileRepos = async (reposLink: string): Promise<Repo[]> => {
  const request = await fetch(`${reposLink}`);

  if (!request.ok) {
    console.log("The repos profile dosen´t exist");
  }

  const response: Repo[] = await request.json();
  return response;
};

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
