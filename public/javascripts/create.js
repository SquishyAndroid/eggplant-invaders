function create () {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  //autoalign the game stage
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.scale.setScreenSize(true);

  // Initialize player
  player = game.add.sprite(initialPlayerPosition, 940, 'ship');
  player.scale.setTo(0.16,0.16);
  player.anchor.setTo(0.5, 0.5);
  game.physics.enable(player, Phaser.Physics.ARCADE);

  player.body.bounce.x = 0.5;
  player.body.collideWorldBounds = true;

  // Initialize bullets
  bullets = game.add.group();
  // bullets.scale.setTo(0.1,0.1);
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(5, 'bullet');
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 1);
  bullets.setAll('checkWorldBounds', true);
  bullets.setAll('outOfBoundsKill', true);

  // Initialize aliens
  createAliens();
  animateAliens();

  // Initialize bombs
  bombs = game.add.group();
  bombs.scale.setTo(1.4,1.4);
  bombs.enableBody = true;
  bombs.physicsBodyType = Phaser.Physics.ARCADE;
  bombs.createMultiple(10, 'bomb');
  bombs.setAll('anchor.x', 0.5);
  bombs.setAll('anchor.y', 0.5);
  bombs.setAll('checkWorldBounds', true);
  bombs.setAll('outOfBoundsKill', true);
  bombs.forEach(setupBomb, this);

  // Initialize explosions
  explosions = game.add.group();
  explosions.createMultiple(10, 'explosion');
  explosions.setAll('anchor.x', 0.5);
  explosions.setAll('anchor.y', 0.5);
  explosions.forEach(setupExplosion, this);

  // Text bits
  livesText = game.add.text(game.world.bounds.width - 16, 16, "LIVES: " + lives, style);
  livesText.anchor.set(1, 0);

  scoreText = game.add.text(game.world.centerX, 16, '', style);
  scoreText.anchor.set(0.5, 0);

  highScoreText = game.add.text(16, 16, '', style);
  highScoreText.anchor.set(0, 0);

  getHighScore();
  updateScore();

  // Initialize sounds
  shootSound = game.add.audio('shoot', 1, false);
  explodeSound = game.add.audio('explode', 1, false);
  bombSound = game.add.audio('bomb', 1, false);

  // Add gamebase 
  gameBase = game.add.sprite(game.world.centerX, 960,'gameBase');
  gameBase.anchor.setTo(0.5, 0.5);
  gameBase.enableBody = true;
  game.physics.enable(gameBase, Phaser.Physics.ARCADE);

  // startButton = game.add.button(game.world.centerX - 95, 400, 'startButton', actionOnClick, this, 'down');
  fireButton = game.add.button(game.world.centerX - 350, 1050, 'fireButton', fireBullet);
  fireButton.scale.setTo(2.5,2.5);

  moveLeftButton = game.add.button(game.world.centerX - 30, 1050, 'moveLeftButton', null, this, 0,1,0,1);
  moveLeftButton.scale.setTo(2.4,2.4);
  moveLeftButton.events.onInputOver.add(function(){left=true;});
  moveLeftButton.events.onInputOut.add(function(){left=false;});
  moveLeftButton.events.onInputDown.add(function(){left=true;});
  moveLeftButton.events.onInputUp.add(function(){left=false;});

  moveRightButton = game.add.button(game.world.centerX + 180, 1050, 'moveRightButton', null, this, 0,1,0,1);
  moveRightButton.scale.setTo(2.5,2.5);
  moveRightButton.events.onInputOver.add(function(){right=true;});
  moveRightButton.events.onInputOut.add(function(){right=false;});
  moveRightButton.events.onInputDown.add(function(){right=true;});
  moveRightButton.events.onInputUp.add(function(){right=false;});

}

