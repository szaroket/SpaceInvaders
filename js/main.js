// JavaScript source code for Space Invaders Game

var game = new Phaser.Game(500, 400, Phaser.AUTO, null, {
    preload: preload,
    create: create,
    update: update
});

var ship;
var bulletInfo = false;
var bulletTime = 0;

function preload() {
    //scale object
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = 'black';

    //load image of the ship
    game.load.image('ship', 'img/ship2.png');

    //load image of bullet
    game.load.image('bullet', 'img/bullet.png');

}

function create() {
    //initialize the Arcade Physics engine
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //create the ship
    ship = game.add.sprite(game.world.width * 0.5, game.world.height - 40, 'ship');
    ship.anchor.set(0.5);
    game.physics.enable(ship, Phaser.Physics.ARCADE);
    ship.body.collideWorldBounds = true;

    //bullet group
    bullet = game.add.group();
    bullet.enableBody = true;
    bullet.physicsBodyType = Phaser.Physics.ARCADE;
    bullet.createMultiple(30, 'bullet');
    bullet.setAll('anchor.x', 0.5);
    bullet.setAll('anchor.y', 1);
    bullet.setAll('outOfBoundsKill', true);
    bullet.setAll('checkWorldBounds', true);
}

function update() {
    cursors = game.input.keyboard.addKeys({
        'shot': Phaser.Keyboard.SPACEBAR,
        'left': Phaser.Keyboard.LEFT,
        'right': Phaser.Keyboard.RIGHT
    });
    if (cursors.left.isDown) {
        ship.body.velocity.x = -150;
    }
    else if (cursors.right.isDown) {
        ship.body.velocity.x = 150;
    }
    else if (cursors.shot.isDown) {
        bulletInfo = true;
        shootBullet();
    }
    else {
        ship.body.velocity.x = 0;
    }
}

function shootBullet() {
    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime) {
        //  Grab the first bullet we can from the pool
       bullets = bullet.getFirstExists(false);

        if (bullets) {
            //  And fire it
            bullets.reset(ship.x, ship.y + 8);
            bullets.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }
}