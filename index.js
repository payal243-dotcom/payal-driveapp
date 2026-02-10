/***********************
  BASIC SCREENS
************************/
const splash = document.getElementById("splash");
const login = document.getElementById("login");
const signup = document.getElementById("signup");
const instructorSignup = document.getElementById("instructorSignup");
const congrats = document.getElementById("congrats");
const dashboard = document.getElementById("dashboard");
const forgot = document.getElementById("forgot");
const postal = document.getElementById("postal");
const lesson = document.getElementById("lesson");


/***********************
  STATIC LOGIN
************************/
const STATIC_EMAIL = "test@gmail.com";
const STATIC_PASSWORD = "123456";

/**********************
  BUTTONS
************************/
const loginBtn = document.getElementById("loginBtn");
const signupLink = document.getElementById("signupLink");
const backLogin = document.getElementById("backLogin");
const roleNext = document.getElementById("roleNext");
const forgotLink = document.getElementById("forgotLink");
const forgotBack = document.getElementById("forgotBack");
const congratsNext = document.getElementById("congratsNext");
const logoutBtn = document.getElementById("logoutBtn");

let selectedRole = "";
/***********************
  SCREEN SWITCH
************************/
function showScreen(id) {
  document.querySelectorAll(".screen")
    .forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
/***********************
  SPLASH → LOGIN
************************/
setTimeout(() => {
  splash.classList.remove("active");
  login.classList.add("active");
}, 2500);

/***********************
  LOGIN
************************/
loginBtn.addEventListener("click", () => {

  emailError.style.display = "none";
  passwordError.style.display = "none";

  if (email.value.trim() === "") {
    emailError.style.display = "block";
    return;
  }

  if (password.value.trim() === "") {
    passwordError.style.display = "block";
    return;
  }

  if (email.value === STATIC_EMAIL && password.value === STATIC_PASSWORD) {

    loading.style.display = "flex";

    setTimeout(() => {
      loading.style.display = "none";
      showScreen("dashboard");
    }, 3000);

  } else {
    passwordError.innerText = "Invalid email or password";
    passwordError.style.display = "block";
  }
});

/***********************
  LOGOUT
************************/
logoutBtn.addEventListener("click", () => {
  email.value = "";
  password.value = "";
  showScreen("login");
});




/***********************
  SIGNUP
************************/
signupLink.onclick = () => showScreen("signup");
backLogin.onclick = () => showScreen("login");

function selectRole(card) {
  document.querySelectorAll(".role-card").forEach(c =>
    c.classList.remove("active")
  );
  card.classList.add("active");
  selectedRole = card.dataset.role;
}

roleNext.onclick = () => {

  // ❌ agar role hi select nahi kiya
  if (selectedRole === "") {
    alert("Please select a role");
    return;
  }

  // hide signup screen
  signup.classList.remove("active");

  // ✅ PUPIL FLOW
  if (selectedRole === "pupil") {
    showScreen("postal");   // ya jo tumhari first pupil screen hai
  }

  // ✅ INSTRUCTOR FLOW
  if (selectedRole === "instructor") {
    showScreen("instructorSignup");
  }
};
/***********************
  POSTAL CODE (PUPIL FLOW)
************************/
const postalNext = document.getElementById("postalNext");
const postalInput = document.getElementById("postalInput");
const postalError = document.getElementById("postalError");

postalNext.onclick = () => {

  if (postalInput.value.trim() === "") {
    postalError.style.display = "block";
    return;
  }

  postalError.style.display = "none";

  // ✅ go to lesson screen
  showScreen("lesson");
};
/***********************
  LESSON SELECTION
************************/
const lessonCards = document.querySelectorAll(".lesson-card");
const lessonNext = document.getElementById("lessonNext"); // your "Next" button on lesson screen
let selectedLesson = "";

// Initially disable Next button
lessonNext.disabled = true;
lessonNext.classList.remove("active");

lessonCards.forEach(card => {
  card.onclick = () => {
    // Remove active class from all cards
    lessonCards.forEach(c => c.classList.remove("active"));

    // Mark clicked card as active
    card.classList.add("active");

    // Save selected lesson
    selectedLesson = card.dataset.lesson;

    // Enable Next button
    lessonNext.disabled = false;
    lessonNext.classList.add("active");
  };
});

// Show instructor date screen after lesson selection
lessonNext.onclick = () => {
  if (selectedLesson === "") {
    alert("Please select a lesson");
    return;
  }
  const lessonBackBtn = document.getElementById("lessonBack");

lessonBackBtn.onclick = () => {
  showScreen("postal"); // back to postal code screen
};


  // Show the calendar / instructorDate screen
  showScreen("instructorDate");

  // Calendar icon click
  const calendarBtn = document.getElementById("calendarBtn");
  const calendarOverlay = document.getElementById("calendarOverlay");
  const calendarDates = document.getElementById("calendarDates");
  const selectedDate = document.getElementById("selectedDate");
  let currentDate = new Date();

  calendarBtn.onclick = () => {
    calendarOverlay.style.display = "flex";
    renderCalendar();
  };

  calendarOverlay.onclick = (e) => {
    if (e.target === calendarOverlay) {
      calendarOverlay.style.display = "none";
    }
  };

  document.getElementById("nextMonth").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  };
  document.getElementById("prevMonth").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  };

  function renderCalendar() {
    calendarDates.innerHTML = "";
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    document.getElementById("monthYear").innerText = currentDate.toLocaleString("en-US", {
      month: "long",
      year: "numeric"
    });
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      calendarDates.innerHTML += "<span></span>";
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const span = document.createElement("span");
      span.innerText = day;
      span.onclick = () => {
        selectedDate.innerText = `${String(day).padStart(2,"0")} ${currentDate.toLocaleString("en-US",{month:"short"})} ${year}`;
        calendarOverlay.style.display = "none";
      };
      calendarDates.appendChild(span);
    }
  }

  // Back button on calendar screen
  const dateBack = document.getElementById("dateBack");
  dateBack.onclick = () => {
    showScreen("lesson"); // go back to lesson selection
  };
};



