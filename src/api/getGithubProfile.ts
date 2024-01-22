import { Profile } from "../entities/vite-env";

export const getGithubProfile = async (
  profile: string
): Promise<Profile | boolean> => {
  const request = await fetch(`https://api.github.com/users/${profile}`);

  if (!request.ok) return false;

  const response: Profile = await request.json();

  return response;
};
