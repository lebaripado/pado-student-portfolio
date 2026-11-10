/* =========================================================
   projects.js — the Projects page

   What this file does:
   - Stores my projects in an ARRAY of objects (the "data")
   - showProjects() turns that data into cards on the page
   - The filter buttons show only Live, In progress or Figma projects

   Why build cards with JavaScript?
   To add a new project, I only add one object to the array.
   The layout stays the same for every card automatically.
   ========================================================= */


// ---------- The data ----------
const projects = [
  {
    number: "01",
    name: "GogHR",
    status: "Live",
    role: "Senior Product Designer & Design Team Lead · Polar Frequency",
    years: "2024 – 2026",
    image: "assets/images/goghr-dashboard.webp",
    imagePosition: "left top",
    imageAlt: "GogHR recruiter dashboard from Version 1, with a left sidebar, recruitment numbers and an interview chart",
    summary: "An AI recruitment platform for recruiters and job applicants. I led a team of three designers through a full redesign, from the first version (MVP) to Version 1.",
    facts: [
      "Now serves over 300,000 applicants, with more than 100,000 AI interviews done",
      "Moved navigation from a crowded top bar to a left sidebar, so new features had room to grow",
      "Built a shared design system with the team: 135 variables and 70 text styles",
      "Set up one approved Figma file for developers, so what we designed is what got built"
    ],
    tools: ["Figma", "Figma Sites", "Jira", "Design system"],
    link: "https://goghr.ai",
    linkText: "Visit live site"
  },
  {
    number: "02",
    name: "10K Offers",
    status: "In progress",
    role: "Product Designer & Product Manager",
    years: "2026",
    image: "assets/images/10koffers-home.webp",
    imagePosition: "left top",
    imageAlt: "10K Offers waitlist home page: the headline Turn what you know into a 10,000 naira offer, a sign-up form and a progress card",
    summary: "A web app where Nigerian creators package a skill, guide or template into a \u20a610,000 offer, sell it with one link, and track every sale on the way to \u20a61,000,000. I'm designing the waitlist, website, and the creator, buyer and admin dashboards.",
    facts: [
      "Waitlist MVP is in review: 11 waitlist screens across 3 breakpoints",
      "Built only from the 10K Offers design system, with 206 library tokens linked",
      "Mobile first and animation-heavy, with 4 story scenes that explain the product"
    ],
    tools: ["Figma", "Design system", "Prototyping", "Product management"],
    link: "https://10koffers.com",
    linkText: "Join the waitlist"
  },
  {
    number: "03",
    name: "Christivity Interiors",
    status: "Figma design",
    role: "UI/UX Designer",
    years: "2025",
    image: "assets/images/christivity-screens.webp",
    imagePosition: "center",
    imageAlt: "Christivity Interiors website on desktop and mobile, with the headline Create your Dream Space and a Book a Consultation button",
    summary: "A responsive website for Christivity Interiors, an interior decor business. The design lets the work speak: big room photography, a clear 'We build, we furnish, we transform' story and an easy way to book a consultation.",
    facts: [
      "Hero with 'Create your Dream Space' and two clear actions: view portfolio or book a consultation",
      "'Why choose us' section built around craftsmanship and client-focused design",
      "Designed for desktop and mobile, with a style guide and moodboard behind it"
    ],
    tools: ["Figma", "Web design", "Mobile prototype", "Style guide"],
    link: "https://www.figma.com/design/8yDgyRFk3nL9sYZEcGoKcs/CRISTIVITY-PROJECTS?node-id=617-270&t=dBVEr8CbVAc2W3sd-0",
    linkText: "View Figma design"
  }
];


// ---------- Grab elements from the page ----------
const projectList = document.getElementById("project-list");
const projectCount = document.getElementById("project-count");
const filterButtons = document.querySelectorAll("[data-filter]");


// FUNCTION: build the HTML for ONE project card and return it
function createProjectCard(project) {
  // Turn the "facts" array into <li> items, joined into one string
  let factsHTML = "";
  for (let i = 0; i < project.facts.length; i++) {
    factsHTML += "<li>" + project.facts[i] + "</li>";
  }

  // Turn the "tools" array into tags
  let toolsHTML = "";
  for (let i = 0; i < project.tools.length; i++) {
    toolsHTML += '<span class="tag">' + project.tools[i] + "</span>";
  }

  // Live projects get an orange tag, others get blue
  let statusClass = "tag";
  if (project.status === "Live") {
    statusClass = "tag tag-orange";
  }

  // External links open in a new tab; simulated links (#) do not
  let linkTarget = "";
  if (project.link !== "#") {
    linkTarget = ' target="_blank" rel="noopener"';
  }

  // Create the <article> element and fill it using a template string
  const card = document.createElement("article");
  card.className = "card project-card";
  card.innerHTML = `
    <img src="${project.image}" alt="${project.imageAlt}" loading="lazy" width="800" height="500" style="object-position: ${project.imagePosition}">
    <div class="project-body">
      <div class="project-top">
        <span class="project-number">${project.number} / ${project.years}</span>
        <span class="${statusClass}">${project.status}</span>
      </div>
      <h2>${project.name}</h2>
      <p class="project-role">${project.role}</p>
      <p>${project.summary}</p>
      <ul class="project-facts">${factsHTML}</ul>
      <div class="project-tools">${toolsHTML}</div>
      <a class="btn btn-secondary btn-small" href="${project.link}"${linkTarget}>${project.linkText}</a>
    </div>
  `;
  return card;
}


// FUNCTION: show the projects that match the chosen filter
function showProjects(filter) {
  projectList.innerHTML = ""; // clear the old cards first
  let shown = 0;

  for (let i = 0; i < projects.length; i++) {
    // Show the project if the filter is "all" OR its status matches
    if (filter === "all" || projects[i].status === filter) {
      projectList.appendChild(createProjectCard(projects[i]));
      shown = shown + 1;
    }
  }

  // If nothing matched, show a friendly message
  if (shown === 0) {
    projectList.innerHTML = '<p class="card empty-state">No projects in this group yet.</p>';
  }

  // Screen readers will announce this text
  projectCount.textContent = "Showing " + shown + " project(s)";
}


// EVENT HANDLING: when a filter button is clicked...
for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    // 1. Remove "active" from every button
    for (let j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active");
    }
    // 2. Make the clicked button active
    this.classList.add("active");
    // 3. Show the matching projects (data-filter="Live", etc.)
    showProjects(this.dataset.filter);
  });
}


// Show all projects when the page first loads
showProjects("all");
