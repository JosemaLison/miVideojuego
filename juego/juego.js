window.onload = function(){
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    let player = {
      x: 250,
      y: 250,
      width: 40,
      height: 40,
      color: 'blue',
      speed: 5,
      health: 100,
    };
    
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
    
      // Dibujar jugador
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
      if (e.key === 'ArrowLeft') player.x -= player.speed;
      if (e.key === 'ArrowRight') player.x += player.speed;
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
    
    // Lógica del juego
    function gameLoop() {
      moveEnemy();
      updateCanvas();
    }
    
    document.addEventListener('keydown', movePlayer);
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ') attack(); // Atacar con la barra espaciadora
    });
    
    setInterval(gameLoop, 1000 / 60); // 60 FPS
    
    }