/***********************
  INSTRUCTOR SIGNUP
************************/
const instructorScreen = document.getElementById("instructorSignup");
const signupBtn = instructorScreen.querySelector(".signup-btn");
const fields = instructorScreen.querySelectorAll("input");
const errors = instructorScreen.querySelectorAll(".error");

fields.forEach((f, i) => {
  f.addEventListener("input", () => {
    errors[i].style.display = "none";
    checkSignup();
  });
});

function checkSignup() {
  let ok = true;
  fields.forEach(f => {
    if (f.value.trim() === "") ok = false;
  });

  signupBtn.disabled = !ok;
  signupBtn.classList.toggle("active", ok);
}

signupBtn.onclick = () => {
  showScreen("congrats");
  startConfetti();
};

/***********************
  CONGRATS
************************/
congratsNext.onclick = () => showScreen("login");

/***********************
  FORGOT
************************/
forgotLink.onclick = () => showScreen("forgot");
forgotBack.onclick = () => showScreen("login");

/***********************
  CONFETTI
************************/
function startConfetti() {
  const confetti = document.querySelector(".confetti");
  confetti.innerHTML = "";

  for (let i = 0; i < 80; i++) {
    const s = document.createElement("span");
    s.style.left = Math.random() * 100 + "%";
    s.style.background =
      ["#ff758c", "#6f42ff", "#ffd54f", "#4dd0e1"]
      [Math.floor(Math.random() * 4)];
    s.style.animationDelay = Math.random() * 3 + "s";
    confetti.appendChild(s);
  }
}

/***********************
  SCREEN SWITCH
************************/
function showScreen(id) {
  document.querySelectorAll(".screen")
    .forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/***********************
  FORGOT PASSWORD RESET
************************/
const resetBtn = document.getElementById("resetBtn");
const forgotEmail = document.getElementById("forgotEmail");
const forgotError = document.getElementById("forgotError");

resetBtn.onclick = () => {

  if (forgotEmail.value.trim() === "") {
    forgotError.innerText = "Email is required";
    forgotError.style.display = "block";
    return;
  }

  if (!forgotEmail.value.includes("@")) {
    forgotError.innerText = "Invalid email address";
    forgotError.style.display = "block";
    return;
  }

  // ✅ success case
  forgotError.style.display = "none";
  alert("Reset password link has been sent to your email");

  // back to login after reset
  showScreen("login");
}
const resetSuccess = document.getElementById("resetSuccess");

resetBtn.onclick = () => {

  if (forgotEmail.value.trim() === "") {
    forgotError.innerText = "Email is required";
    forgotError.style.display = "block";
    resetSuccess.style.display = "none";
    return;
  }

  if (!forgotEmail.value.includes("@")) {
    forgotError.innerText = "Invalid email address";
    forgotError.style.display = "block";
    resetSuccess.style.display = "none";
    return;
  }

  // ✅ success
  forgotError.style.display = "none";
  resetSuccess.style.display = "block";

  setTimeout(() => {
    showScreen("login");
    resetSuccess.style.display = "none";
  }, 2000);
};

