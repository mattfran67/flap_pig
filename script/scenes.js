function sceneOpening() {
  curScene = 1;

  // Reinicia as maçãs
  for (let i = 0; i < winNumber; i++) {
    apples[i] = new Points(imagem, 200 + i * 60, random(10, contx.canvH - 20));
  }

  // Tela de fundo
  contx.ctx.fillStyle = "red";
  contx.ctx.fillRect(0, 0, contx.canvW, contx.canvH);

  pig.draw();

  contx.ctx.fillStyle = "white";
  contx.ctx.font = "30px Arial";
  contx.ctx.fillText("Flap Pig", (contx.canvW / 2) - 60, (contx.canvH / 2));
  contx.ctx.font = "17px Arial";
  contx.ctx.fillText("Tente pegar todas as maçãs", (contx.canvW / 2) - 100, (contx.canvH / 2) + 40);
  contx.ctx.font = "15px Arial";
  contx.ctx.fillText("(Clique para Iniciar)", (contx.canvW / 2) - 60, (contx.canvH / 2) + 70);
  contx.ctx.fillText("(Use espaço para pular)", (contx.canvW / 2) - 75, (contx.canvH) - 15);
}

function sceneEnd() {
  curScene = 3;
  // Tela de fundo
  contx.ctx.fillStyle = "red";
  contx.ctx.fillRect(0, 0, contx.canvW, contx.canvH);

  contx.ctx.fillStyle = "white";
  contx.ctx.font = "30px Arial";
  contx.ctx.fillText("Você Venceu!!!", (contx.canvW / 2) - 100, contx.canvH / 2);

  contx.ctx.font = "20px Arial";
  contx.ctx.fillText("Clique para Reiniciar", (contx.canvW / 2) - 90, (contx.canvH / 2) + 30);

  contx.ctx.font = "20px Arial";
  contx.ctx.fillText("Pontos: " + player.points, 10, 30);
}

function gameOver() {
  curScene = 4;
  // Tela de fundo
  contx.ctx.fillStyle = "red";
  contx.ctx.fillRect(0, 0, contx.canvW, contx.canvH);

  contx.ctx.fillStyle = "white";
  contx.ctx.font = "30px Arial";
  contx.ctx.fillText("Você Perdeu!?", (contx.canvW / 2) - 100, contx.canvH / 2);

  contx.ctx.font = "20px Arial";
  contx.ctx.fillText("Clique para Reiniciar", (contx.canvW / 2) - 90, (contx.canvH / 2) + 30);

  contx.ctx.font = "20px Arial";
  contx.ctx.fillText("Pontos: " + player.points, 10, 30);
}

function animation() {
  curScene = 2;
  // Fundo
  contx.ctx.fillStyle = "rgb(81, 164, 224)";
  contx.ctx.fillRect(0, 0, contx.canvW, contx.canvH);
  contx.ctx.fillStyle = "rgb(90, 140, 30)";
  contx.ctx.fillRect(0, contx.canvH - 100, contx.canvW, 100);

  for (let i = 0; i < fences.length; i++) {
    fences[i].draw();
    fences[i].x--;

    if (fences[i].x <= (contx.canvW  * - 1)) {
      fences[i].x = contx.canvW;
    }
  }
  
  // Maçãs
  for (let i = 0; i < apples.length; i++) {
    apples[i].draw();
    player.score(apples[i]);
    apples[i].x -= 2;
  }
  
  // Desenha Jogador
  player.draw();

  // Pontos do jogador
  contx.ctx.fillStyle = "white";
  contx.ctx.font = "20px Arial";
  contx.ctx.fillText("Pontos: " + player.points, 10, 30);
  
  // Pula ou cai se tecla for pressionada
  if (keyIsPressed) {
    player.jump();
  } else {
    player.fall();
  }
  
  id = window.requestAnimationFrame(animation);

  if (player.points >= winNumber) {
    sceneEnd();
    player.points = 0;
    cancelAnimationFrame(id);
  }

  if (apples[apples.length - 1].x < -50 && player.points < winNumber) {
    gameOver();
    player.points = 0;
    cancelAnimationFrame(id);
  }
}