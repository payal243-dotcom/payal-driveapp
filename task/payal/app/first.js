const splash = document.getElementById("splash");
const login = document.getElementById("login");
const signup = document.getElementById("signup");
const postal = document.getElementById("postal");
const pupilSignup = document.getElementById("pupilSignup");
const instructorSignup = document.getElementById("instructorSignup");
const congratsScreen = document.getElementById("congrats");
const lesson = document.getElementById("lesson");
const instructorDate = document.getElementById("instructorDate");
const dateBack = document.getElementById("dateBack");
const dateNext = document.getElementById("dateNext");
const lessonError = document.getElementById("lessonError");
/*Buttons*/
const loginBtn = document.getElementById("loginBtn");
const signupLink = document.getElementById("signupLink");
const backLogin = document.getElementById("backLogin");
const roleNext = document.getElementById("roleNext");
const postalNext = document.getElementById("postalNext");
const lessonNext = document.getElementById("lessonNext");
const lessonBack = document.getElementById("lessonBack");

const postalInput = document.getElementById("postalInput");
const postalError = document.getElementById("postalError");

let selectedRole = ""; 

setTimeout(() => {
  splash.classList.remove("active");
  login.classList.add("active");
}, 2500);

loginBtn.onclick = () => {
  let valid = true;
  
  const email = document.getElementById("email");
  const Password = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const loading = document.getElementById("loading");
  
  // EMAIL CHECK
  if (email.value.trim() === "") {
    emailError.style.display = "block";
    email.classList.add("input-error");
    valid = false;
  } else {
    emailError.style.display = "none";
    email.classList.remove("input-error");
  }

  // PASSWORD CHECK
  if (Password.value.trim() === "") {
    passwordError.style.display = "block";
    Password.classList.add("input-error");
    valid = false;
  } else {
    passwordError.style.display = "none";
    Password.classList.remove("input-error");
  }

  if (!valid) return;

  loading.style.display = "flex";

  setTimeout(() => loading.style.display = "none", 4000);
};


signupLink.addEventListener("click", () => {
  login.classList.remove("active");
  signup.classList.add("active");
});


backLogin.addEventListener("click", () => {
  signup.classList.remove("active");
  login.classList.add("active");
});

roleNext.onclick = () => {
  signup.classList.remove("active");

  if (selectedRole === "instructor") {
    showScreen("instructorSignup"); 
  } else {
    postal.classList.add("active"); 
  }
};

function selectRole(card) {
  document.querySelectorAll(".role-card").forEach(c =>
    c.classList.remove("active")
  );
  card.classList.add("active");


  selectedRole = card.getAttribute("data-role");
  console.log("Selected role:", selectedRole); 
}


postalNext.onclick = () => {
  if (postalInput.value === "") {
    postalError.style.display = "block";
  } else {
    postalError.style.display = "none";
    postal.classList.remove("active");
    showScreen("lesson");
  }
};
lessonBack.onclick = () => {
  showScreen("postal");
};

lessonNext.onclick = () => {
  showScreen("instructorDate");
};
function selectLesson(card) {
  document.querySelectorAll(".lesson-card").forEach(c =>
    c.classList.remove("active")
  );
  card.classList.add("active");
  lessonSelected = true;
  lessonError.style.display = "none";
}
dateBack.onclick = () => {
  showScreen("lesson");
};
const calendarOverlay = document.getElementById("calendarOverlay"); 
const calendarDates = document.getElementById("calendarDates"); 
const monthYear = document.getElementById("monthYear"); 
const selectedDate = document.getElementById("selectedDate"); 
const calendarBtn = document.getElementById("calendarBtn");
 let currentDate = new Date();
  
