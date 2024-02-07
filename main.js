const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const clearScreen = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

class Reaction {
  constructor() {
    this.state = "init";
    this.time = 0;
    this.lastTime = 0;
    this.timeId = 0;
  }

  fillScreen(color = "blue") {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  writeOnScreen(text, size = 24) {
    ctx.fillStyle = "black";
    ctx.font = `${size}px serif`;
    const textSize = Math.floor(ctx.measureText(text).width);
    ctx.fillText(text, (canvas.width - textSize) / 2, canvas.height / 2);
  }

  click() {
    switch (this.state) {
      case "waiting":
        clearTimeout(this.timeId);
        this.timeId = 0;
        this.state = "wrong";
        break;
      case "click":
        this.state = "correct";
        break;
      default:
        this.time = 0;
        this.lastTime = 0;
        this.timeId = 0;
        this.state = "waiting";
        break;
    }
  }

  waitingTime() {
    const randomTime = Math.random() * 5000 + 2000;
    this.timeId = setTimeout(() => {
      this.state = "click";
    }, randomTime);
  }
}

const reaction = new Reaction();

const handleClick = () => {
  reaction.click();
};

const animate = () => {
  clearScreen();
  switch (reaction.state) {
    case "init":
      reaction.writeOnScreen("Click na tela para iniciar");
      break;
    case "waiting":
      reaction.fillScreen("blue");
      reaction.writeOnScreen("Assim que a cor mudar, de um click");
      if (reaction.timeId == 0) {
        reaction.waitingTime();
      }
      break;
    case "click":
      reaction.fillScreen("green");
      reaction.writeOnScreen("Click agora!");
      if (reaction.time == 0) {
        reaction.time = Date.now();
      }
      reaction.lastTime = Date.now();
      break;
    case "wrong":
      reaction.fillScreen("red");
      reaction.writeOnScreen("Calma, click para reiniciar.");
      break;
    case "correct":
      deltaTime = (reaction.lastTime - reaction.time) / 1000;
      reaction.writeOnScreen(`Parabéns, seu tempo foi de ${deltaTime}s`);
      break;
    default:
      break;
  }
  requestAnimationFrame(animate);
};

window.addEventListener("click", handleClick);
animate();
