var game = new Phaser.Game(800, 1400, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

var bulletTime = 0,
    initialPlayerPosition = 512;
    lives = 1,
    score = 0,
    highScore = 0;
    maxVelocity = 500;
    left = false;
    right = false;
    bombSpeed = 0;

var style = { font: "32px silkscreen", fill: "#666666", align: "center" },
    boldStyle = { font: "bold 32px silkscreen", fill: "#ffffff", align: "center" };

function setupExplosion (explosion) {
  explosion.animations.add('explode');
}

function fireBullet () {
  if (lives > 0 && player.alive) {
    if (game.time.now > bulletTime) {
      bullet = bullets.getFirstExists(false);

      if (bullet) {
        // And fire it
        shootSound.play();
        bullet.reset(player.x, player.y - 16);
        bullet.body.velocity.y = -400;
        bullet.body.velocity.x = player.body.velocity.x / 4
        bulletTime = game.time.now + 400;
      }
    }
  }
}

function bulletHitsAlien (bullet, alien) {
  bullet.kill();
  explode(alien);
  score += 10;
  updateScore();

  if (aliens.countLiving() == 0) {
    newWave();
    bombSpeed += 10;
    handleBombs(bombSpeed);
    alert(bombSpeed);
  }
}

function bombHitsPlayer (bomb, player) {
  bomb.kill();
  explode(player);
  lives -= 1;
  updateLivesText();
  if (lives > 0) {
    respawnPlayer();
  }
  else {
    gameOver();
  }
}

function explode (entity) {
  entity.kill();

  // And create an explosion :)
  explodeSound.play();
  var explosion = explosions.getFirstExists(false);
  explosion.reset(entity.body.x + (entity.width / 2), entity.body.y + (entity.height / 2));
  explosion.play('explode', 30, false, true);
}

function updateLivesText () {
  livesText.text = "LIVES: " + lives;
}

function getHighScore () {
  savedHighScore = Cookies.get('highScore');
  if (savedHighScore != undefined) {
    highScore = savedHighScore;
  }
}

function updateScore () {
  if (score > highScore) {
    highScore = score;
  }
  scoreText.text = pad(score, 6);
  highScoreText.text = "HIGH: " + pad(highScore, 6);
}

function respawnPlayer () {
  player.body.x = initialPlayerPosition;
  setTimeout(function () {
    player.revive();
  }, 1000);
}

function newWave () {
  setTimeout(function () {
    aliens.removeAll();
    createAliens();
    animateAliens();
  }, 1000);
}

function restartGame () {
  gameOverText.destroy();
  yourScoreText.destroy();
  restartButton.destroy();

  lives = 1
  score = 0
  updateScore();
  updateLivesText();

  respawnPlayer();
  newWave();
}

function gameOver () {
  setTimeout(function() {
    gameOverText = game.add.text(game.world.centerX, game.world.centerY, "YOU'RE PREGNANT. GAME OVER.", boldStyle);
    gameOverText.anchor.set(0.5, 0.5);

    yourScoreText = game.add.text(game.world.centerX, game.world.centerY + 100, "YOU SCORED " + score + " POINTS!", boldStyle);
    yourScoreText.anchor.set(0.5, 0.5);

    restartButton = game.add.button(game.world.centerX - 160, game.world.centerY + 160, 'restartButton', restartGame);
    restartButton.scale.setTo(2.5,2.5);

    Cookies.set('highScore', highScore, { expires: '2078-12-31' });
  }, 1000);
}

function createAliens () {
  aliens = game.add.group();
  aliens.scale.setTo(2.5,2.5);
  aliens.enableBody = true;
  aliens.physicsBodyType = Phaser.Physics.ARCADE;

  //adjust # of rows and columns of aliens
  for (var y = 0; y < 4; y++) {
    for (var x = 0; x < 6; x++) {
      var alien = aliens.create(x * 40, y * 48, 'alien');
      alien.anchor.setTo(0.5, 0.5);
      alien.body.moves = false;
    }
  }
  //position of aliens on game screen
  aliens.x = 200;
  aliens.y = 180;

  aliens.forEach(function (alien, i) {
    //alien bodies wobble { y: alien.body.y + how far down}, speed, ...
    game.add.tween(alien).to( { y: alien.body.y + 5 }, 500, Phaser.Easing.Sinusoidal.InOut, true, game.rnd.integerInRange(0, 500), 1000, true);
  })
}

function animateAliens () {
  // All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
  // { x: how far left and right aliens move}, speed, ...
  var tween = game.add.tween(aliens).to( { x: 100 }, 2500, Phaser.Easing.Sinusoidal.InOut, true, 0, 1000, true);

  // When the tween loops it calls descend
  tween.onLoop.add(descend, this);
}

function handleBombs (bombSpeed) {
  aliens.forEachAlive(function (alien) {
    chanceOfDroppingBomb = game.rnd.integerInRange(0, (40 - bombSpeed) * aliens.countLiving());
    if (chanceOfDroppingBomb == 0) {
      dropBomb(alien);
    }
  }, this)
}

function dropBomb (alien) {
  bomb = bombs.getFirstExists(false);

  if (bomb && player.alive) {

    bombSound.play();
    // And drop it
    bomb.reset(alien.x + aliens.x, alien.y + aliens.y + 16);
    bomb.body.velocity.y = +100;
    bomb.body.gravity.y = 250
  }
}

//descend aliens
function descend () {
  if (player.alive) {
    //speed of descension 
    aliens.y += 8;
    game.add.tween(aliens).to( { y: aliens.y + 8 }, 2500, Phaser.Easing.Linear.None, true, 0, 0, false);
  }
}

function pad(number, length) {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}
