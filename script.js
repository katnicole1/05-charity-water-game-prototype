// ===============================
// TIDE OF HOPE
// FINAL GAME VERSION
// ===============================


// -------------------------------
// STARTING VALUES
// -------------------------------

let playerHp = 100;
let playerSp = 30;

let enemyHp = 100;

let score = 0;
let timeLeft = 60;

let shielded = false;
let gameOver = false;

let timerInterval;


// Tracks which milestones already appeared

let milestonesShown = [];



// -------------------------------
// HTML ELEMENTS
// -------------------------------

const playerHpText =
  document.getElementById("playerHpText");

const playerSpText =
  document.getElementById("playerSpText");

const enemyHpText =
  document.getElementById("enemyHpText");


const playerHpBar =
  document.getElementById("playerHpBar");

const playerSpBar =
  document.getElementById("playerSpBar");

const enemyHpBar =
  document.getElementById("enemyHpBar");


const scoreEl =
  document.getElementById("score");

const timerEl =
  document.getElementById("timer");

const messageEl =
  document.getElementById("message");


const purifyBtn =
  document.getElementById("purifyBtn");

const filterBtn =
  document.getElementById("filterBtn");

const recoverBtn =
  document.getElementById("recoverBtn");

const resetBtn =
  document.getElementById("resetBtn");


const heroImage =
  document.querySelector(".hero-image");

const monsterImage =
  document.querySelector(".monster-image");


const battleScene =
  document.getElementById("battleScene");



// -------------------------------
// UPDATE SCREEN
// -------------------------------

function updateDisplay() {

  playerHpText.textContent =
    `${playerHp} / 100`;


  playerSpText.textContent =
    `${playerSp} / 30`;


  enemyHpText.textContent =
    `${enemyHp} / 100`;


  playerHpBar.style.width =
    `${playerHp}%`;


  playerSpBar.style.width =
    `${(playerSp / 30) * 100}%`;


  enemyHpBar.style.width =
    `${enemyHp}%`;


  scoreEl.textContent =
    score;


  timerEl.textContent =
    timeLeft;
}



// -------------------------------
// MESSAGE BOX
// -------------------------------

function setMessage(text) {

  messageEl.textContent =
    text;

}



// -------------------------------
// BUTTONS
// -------------------------------

function disableButtons() {

  purifyBtn.disabled = true;

  filterBtn.disabled = true;

  recoverBtn.disabled = true;

}


function enableButtons() {

  purifyBtn.disabled = false;

  filterBtn.disabled = false;

  recoverBtn.disabled = false;

}



// ===============================
// MILESTONE SYSTEM
// ===============================

const milestones = [

  {
    pollution: 60,
    message:
      "Great progress! The water is starting to clear!"
  },

  {
    pollution: 40,
    message:
      "More than halfway there! Keep purifying!"
  },

  {
    pollution: 20,
    message:
      "Almost clean! One final push!"
  }

];



function checkMilestones() {

  milestones.forEach(
    function (milestone) {

      if (
        enemyHp <= milestone.pollution &&
        !milestonesShown.includes(
          milestone.pollution
        )
      ) {

        milestonesShown.push(
          milestone.pollution
        );


        showMilestone(
          milestone.message
        );

      }

    }
  );

}



// -------------------------------
// CREATE MILESTONE POPUP
// -------------------------------

function showMilestone(text) {

  const milestone =
    document.createElement("div");


  milestone.classList.add(
    "milestone-toast"
  );


  milestone.textContent =
    text;


  document.body.appendChild(
    milestone
  );


  setTimeout(
    function () {

      milestone.remove();

    },
    2200
  );

}



// ===============================
// ANIMATIONS
// ===============================


// HERO ATTACK

function animateHeroAttack() {

  heroImage.animate(
    [

      {
        transform:
          "translateX(0)"
      },

      {
        transform:
          "translateX(45px)"
      },

      {
        transform:
          "translateX(0)"
      }

    ],

    {
      duration: 350
    }
  );

}



// HERO PURIFY GLOW

function animateHeroGlow() {

  heroImage.animate(
    [

      {
        filter:
          "drop-shadow(0 12px 8px rgba(0,0,0,.7))"
      },

      {
        filter:
          "drop-shadow(0 0 25px #42d7ff) drop-shadow(0 0 45px #42d7ff)"
      },

      {
        filter:
          "drop-shadow(0 12px 8px rgba(0,0,0,.7))"
      }

    ],

    {
      duration: 500
    }
  );

}



