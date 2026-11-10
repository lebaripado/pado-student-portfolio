/* =========================================================
   contact.js — validation for the Contact form

   Rules (from the COS 106 brief):
   1. No field can be empty
   2. The email must be in a valid format (name@site.com)
   3. The phone number must contain digits only

   How it works:
   - When you press "Send message", validateForm() checks every field.
   - Each field that fails shows a red message under it.
   - If everything passes, a thank-you message appears.
   - Fields are also re-checked when you leave them (the "blur" event),
     so mistakes are shown early.
   ========================================================= */


// ---------- 1. Grab the elements ----------
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const successBox = document.getElementById("form-success");


// ---------- 2. Patterns (regular expressions) ----------

// Email: some text, then @, then some text, then a dot, then some text
// e.g. "ada@miva.edu.ng" passes, "ada@miva" fails
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone: ONLY the digits 0–9, from start (^) to end ($), at least one
const digitsPattern = /^[0-9]+$/;


// ---------- 3. Helper functions to show / clear errors ----------

function showError(input, message) {
  const field = input.parentElement;               // the <div class="field">
  const errorText = document.getElementById(input.id + "-error");
  errorText.textContent = message;
  field.classList.add("invalid");
  field.classList.remove("valid");
  input.setAttribute("aria-invalid", "true");
}

function showValid(input) {
  const field = input.parentElement;
  const errorText = document.getElementById(input.id + "-error");
  errorText.textContent = "";
  field.classList.remove("invalid");
  field.classList.add("valid");
  input.removeAttribute("aria-invalid");
}


// ---------- 4. One check function per field ----------
// Each returns true (OK) or false (has an error)

function checkName() {
  const value = nameInput.value.trim();
  if (value === "") {
    showError(nameInput, "Please enter your name.");
    return false;
  }
  showValid(nameInput);
  return true;
}

function checkEmail() {
  const value = emailInput.value.trim();
  if (value === "") {
    showError(emailInput, "Please enter your email address.");
    return false;
  }
  if (!emailPattern.test(value)) {
    showError(emailInput, "That email doesn't look right. Try name@example.com");
    return false;
  }
  showValid(emailInput);
  return true;
}

function checkPhone() {
  const value = phoneInput.value.trim();
  if (value === "") {
    showError(phoneInput, "Please enter your phone number.");
    return false;
  }
  if (!digitsPattern.test(value)) {
    showError(phoneInput, "Use digits only (0–9). No spaces, + or dashes.");
    return false;
  }
  showValid(phoneInput);
  return true;
}

function checkMessage() {
  const value = messageInput.value.trim();
  if (value === "") {
    showError(messageInput, "Please write a short message.");
    return false;
  }
  showValid(messageInput);
  return true;
}


// ---------- 5. Check the whole form ----------
function validateForm() {
  // Run ALL checks (so every error shows at once), and keep the results
  const results = [checkName(), checkEmail(), checkPhone(), checkMessage()];

  // The form is valid only if NO result is false
  return results.includes(false) === false;
}


// ---------- 6. Event handling ----------

// When the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading
  successBox.classList.remove("show");

  if (validateForm()) {
    // Everything passed: thank the visitor by first name
    const firstName = nameInput.value.trim().split(" ")[0];
    successBox.textContent = "Thank you, " + firstName + "! Your message has been received. I'll reply within two days.";
    successBox.classList.add("show");

    // Clear the form and the green borders
    form.reset();
    const fields = form.querySelectorAll(".field");
    fields.forEach(function (field) {
      field.classList.remove("valid");
    });
  } else {
    // Move the cursor to the first field with an error
    const firstError = form.querySelector(".invalid input, .invalid textarea");
    firstError.focus();
  }
});

// Check each field when the visitor leaves it ("blur")
nameInput.addEventListener("blur", checkName);
emailInput.addEventListener("blur", checkEmail);
phoneInput.addEventListener("blur", checkPhone);
messageInput.addEventListener("blur", checkMessage);