calendarBtn.onclick = () => { 
  calendarOverlay.style.display = "flex";
   renderCalendar(); }; 
   
   calendarOverlay.onclick = (e) => {
     if(e.target === calendarOverlay){ 
      calendarOverlay.style.display = "none"; } 
    };
    
     document.getElementById("nextMonth").onclick = () => {
      currentDate.setMonth(currentDate.getMonth() + 1); 
      renderCalendar(); }; 
      document.getElementById("prevMonth").onclick = () => { 
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
      }; 
      function renderCalendar(){ 
        calendarDates.innerHTML = "";
        const year = currentDate.getFullYear(); 
        const month = currentDate.getMonth(); 
         monthYear.innerText = currentDate.toLocaleString("en-US", {
          month: "long", year: "numeric"
        }); 
        const firstDay = new Date(year, month, 1).getDay(); 
        const daysInMonth = new Date(year, month + 1, 0).getDate(); 
        for(let i=0;i<firstDay;i++)
          { calendarDates.innerHTML += "<span></span>"; } 
        for(let day=1; day<=daysInMonth; day++)
          { 
            const span = document.createElement("span");
            span.innerText = day;
             span.onclick = () => 
              { 
                selectedDate.innerText = `${String(day).padStart(2,"0")} 
                ${currentDate.toLocaleString("en-US",{month:"short"})} ${year}`;
                calendarOverlay.style.display = "none"; 
              };
              calendarDates.appendChild(span); 
            }
          }
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const screenToShow = document.getElementById(id);
  if (screenToShow) {
    screenToShow.classList.add("active");
  } else {
    console.log(`Error: Screen ${id} not found`);
  }
}
const instructorScreen = document.getElementById("instructorSignup"); 
const signupBtn = instructorScreen.querySelector(".signup-btn"); 
const fields = instructorScreen.querySelectorAll("input"); 
const errors = instructorScreen.querySelectorAll(".error"); 
const password = fields[4]; const confirmPassword = fields[5]; 
const eyes = instructorScreen.querySelectorAll(".eye");

 fields.forEach((field, i) => {
   field.addEventListener("input", () => { 
    errors[i].style.display = "none";
     checkSignup();
     }); 
    });
      eyes.forEach((eye, i) => {
         eye.onclick = () => { 
          const input = i === 0 ? password : confirmPassword; 
          input.type = input.type === "password" ? "text" : "password";
         }; 
        });
         function checkSignup(){
           let ok = true; 
           fields.forEach(f => {
             if(f.value.trim() === "") ok = false;
             }); 
             if(password.value !== confirmPassword.value){
               ok = false; } if(ok){ 
                signupBtn.classList.add("active"); 
                signupBtn.classList.remove("disabled");
                signupBtn.disabled = false;
               }
               else{ 
                signupBtn.classList.remove("active");
                 signupBtn.classList.add("disabled"); 
                 signupBtn.disabled = true; 
                } 
              } 
              signupBtn.onclick = () => { 
                let ok = true; 
                fields.forEach((f,i)=>{ 
                  if(f.value.trim()===""){ 
                    errors[i].style.display="block"; 
                    ok=false;
                   } 
                  });
                   if(password.value !== confirmPassword.value){ 
                    errors[5].innerText="Passwords do not match"; 
                    errors[5].style.display="block"; 
                    ok=false;
                   } 
                   if(!ok) return; 
                   showScreen("congrats"); 
                   startConfetti();
                   };
                    function startConfetti(){ 
                      const confetti = document.querySelector(".confetti"); 
                      confetti.innerHTML = ""; 
                      for(let i=0;i<80;i++){ 
                        const s = document.createElement("span");
                         s.style.left = Math.random()*100+"%";
                          s.style.background = ["#ff758c","#6f42ff","#ffd54f","#4dd0e1"]
                          [Math.floor(Math.random()*4)]; 
                          s.style.animationDelay = Math.random()*3+"s"; 
                          confetti.appendChild(s); 
                        } 
                      } 
                      function showScreen(id){ 
                        document.querySelectorAll(".screen").forEach(s => s.classList.remove("active") ); 
                        document.getElementById(id).classList.add("active");
                       } 
                       const forgot = document.getElementById("forgot");
                        const forgotLink = document.getElementById("forgotLink"); 
                        const forgotBack = document.getElementById("forgotBack"); 
                        const resetBtn = document.getElementById("resetBtn");
                         const forgotEmail = document.getElementById("forgotEmail");
                          const forgotError = document.getElementById("forgotError");
                           
                            forgotLink.onclick = () => {
                               login.classList.remove("active");
                                forgot.classList.add("active");
                               }; 
                               
                               forgotBack.onclick = () => { 
                                forgot.classList.remove("active");
                                 login.classList.add("active");
                                 }; 
                                 /* RESET PASSWORD */ 
                                 resetBtn.onclick = () => { 
                                  forgotError.style.display = "none";
                                   loading.style.display = "flex"; 
                                   setTimeout(() => { 
                                    loading.style.display = "none"; 
                                    forgotError.style.display = "block";
                                   },
                                    3000); 
                                  };

const congratsNext = document.getElementById("congratsNext");
congratsNext.onclick = () => {

  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const loginScreen = document.getElementById("login");
  if (loginScreen) {
    loginScreen.classList.add("active");
  } else {
    console.error("Login screen not found");
  }
};