// MONSTER SHAKE

function animateMonsterHit() {

  monsterImage.animate(
    [

      {
        transform:
          "translateX(0)"
      },

      {
        transform:
          "translateX(15px)"
      },

      {
        transform:
          "translateX(-15px)"
      },

      {
        transform:
          "translateX(10px)"
      },

      {
        transform:
          "translateX(0)"
      }

    ],

    {
      duration: 400
    }
  );

}



// MONSTER RED FLASH

function animateMonsterRedFlash() {

  monsterImage.animate(
    [

      {
        filter:
          "drop-shadow(0 12px 8px rgba(0,0,0,.8))"
      },

      {
        filter:
          "brightness(1.8) sepia(1) saturate(8) hue-rotate(320deg) drop-shadow(0 0 20px red)"
      },

      {
        filter:
          "drop-shadow(0 12px 8px rgba(0,0,0,.8))"
      }

    ],

    {
      duration: 350
    }
  );

}



// HERO DAMAGE

function animateHeroHit() {

  heroImage.animate(
    [

      {
        opacity: 1
      },

      {
        opacity: .3
      },

      {
        opacity: 1
      },

      {
        opacity: .3
      },

      {
        opacity: 1
      }

    ],

    {
      duration: 450
    }
  );

}



// FILTER GLOW

function animateFilter() {

  heroImage.animate(
    [

      {
        filter:
          "drop-shadow(0 12px 8px rgba(0,0,0,.7))"
      },

      {
        filter:
          "drop-shadow(0 0 20px #77f6ff) drop-shadow(0 0 35px #77f6ff)"
      },

      {
        filter:
          "drop-shadow(0 12px 8px rgba(0,0,0,.7))"
      }

    ],

    {
      duration: 700
    }
  );

}



// RECOVER GLOW

function animateRecover() {

  heroImage.animate(
    [

      {
        filter:
          "drop-shadow(0 12px 8px rgba(0,0,0,.7))"
      },

      {
        filter:
          "brightness(1.3) drop-shadow(0 0 25px #70ff9b)"
      },

      {
        filter:
          "drop-shadow(0 12px 8px rgba(0,0,0,.7))"
      }

    ],

    {
      duration: 650
    }
  );

}



// ===============================
// ENEMY ATTACK
// ===============================

function enemyAttack() {

  if (gameOver) {

    return;

  }


  let damage =
    Math.floor(
      Math.random() * 6
    ) + 10;



  // FILTER REDUCES DAMAGE

  if (shielded) {

    damage = 5;

    shielded = false;


    setMessage(
      `Your FILTER protected you! You only took ${damage} damage.`
    );

  }


  else {

    setMessage(
      `The Pollution Monster attacks! You take ${damage} damage.`
    );

  }



  playerHp -= damage;


  if (playerHp < 0) {

    playerHp = 0;

  }


  animateHeroHit();


  updateDisplay();


  checkGameStatus();

}



// ===============================
// WIN CELEBRATION
// ===============================

function celebrateWin() {

  if (
    typeof confetti !== "function"
  ) {

    return;

  }


  confetti({

    particleCount: 120,

    spread: 90,

    origin: {
      y: .6
    }

  });



  setTimeout(
    function () {

      confetti({

        particleCount: 80,

        spread: 120,

        origin: {

          x: .25,

          y: .6

        }

      });

    },

    250
  );



  setTimeout(
    function () {

      confetti({

        particleCount: 80,

        spread: 120,

        origin: {

          x: .75,

          y: .6

        }

      });

    },

    500
  );

}



// ===============================
// CHECK WIN / LOSS
// ===============================

function checkGameStatus() {


  // ---------------------------
  // WIN
  // ---------------------------

  if (enemyHp <= 0) {

    enemyHp = 0;


    score += 50;


    gameOver = true;


    clearInterval(
      timerInterval
    );


    updateDisplay();


    disableButtons();



    setMessage(
      `CLEAN WATER RESTORED! You defeated the Pollution Monster! Final Score: ${score}`
    );



    // Change battlefield to clean water

    battleScene.classList.add(
      "victory-scene"
    );



    celebrateWin();



    monsterImage.animate(
      [

        {
          opacity: 1,

          transform:
            "scale(1)"
        },

        {
          opacity: .6,

          transform:
            "scale(1.08)"
        },

        {
          opacity: 0,

          transform:
            "scale(.45)"
        }

      ],

      {

        duration: 1000,

        fill: "forwards"

      }
    );


    return;

  }



  // ---------------------------
  // PLAYER LOSES
  // ---------------------------

  if (playerHp <= 0) {

    playerHp = 0;


    gameOver = true;


    clearInterval(
      timerInterval
    );


    updateDisplay();


    disableButtons();


    setMessage(
      "The Pollution Monster defeated you. Press RESET BATTLE and try again!"
    );


    return;

  }



  // ---------------------------
  // TIMER ENDS
  // ---------------------------

  if (timeLeft <= 0) {

    timeLeft = 0;


    gameOver = true;


    clearInterval(
      timerInterval
    );


    updateDisplay();


    disableButtons();


    setMessage(
      "Time's up! The water is still polluted. Press RESET BATTLE to try again."
    );

  }

}



