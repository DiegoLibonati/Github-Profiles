import { Repo } from "../entities/vite-env";

export const getGithubProfileRepos = async (
  reposLink: string
): Promise<Repo[] | boolean> => {
  const request = await fetch(`${reposLink}`);

  if (!request.ok) return false;

  const response: Repo[] = await request.json();
  return response;
};
