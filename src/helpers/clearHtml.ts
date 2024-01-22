export const clearHtml = (
  img: HTMLImageElement,
  name: HTMLHeadingElement,
  description: HTMLParagraphElement,
  followers: HTMLHeadingElement,
  follwing: HTMLHeadingElement,
  repos: HTMLHeadingElement,
  reposContainer: HTMLDivElement,
  reposListContainer: HTMLUListElement
): void => {
  img.src = "";
  img.alt = "";

  name.textContent = "";
  description.textContent = "";

  followers.removeChild(followers.firstChild!);
  follwing.removeChild(follwing.firstChild!);
  repos.removeChild(repos.firstChild!);

  reposContainer.style.display = "none";
  reposListContainer.innerHTML = "";

  return;
};
