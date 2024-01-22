export const buttonRepo = (href: string, name: string): HTMLLIElement => {
  const li = document.createElement("li");
  const a = document.createElement("a");

  li.setAttribute("class", "text-white bg-[#1D2B53] rounded-lg cursor-pointer");

  li.style.paddingTop = ".2rem";
  li.style.paddingBottom = ".2rem";
  li.style.paddingLeft = ".3rem";
  li.style.paddingRight = ".3rem";

  li.style.marginRight = ".3rem";
  li.style.marginTop = ".3rem";

  li.append(a)

  a.href = href;
  a.target = "BLANK"
  a.textContent = name;

  return li;
};
