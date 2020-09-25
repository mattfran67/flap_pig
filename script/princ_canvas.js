// Valor boolean para verificar se a tecla foi pressionada
var keyIsPressed = false;
// Cena atual
var curScene = 0;
// Vetor de maçãs
var apples = [];
// Vetor de cercas
var fences = [];
// Pontos necessarios para vencer
var winNumber = 25;

// Objeto jogador
var player = new Player(60, 350);
var pig = new Player(contx.canvW / 2, 60, 35);

for (let i = 0; i < 2; i++) {
  fences[i] = new Fences(i * contx.canvW, 75);
}

// Imagem das maçãs
var imagem = new Image();
imagem.src = "images/apple.png";

// Muda as cenas
canvas.addEventListener('click', () => {
  if (curScene == 1) {
    animation();
  }
  else if (curScene == 3 || curScene == 4) {
    sceneOpening();
  } 
})

//Chama a primeira cena
sceneOpening();

// Verifica se a tecla espaço foi pressionada
document.addEventListener("keydown", (event) => {
  if (event.key == " ") {
    keyIsPressed = true;
  }
});

// Verifica se a tecla espaço foi solta
document.addEventListener("keyup", (event) => {
  if (event.key == " ") {
    keyIsPressed = false;
  }
});