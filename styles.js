const style = () => {
  const heading = document.querySelector("h1");
  const label = document.querySelector("label");
  heading.style.opacity = 1;
  label.style.transform = "translateX(0)";
};
window.addEventListener("DOMContentLoaded", style);
