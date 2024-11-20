window.onload = function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const spriteFrames = [
        [588, 7], [636, 7],   // Primer sprite en la fila 0, columna 0
        [13, 157], [78, 157], [140, 157], [204, 157],  // Segundo sprite en la fila 0, columna 1
        
      ];
  
      let player = {
        x: 250,
        y: 250,
        width: 50,
        height: 50,
        speed: 5,
        currentFrame: 0, // Índice del sprite actual
        maxFrames: 4,    // Número total de frames en una fila
      };
      
      function actualizarJugador() {
        player.currentFrame++;
        if (player.currentFrame >= player.maxFrames) {
          player.currentFrame = 0; // Reseteamos al primer frame
        }
      
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar el sprite del jugador en su nueva posición
        ctx.drawImage(
          imagen, 
          spriteFrames[player.currentFrame][0], // Coordenada X
          spriteFrames[player.currentFrame][1], // Coordenada Y
          50, 50,  // Ancho y alto del sprite
          player.x, player.y,  // Coordenadas en el canvas
          player.width, player.height // Tamaño del sprite en el canvas
        );
      }
      
      // Llamamos a la función de actualización en el ciclo del juego
      function gameLoop() {
        actualizarJugador();
        // Lógica del juego...
      }
      
      setInterval(gameLoop, 1000 / 60); 
  
    let enemy = {
      x: 100,
      y: 100,
      width: 40,
      height: 40,
      color: 'red',
      speed: 2,
      health: 50,
    };
  
    let score = 0;
    let attacking = false;
  
    const scoreElement = document.getElementById('score');
    const healthElement = document.getElementById('player-health');
  
    function updateCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Dibujar jugador con animación
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.width, player.height);
  
      // Dibujar enemigo
      ctx.fillStyle = enemy.color;
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  
      // Actualizar la puntuación y vida
      scoreElement.textContent = score;
      healthElement.textContent = player.health;
    }
  
    // Movimiento del jugador
    function movePlayer(e) {
      if (e.key === 'ArrowUp') player.y -= player.speed;
      if (e.key === 'ArrowDown') player.y += player.speed;
      let xDerecha = false;
let xIzquierda = false;

function moverJugador(evt) {
  if (evt.key === "ArrowRight") {
    player.x += player.speed;
    xDerecha = true;
    xIzquierda = false;
  } else if (evt.key === "ArrowLeft") {
    player.x -= player.speed;
    xIzquierda = true;
    xDerecha = false;
  }
}

document.addEventListener("keydown", moverJugador);

    }
  
    // Ataque
    function attack() {
      if (!attacking) {
        attacking = true;
        setTimeout(() => attacking = false, 200); // El ataque dura 200ms
        if (isColliding(player, enemy)) {
          enemy.health -= 10;
          score += 10;
          if (enemy.health <= 0) {
            resetEnemy();
          }
        }
      }
    }
  
    // Verificar colisión
    function isColliding(rect1, rect2) {
      return rect1.x < rect2.x + rect2.width &&
             rect1.x + rect1.width > rect2.x &&
             rect1.y < rect2.y + rect2.height &&
             rect1.y + rect1.height > rect2.y;
    }
  
    // Movimiento del enemigo
    function moveEnemy() {
      if (enemy.x < player.x) enemy.x += enemy.speed;
      if (enemy.x > player.x) enemy.x -= enemy.speed;
      if (enemy.y < player.y) enemy.y += enemy.speed;
      if (enemy.y > player.y) enemy.y -= enemy.speed;
    }
  
    // Resetear enemigo después de ser derrotado
    function resetEnemy() {
      enemy.x = Math.random() * 400 + 50;
      enemy.y = Math.random() * 400 + 50;
      enemy.health = 50;
    }
  
    // Función para manejar el Dash
    function handleDash() {
      if (player.dashActive && player.dashCountdown > 0) {
        player.dashCountdown--;
        const dashSpeed = player.speed * 3;
        if (player.direction === 'right') {
          player.x += dashSpeed;
        } else if (player.direction === 'left') {
          player.x -= dashSpeed;
        }
      } else {
        player.dashActive = false;
      }
    }
  
    // Lógica del juego
    function gameLoop() {
      moveEnemy();
      handleDash();
      updateCanvas();
    }
  
    document.addEventListener('keydown', movePlayer);
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        player.dashActive = true;
        player.dashCountdown = player.dashDuration; // Inicia el dash
      } else if (e.key === 'Enter') {
        attack(); // Atacar con la barra espaciadora
      }
    });

    const imagen = new Image();
    imagen.src = "assets/images/ace.png";
  
    setInterval(gameLoop, 1000 / 60); // 60 FPS
  }
  