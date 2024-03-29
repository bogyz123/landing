const scaleNav = (action) => {
  const nav = document.getElementsByClassName("project-list")[0];
  switch (action) {
    case "scale": {
      nav.style.scale = "1.5";
      break;
    }
    case "descale": {
      nav.style.scale = "1";
      break;
    }
  }
};
const popProject = (popType, projects) => {
  switch (popType) {
    case "pop": {
      for (let i = 0; i < projects.length; i++) {
        document.getElementById(projects[i]).style.scale = "1.6";
        document.getElementById(projects[i]).style.padding = "0 30px";
        document.getElementById(projects[i]).style.color = "orange";
      }
      break;
    }
    case "unpop": {
      for (let i = 0; i < projects.length; i++) {
        document.getElementById(projects[i]).style.scale = "1";
        document.getElementById(projects[i]).style.padding = "0";
        document.getElementById(projects[i]).style.color = "white";
      }
      break;
    }
    default: {
      break;
    }
  }
};
var urlToOpen = null;
const unpop = (project) => {
  document.getElementById(project).style.scale = "1";
  document.getElementById(project).style.margin = "0";
};
const openUrl = (url) => {
  document.getElementById("link-warning").style.display = "flex";
  document.getElementById("link-url").textContent = "this will open " + url;
  urlToOpen = url;
};
const handleLink = (status) => {
  if (status === "failure") {
    document.getElementById("link-warning").style.display = "none";
    return;
  } else {
    document.getElementById("link-warning").style.display = "none";
    window.open(urlToOpen, "_blank");
  }
};
const handleMenu = () => {
  const menu = document.getElementById("menu");
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
};
