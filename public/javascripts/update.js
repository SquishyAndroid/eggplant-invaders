function update () {

  //move player left on button press
  if (left && player.body.velocity.x > -maxVelocity) {
    player.body.velocity.x -= 20;
  } else {
    //slow down
    if (player.body.velocity.x > 0){
      player.body.velocity.x -= 4;
    }

  }

  //move player right on button press
  if (right && player.body.velocity.x < maxVelocity) {
    player.body.velocity.x += 20;
  } else {
    //slow down
    if (player.body.velocity.x < 0){
      player.body.velocity.x += 4;
    }
  }

  // Firing?
  if (fireBullet.isDown && player.alive) {
    fireBullet();
  }

  // // Restart?
  // if (restartButton.isDown && lives == 0) {
  //   restartGame();
  // }

  // Handle aliens dropping bombs
  handleBombs();

  game.physics.arcade.overlap(bullets, aliens, bulletHitsAlien, null, this);
  game.physics.arcade.overlap(bombs, player, bombHitsPlayer, null, this);
}

if (cursors.left.isDown && player.body.velocity.x > -maxVelocity) {
    // Move to the left
    player.body.velocity.x -= 20;
  }
  else if (cursors.right.isDown && player.body.velocity.x < maxVelocity) {
    // Move to the right
    player.body.velocity.x += 20;
  }
  else {
    // Slow down
    if (player.body.velocity.x > 0) {
      player.body.velocity.x -= 4;
    }
    else if (player.body.velocity.x < 0) {
      player.body.velocity.x += 4;
    }
  }