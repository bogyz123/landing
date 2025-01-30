const scaleNav = (action) => {
  const nav = document.getElementsByClassName("project-list")[0];
  switch (action) {
    case "scale": {
      nav.style.scale = "1.2";
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
        const element = document.getElementById(projects[i]);
        if (element) {
          element.style.scale = "1.1";
          element.style.color = "crimson";
        }
      }
      break;
    }
    case "unpop": {
      for (let i = 0; i < projects.length; i++) {
        const element = document.getElementById(projects[i]);
        if (element) {
          element.style.scale = "1";
          element.style.padding = "0";
          element.style.color = "white";
        }
      }
      break;
    }
    default: {
      break;
    }
  }
};

var urlToOpen = null;
var openedNode;

const unpop = (project) => {
  document.getElementById(project).style.scale = "1";
  document.getElementById(project).style.margin = "0";
};

const openUrl = async (url, caller) => {
  urlToOpen = url;
  const item = caller?.closest(".project-list-item").querySelector(".project-list-item-actions");
  const allActions = document.querySelectorAll(".project-list-item-actions");
  allActions.forEach((el) => {
    if (el !== item) {
      el.style.display = "none";
    }
  });
  if (item.style.display === "flex") {
    item.style.display = "none";
  } else {
    item.style.display = "flex";
  }
};
const shuffleText = (element) => {
  let iteration = 0;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let interval = null;
  interval = setInterval(() => {
    element.innerText = element.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return element.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= element.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 50);
}
document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll("[data-value]");
  skills.forEach((skill) => {
    shuffleText(skill);
  })
});

const setOpeningWarning = (website) => {
  const warningElement = document.getElementById("link-warning");
  const linkUrlElement = document.getElementById("link-url");
  linkUrlElement.textContent = "this will open " + website;
  warningElement.style.display = "flex";
  warningElement.classList.add("show");
};

const handleLink = (status) => {
  if (status === "failure") {
    const warning = document.getElementById("link-warning");
    warning.classList.add("hide");
    warning.addEventListener(
      "animationend",
      () => {
        warning.style.display = "none";
        warning.classList.remove("hide");
      },
      { once: true }
    );
  } else {
    document.getElementById("link-warning").style.display = "none";
    window.open(urlToOpen, "_blank");
  }
};

const previewGit = () => {
  const gitPreviewCard = document.getElementById("git-previewer");
  gitPreviewCard.style.display = "flex";
};

const handleMenu = () => {
  const menu = document.getElementById("menu");
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
};

const toggleDarkMode = () => {
  let isDarkMode = document.body.classList.contains("darkmode");
  if (isDarkMode) {
    document.body.classList.add("lightmode");
    document.body.classList.remove("darkmode");
    document.getElementById("moon").style.opacity = "1";
    document.getElementById("sun").style.opacity = "0";
  } else {
    document.body.classList.add("darkmode");
    document.body.classList.remove("lightmode");
    document.getElementById("sun").style.opacity = "1";
    document.getElementById("moon").style.opacity = "0";
  }
};

const previewerExpandContent = (event) => {
  const content = event.currentTarget.getElementsByClassName("previewer-project-expander")[0];
  if (content.style.display === "flex") {
    content.style.display = "none";
  } else {
    content.style.display = "flex";
  }
};

const previewWebsite = async (website) => {
  let data = null;
  if (website) {
    try {
      const response = await fetch("./websiteDescriptions.json");
      if (response.ok) {
        data = await response.json();
      }
    } catch (error) {
      console.error("Error fetching website data:", error);
    }
  }
  const previewContainer = document.getElementById("project-preview-container");
  const technologyContainer = document.getElementById("project-preview-technologies");
  const previewIFrame = document.getElementsByTagName("iframe")[0];
  const sademoji = document.getElementById("project-preview-sademoji");
  if (!data[website].hasWebsite) {
    previewIFrame.style.display = "none";
    sademoji.style.display = "block";
    previewContainer.querySelector("code").innerText = "This project has no website.";
  } else {
    previewIFrame.style.display = "block";
    sademoji.style.display = "none";
  }
  previewIFrame.setAttribute("src", data[website].url);
  previewContainer.querySelector("h1").textContent = data[website].title;
  previewContainer.querySelector("#project-preview-description").textContent = data[website].description;

  const technologiesUsed = [...data[website].technologies];
  technologiesUsed.map((technology, i) => {
    let techLi = document.createElement("li");
    techLi.innerHTML = technology;
    technologyContainer.appendChild(techLi);
  });
  previewContainer.style.display = "flex";
};

const closePreview = () => {
  let container = document.getElementById("project-preview-container");
  container.style.display = "none";
  container.querySelector("h1").textContent = null;
  container.querySelector("#project-preview-description").textContent = null;
  container.querySelector("ul").innerHTML = null;
  container.querySelector("code").innerHTML = null;
};

const closePreviewer = () => {
  const previewContainer = document.getElementById("git-previewer");
  previewContainer.style.display = "none";
};