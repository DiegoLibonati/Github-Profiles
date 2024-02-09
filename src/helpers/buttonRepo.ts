export const buttonRepo = (href: string, name: string): HTMLLIElement => {
  const li = document.createElement("li");
  const a = document.createElement("a");

  li.setAttribute(
    "class",
    "text-white bg-[#1D2B53] rounded-lg cursor-pointer py-[.2rem] px-[.3rem] mr-[.3rem] mt-[.3rem]"
  );

  li.append(a);

  a.href = href;
  a.target = "BLANK";
  a.textContent = name;

  return li;
};