// ===============================
// PURIFY
// ===============================

purifyBtn.addEventListener(
  "click",

  function () {


    if (gameOver) {

      return;

    }



    if (playerSp >= 10) {


      playerSp -= 10;


      enemyHp -= 20;


      score += 10;



      if (enemyHp < 0) {

        enemyHp = 0;

      }



      animateHeroAttack();

      animateHeroGlow();

      animateMonsterHit();

      animateMonsterRedFlash();



      setMessage(
        "You used PURIFY! Pollution decreased by 20."
      );



      updateDisplay();



      // Check for score/pollution milestones

      checkMilestones();



      checkGameStatus();



      if (!gameOver) {

        setTimeout(
          enemyAttack,
          850
        );

      }

    }



    else {

      setMessage(
        "Not enough SP! Use FILTER to recover SP."
      );

    }

  }
);



// ===============================
// FILTER
// ===============================

filterBtn.addEventListener(
  "click",

  function () {


    if (gameOver) {

      return;

    }



    shielded = true;



    playerSp += 5;



    if (playerSp > 30) {

      playerSp = 30;

    }



    score += 5;



    animateFilter();



    setMessage(
      "You used FILTER! Your next incoming attack is reduced and you recovered 5 SP."
    );



    updateDisplay();



    setTimeout(
      enemyAttack,
      850
    );

  }
);



// ===============================
// RECOVER
// ===============================

recoverBtn.addEventListener(
  "click",

  function () {


    if (gameOver) {

      return;

    }



    if (playerHp === 100) {

      setMessage(
        "Your HP is already full!"
      );


      return;

    }



    playerHp += 15;



    if (playerHp > 100) {

      playerHp = 100;

    }



    animateRecover();



    setMessage(
      "You used RECOVER and restored 15 HP!"
    );



    updateDisplay();



    setTimeout(
      enemyAttack,
      850
    );

  }
);



// ===============================
// TIMER
// ===============================

function startTimer() {

  clearInterval(
    timerInterval
  );


  timerInterval =
    setInterval(

      function () {


        if (!gameOver) {


          timeLeft--;



          if (timeLeft < 0) {

            timeLeft = 0;

          }



          updateDisplay();


          checkGameStatus();

        }

      },

      1000
    );

}



// ===============================
// RESET
// ===============================

resetBtn.addEventListener(
  "click",

  resetGame
);



function resetGame() {


  playerHp = 100;


  playerSp = 30;


  enemyHp = 100;


  score = 0;


  timeLeft = 60;


  shielded = false;


  gameOver = false;



  // Reset milestone tracking

  milestonesShown = [];



  // Remove victory background

  battleScene.classList.remove(
    "victory-scene"
  );



  enableButtons();



  // Cancel previous animations

  heroImage
    .getAnimations()
    .forEach(

      function (animation) {

        animation.cancel();

      }

    );


  monsterImage
    .getAnimations()
    .forEach(

      function (animation) {

        animation.cancel();

      }

    );



  // Restore characters

  heroImage.style.opacity =
    "1";

  heroImage.style.transform =
    "none";

  heroImage.style.filter =
    "";



  monsterImage.style.opacity =
    "1";

  monsterImage.style.transform =
    "none";

  monsterImage.style.filter =
    "";



  // Remove any leftover milestone popup

  document
    .querySelectorAll(
      ".milestone-toast"
    )
    .forEach(

      function (milestone) {

        milestone.remove();

      }

    );



  updateDisplay();



  setMessage(
    "A Pollution Monster is contaminating the water! Choose an action."
  );



  startTimer();

}



// ===============================
// START GAME
// ===============================

updateDisplay();

startTimer();
