function update () {

  player.body.velocity.x = 0;

  //move player left on button press
  if (left && player.body.velocity.x > -maxVelocity) {
    player.body.velocity.x -= 500;
  } 

  //move player right on button press
  if (right && player.body.velocity.x < maxVelocity) {
    player.body.velocity.x += 500;
  } 

  // Fire bomb if player is alive
  if (fireBullet.isDown && player.alive) {
    fireBullet();
  }

  // Handle aliens dropping bombs
  setTimeout(function () {
    handleBombs();
  }, 2000);

  game.physics.arcade.overlap(bullets, aliens, bulletHitsAlien, null, this);
  game.physics.arcade.overlap(bombs, player, bombHitsPlayer, null, this);
  game.physics.arcade.overlap(aliens, player, alienHitsPlayer, null, this);
  game.physics.arcade.overlap(aliens, gameBase, alienHitsBase, null, this);
}