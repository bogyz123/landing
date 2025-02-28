const scaleNav = (action) => {
  // Scales the navbar on hover
  const nav = document.getElementsByClassName("project-list")[0];
  if (!nav) return;
  switch (action) {
    case "scale": {
      nav.style.scale = "1.05";
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
          element.classList.add("project-hovered");
        }
      });
      break;
    }
    case "unpop": {
      projects.forEach((project) => {
        const element = document.getElementById(project);
        if (element) {
          element.classList.remove("project-hovered");
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

const openUrl =  (url, caller) => {
  urlToOpen = url;
  const item = caller?.closest(".project-list-item").querySelector(".project-list-item-actions");
  const allActions = document.querySelectorAll(".project-list-item-actions");
  console.log(item);
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
  }, 90); // 30 seems ok
};



const setOpeningWarning = (website) => {
  urlToOpen = website;
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

const handleMenu = () => {
  const menu = document.getElementById("menu");
  menu.classList.toggle('visible'); 
}


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
      speed: { min: 1, max: 2 }
    },
    opacity: {
      value: { min: 0.3, max: 0.7 }
    },
    size: {
      value: { min: 1, max: 3 }
    }
  }
};

const projects = [
  {
    id: "AL",
    name: "Animlib",
    url: "https://www.github.com/bogyz123/animlib",
    preview: "animlib",
    delay: "0",
    tech: null
  },
  {
    id: "SS",
    name: "Sharepictures",
    url: "https://www.github.com/bogyz123/sharepictures",
    preview: "sharepictures",
    delay: "200ms",
    tech: null
  },
  {
    id: "CX",
    name: "Codebox",
    url: "https://www.github.com/bogyz123/codebox",
    preview: "codebox",
    delay: "400ms",
    tech: null
  },
  {
    id: "SNKRS",
    name: "SNKRS",
    url: "https://www.github.com/bogyz123/SNKRS",
    preview: "snkrs",
    delay: "600ms",
    tech: null
  },
  {
    id: "LY",
    name: "Linkify",
    url: "https://www.github.com/bogyz123/urlshort",
    preview: "linkify",
    delay: "800ms",
    tech: null
  },
  {
    id: "PC",
    name: "ProxyChecker API",
    url: "https://www.github.com/bogyz123/proxyworks",
    preview: "proxychecker",
    delay: "1s",
    tech: null
  },
  {
    id: "KR",
    name: "KinoRS",
    url: "https://www.github.com/bogyz123/kinors",
    preview: "kinors",
    delay: "1.2s",
    tech: null
  },
  {
    id: "IL",
    name: "Instalock (C#)",
    url: "https://www.github.com/bogyz123/instalock",
    preview: "instalock",
    delay: "1.4s",
    tech: "C#"
  },
  {
    id: "MG",
    name: "MemGO (GOLANG)",
    url: "https://www.github.com/bogyz123/memgo",
    preview: "memgo",
    delay: "1.6s",
    tech: "GOLANG"
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll("[data-value]");
  skills.forEach((skill) => {
    shuffleText(skill);
  });
  tsParticles.load("tsparticles", options).catch(() => {});
  const projectList = document.querySelector(".project-list"); 

if (projectList) {
  projects.forEach((p) => {
    const container = document.createElement("div");
    container.classList.add("project-list-item");
    container.style.animationDelay = p.delay;
    container.setAttribute("data-text", p.name);


    const li = document.createElement("li");
    li.id = p.id;
    li.textContent = p.name;
    li.onclick = () => openUrl(p.url, li);

    container.appendChild(li);

    const actions = document.createElement("div");
    actions.classList.add("project-list-item-actions");

    const openWebsiteButton = document.createElement("button");
    openWebsiteButton.onclick = () => setOpeningWarning(p.url);
    openWebsiteButton.textContent = "Open website";

    const previewWebsiteButton = document.createElement("button");
    previewWebsiteButton.onclick = () => previewWebsite(p.preview);
    previewWebsiteButton.textContent = "Preview website";

    actions.appendChild(openWebsiteButton);
    actions.appendChild(previewWebsiteButton);
    container.appendChild(actions);
    projectList.appendChild(container); 
  });
}
});
/** <div class="project-list-item" style="animation-delay: 1600ms;">
        <li id="AL" onclick="openUrl('https://www.github.com/bogyz123/animlib', this)">Animlib</li>
        <div class="project-list-item-actions">
          <button onclick="setOpeningWarning('https://www.github.com/bogyz123/animlib')">Open website</button>
          <button onclick="previewWebsite('animlib')" data-project="animlib">Preview website</button>
        </div>
      </div> 
      */