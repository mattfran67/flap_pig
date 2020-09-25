var canvas = document.getElementById('canvas');

// Objeto com as propriedades do elemento canvas
var contx = {
  ctx: canvas.getContext("2d"),
  canvH: canvas.height,
  canvW: canvas.width
}

// Jogador
function Player(x, y, width = 30, speed = 5) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.points = 0;
  this.speed = speed;
  this.ctx = contx.ctx;
  this.scrnH = contx.canvH;
}

Player.prototype.draw = function () {
  // Orelha
  this.ctx.fillStyle = "rgb(219, 195, 219)";
  this.ctx.fillRect(this.x - (11/12 * this.width), this.y - this.width, this.width / 2, this.width * 2/3);
  this.ctx.fillRect(this.x + (5/12 * this.width), this.y - this.width, this.width / 2, this.width * 2/3);
  
  // Cabeça
  this.ctx.fillStyle = "rgb(250, 215, 250)";
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
  this.ctx.fill();

  // Ponta da orelha
  this.ctx.fillStyle = "rgb(250, 227, 250)";
  this.ctx.moveTo(this.x + (5/12 * this.width), this.y - this.width);
  this.ctx.lineTo(this.x + (this.width * 2/3), this.y - (this.width / 2));
  this.ctx.lineTo(this.x + (this.width * 11/12), this.y - this.width);
  this.ctx.lineTo(this.x + (5/12 * this.width), this.y - this.width);
  this.ctx.fill();
  this.ctx.moveTo(this.x - (5/12 * this.width), this.y - this.width);
  this.ctx.lineTo(this.x - (this.width * 2/3), this.y - (this.width / 2));
  this.ctx.lineTo(this.x - (this.width * 11/12), this.y - this.width);
  this.ctx.lineTo(this.x - (5/12 * this.width), this.y - this.width);
  this.ctx.fill();

  // Olhos
  this.ctx.fillStyle = "#000";
  this.ctx.beginPath();
  this.ctx.arc(this.x - (this.width / 3), this.y - (this.width / 3), this.width / 8, 0, Math.PI * 2);
  this.ctx.fill();
  this.ctx.beginPath();
  this.ctx.arc(this.x + (this.width / 3), this.y - (this.width / 3), this.width / 8, 0, Math.PI * 2);
  this.ctx.fill();

  // Nariz
  this.ctx.fillStyle = "rgb(230, 175, 230)";
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.width / 4, 0, Math.PI * 2);
  this.ctx.fill();
  this.ctx.fillStyle = "rgb(246, 205, 250)";
  this.ctx.beginPath();
  this.ctx.arc(this.x - (this.width / 10), this.y, this.width / 20, 0, Math.PI * 2);
  this.ctx.fill();
  this.ctx.beginPath();
  this.ctx.arc(this.x + (this.width / 10), this.y, this.width / 20, 0, Math.PI * 2);
  this.ctx.fill();

}

Player.prototype.jump = function () {
  this.y = this.y <= this.width ? this.width : this.y - this.speed;
}

Player.prototype.fall = function () {
  this.y = this.y >= this.scrnH - this.width ? this.scrnH - this.width : this.y + this.speed;
}

Player.prototype.score = function (obj) {
  if ((obj.x <= (this.x + this.width) && obj.x >= (this.x - this.width)) &&
    (obj.y >= (this.y - this.width) && obj.y <= (this.y + this.width))) {
      obj.y = -100;
      this.points++;
  }
}

// Pontos
function Points(img, x, y) {
  this.x = x;
  this.y = y;
  this.width = 18;
  this.height = 24;
  this.img = img;
  this.ctx = contx.ctx;
}

Points.prototype.draw = function () {
  this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

// Cercas
function Fences(x, y) {
  this.x = x;
  this.y = y;
  this.width = contx.canvW;
  this.gap = 70;
  this.totalFences = Math.floor(this.width / this.gap);
  this.ctx = contx.ctx;
}

Fences.prototype.draw = function() {
  // Cercas verticais
  this.ctx.fillStyle = "rgb(153, 140, 124)";
  for (let i = 0; i < this.totalFences; i++) {
    this.ctx.fillRect(this.x + (i * 70), this.y, 20, 100);
  }

  // Cercas horizontais
  this.ctx.fillStyle = "rgb(138, 124, 124)";
  this.ctx.fillRect(this.x, this.y + 20, this.width, 20);
  this.ctx.fillRect(this.x, this.y + 60, this.width, 20);
}