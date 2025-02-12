const scaleNav = (action) => {
  // Scales the navbar on hover
  const nav = document.getElementsByClassName("project-list")[0];
  if (!nav) return;
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
  // pops the project onhover
  switch (popType) {
    case "pop": {
      projects.forEach((project) => {
        const element = document.getElementById(project);
        if (element) {
          element.style.scale = "1.1";
          element.style.color = "crimson";
        }
      });
      break;
    }
    case "unpop": {
      projects.forEach((project) => {
        const element = document.getElementById(project);
        if (element) {
          element.style.scale = "1";
          element.style.padding = "0";
          element.style.color = "white";
        }
      });
      break;
    }
  }
};

var urlToOpen = null;
var openedNode;

const unpop = (project) => {

  const element = document.getElementById(project);
  if (element) {
    element.style.scale = "1";
    element.style.margin = "0";
  }
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
  // text shuffling effect
  let iteration = 0;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let interval = null;
  interval = setInterval(() => {
    element.innerText = element.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return element.dataset.value[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");
    
    if (iteration >= element.dataset.value.length) { 
      clearInterval(interval);
    }
    
    iteration += 1;
  }, 30); // 30 seems ok
};

document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll("[data-value]");
  skills.forEach((skill) => {
    shuffleText(skill);
  });
  tsParticles.load("tsparticles", options).catch(() => {});
});

const setOpeningWarning = (website) => {
  const warningElement = document.getElementById("link-warning");
  const linkUrlElement = document.getElementById("link-url");
  if (warningElement && linkUrlElement) {
    linkUrlElement.textContent = `this will open ${website}`;
    warningElement.style.display = "flex";
    warningElement.classList.add("show");
  }
};

const handleLink = (status) => {
  const warning = document.getElementById("link-warning");
  if (!warning) return;

  if (status === "failure") {
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
    warning.style.display = "none";
    window.open(urlToOpen, "_blank");
  }
};

const previewGit = () => {
  const previewContainer = document.getElementById("git-previewer");
  if (previewContainer) {
    previewContainer.style.animation = "previewAppear 2s forwards"; 
    previewContainer.style.display = "flex"; 
  }
};

const closePreviewer = () => {
  const previewContainer = document.getElementById("git-previewer");
  if (previewContainer) {
    previewContainer.style.animation = "previewDisappear 2s forwards";
    previewContainer.addEventListener("animationend", () => {
      previewContainer.style.display = "none";
    }, { once: true });
  }
};

const toggleDarkMode = () => {
  const body = document.body;
  const isDarkMode = body.classList.contains("darkmode");
  const moon = document.getElementById("moon");
  const sun = document.getElementById("sun");
  
  body.classList.toggle("darkmode", !isDarkMode);
  body.classList.toggle("lightmode", isDarkMode);
  
  if (moon && sun) {
    moon.style.opacity = isDarkMode ? "1" : "0";
    sun.style.opacity = isDarkMode ? "0" : "1";
  }
};

const previewerExpandContent = (event) => {
  const content = event.currentTarget.querySelector(".previewer-project-expander");
  if (content) {
    content.style.display = content.style.display === "flex" ? "none" : "flex";
  }
};

const previewWebsite = async (website) => {
  let data = null;
  const previewContainer = document.getElementById("project-preview-container");
  const technologyContainer = document.getElementById("project-preview-technologies");
  const previewIFrame = document.querySelector("iframe");
  const sademoji = document.getElementById("project-preview-sademoji");

  if (!previewContainer || !technologyContainer || !previewIFrame || !sademoji) return;

  try {
    const response = await fetch("./websiteDescriptions.json");
    data = response.ok ? await response.json() : null;
  } catch (error) {
    console.error("Error fetching website data:", error);
  }

  if (!data || !data[website]) return;

  technologyContainer.innerHTML = "";
  
  if (!data[website].hasWebsite) {
    previewIFrame.style.display = "none";
    sademoji.style.display = "block";
    previewContainer.querySelector("code").textContent = "This project has no website.";
  } else {
    previewIFrame.style.display = "block";
    sademoji.style.display = "none";
  }

  previewIFrame.src = data[website].url;
  previewContainer.querySelector("h1").textContent = data[website].title;
  previewContainer.querySelector("#project-preview-description").textContent = data[website].description;

  data[website].technologies.forEach((technology) => {
    const techLi = document.createElement("li");
    techLi.textContent = technology;
    technologyContainer.appendChild(techLi);
  });
  
  previewContainer.style.display = "flex";
};

const closePreview = () => {
  const container = document.getElementById("project-preview-container");
  if (container) {
    container.style.display = "none";
    container.querySelector("h1").textContent = "";
    container.querySelector("#project-preview-description").textContent = "";
    container.querySelector("ul").innerHTML = "";
    container.querySelector("code").textContent = "";
  }
};

const options = {
  background: {
    color: "inherit"
  },
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push"
      },
      onHover: {
        enable: true,
        mode: "repulse"
      }
    },
    modes: {
      push: {
        quantity: 6
      },
      repulse: {
        distance: 100
      }
    }
  },
  particles: {
    links: {
      enable: true,
      opacity: 0.3,
      distance: 200
    },
    move: {
      enable: true,
      speed: { min: 1, max: 3 }
    },
    opacity: {
      value: { min: 0.3, max: 0.7 }
    },
    size: {
      value: { min: 1, max: 3 }
    }
  }
};