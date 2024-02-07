const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 640;
canvas.height = 480;

const fillScreen = (color = "blue") => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

let initialTime;
let final;
let waitingTime;
let notReady = true;
let win = false;
let intervalo;

const changeToReady = () => {
  initialTime = Date.now();
  notReady = false;
};

function draw(text) {
  ctx.fillStyle = "white";
  ctx.font = "48px serif";
  ctx.fillText(text, canvas.width * 0.1, canvas.height / 2, canvas.width * 0.8);
}

const animate = () => {
  if (notReady) {
    fillScreen("red");
    draw("Dê um click na tela quando ficar 'AZUL'");
  } else {
    fillScreen("blue");
    draw("Agora");
  }

  if (win) {
    fillScreen("green");
    draw(`O tempo de reação foi ${final - initialTime} ms`);
  }

  requestAnimationFrame(animate);
};

canvas.addEventListener("click", (e) => {
  console.log("click");
  if (!initialTime) {
    console.log("começou");

    waitingTime = Math.random() * 3000 + 2000;
    intervalo = setTimeout(changeToReady, waitingTime);
  } else if (initialTime && notReady) {
    console.log("errou");
    initialTime = undefined;
    clearInterval(intervalo);
    // Aparecer um texto dizendo para dar outro click
  } else if (!notReady) {
    console.log("acertou");
    final = Date.now();
    win = true;
    console.log(`O tempo de reação foi ${final - initialTime} ms `);
  }
});

animate();
