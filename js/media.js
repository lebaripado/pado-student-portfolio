/* =========================================================
   media.js — the video section on the Home page

   What this file does:
   - Keeps a list (array) of my four video clips
   - Builds one button per clip
   - Clicking a button loads that clip into the player
   - The first clip autoplays MUTED (browsers only allow silent
     autoplay), and a "Sound on" button lets visitors unmute it
   - Any link with data-clip="2" (e.g. in the wireframe section)
     jumps to that clip
   ========================================================= */


// An ARRAY of OBJECTS. Each object describes one clip.
const clips = [
  {
    title: "Introduction: who I am",
    description: "A quick hello from me, and why I'm studying Software Engineering.",
    file: "assets/media/intro.mp4",
    poster: "assets/images/poster-intro.webp"
  },
  {
    title: "What I do",
    description: "At the whiteboard: what I do as a Product Designer and Product Manager.",
    file: "assets/media/what-i-do.mp4",
    poster: "assets/images/poster-what-i-do.webp"
  },
  {
    title: "My design process: the wireframe",
    description: "How I sketched this website on paper before writing any code.",
    file: "assets/media/design-process.mp4",
    poster: "assets/images/poster-design-process.webp"
  },
  {
    title: "Teaching: graphic design with AI",
    description: "A clip from a class I taught on using AI for graphic design. Teaching design, product management and AI automation is part of what I love doing.",
    file: "assets/media/teaching-ai-design.mp4",
    poster: "assets/images/poster-teaching-ai-design.webp"
  }
];

// Grab the elements we need from the page
const player = document.getElementById("story-player");
const clipTitle = document.getElementById("clip-title");
const clipDesc = document.getElementById("clip-desc");
const clipList = document.getElementById("clip-list");
const soundButton = document.getElementById("sound-btn");


// FUNCTION: load one clip into the player.
// "index" is the clip's position in the array (0 = first clip).
function loadClip(index) {
  const clip = clips[index];

  // Change the video file, its cover image and the text under the player
  player.src = clip.file;
  player.poster = clip.poster;
  clipTitle.textContent = clip.title;
  clipDesc.textContent = clip.description;

  // Update which button looks "active"
  const buttons = clipList.querySelectorAll("button");
  for (let i = 0; i < buttons.length; i++) {
    if (i === index) {
      buttons[i].classList.add("active");
      buttons[i].setAttribute("aria-pressed", "true");
    } else {
      buttons[i].classList.remove("active");
      buttons[i].setAttribute("aria-pressed", "false");
    }
  }
}


// FUNCTION: play a clip WITH sound (used when a visitor chooses a clip)
function playWithSound(index) {
  loadClip(index);
  player.muted = false;
  player.loop = false;
  updateSoundButton();
  player.play();
}


// FUNCTION: keep the sound button's text in step with the player
function updateSoundButton() {
  if (player.muted) {
    soundButton.textContent = "Sound on";
    soundButton.setAttribute("aria-pressed", "false");
  } else {
    soundButton.textContent = "Sound off";
    soundButton.setAttribute("aria-pressed", "true");
  }
}


// FUNCTION: create one button for every clip in the array
function buildClipButtons() {
  for (let i = 0; i < clips.length; i++) {
    const button = document.createElement("button"); // make a new <button>
    button.type = "button";
    button.textContent = (i + 1) + ". " + clips[i].title;

    // When this button is clicked, play clip number i with sound
    button.addEventListener("click", function () {
      playWithSound(i);
    });

    clipList.appendChild(button); // put the button on the page
  }
}


// Only run if the video player exists on this page
if (player) {
  buildClipButtons();
  loadClip(0);              // start with the introduction clip
  player.muted = true;      // must be muted for autoplay to work
  player.loop = true;
  player.play().catch(function () {
    // Some browsers (or data-saver mode) block autoplay. That's fine:
    // the visitor can still press play.
  });
  updateSoundButton();

  // Sound on / off button
  soundButton.addEventListener("click", function () {
    player.muted = !player.muted; // flip true <-> false
    if (!player.muted) {
      player.play();
    }
    updateSoundButton();
  });

  // Links elsewhere on the page that open a specific clip
  const clipLinks = document.querySelectorAll("[data-clip]");
  clipLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      playWithSound(Number(link.dataset.clip));
    });
  });
}
