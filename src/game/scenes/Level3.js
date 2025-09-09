import { Player } from '../../GameObject/Player';
import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Level3 extends Scene {
    constructor() {
        super('Level3');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x3cb371); 

        // Platforms 
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(150, 650, 'wall');
        this.platforms.create(500, 650, 'wall');
        this.platforms.create(850, 650, 'wall');
        this.platforms.create(325, 450, 'wall');
        this.platforms.create(700, 350, 'wall');
        this.platforms.create(500, 200, 'wall');

        // Hydrant 
        this.hydrant = this.physics.add.staticGroup();
        this.hydrantObj = this.hydrant.create(850, 600, 'hydrant').setScale(0.2).refreshBody();

        // Player 
        this.player = new Player(this, 100, 600);
        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();

        // Bones 
        this.bones = this.physics.add.staticGroup();
        this.bones.create(325, 400, 'bone').setScale(0.3).refreshBody();
        this.bones.create(700, 300, 'bone').setScale(0.3).refreshBody();
        this.bones.create(500, 150, 'bone').setScale(0.3).refreshBody();
        this.bones.create(850, 600, 'bone').setScale(0.3).refreshBody();

        this.physics.add.collider(this.bones, this.platforms);
        this.physics.add.collider(this.player, this.hydrant);
        this.physics.add.overlap(this.player, this.bones, this.collectBone, null, this);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#000'
        });

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.moveLeft();
        }
        else if (this.cursors.right.isDown) {
            this.player.moveRight();
        }
        else if (this.cursors.down.isDown) {
            this.player.moveDown();
        }
        else if (this.cursors.up.isDown) {
            this.player.moveUp();
        }
        else {
            this.player.idle;
        }

        // Hydrant removal 
        if (this.hydrantObj.active && Phaser.Math.Distance.Between(
            this.player.x, this.player.y, this.hydrantObj.x, this.hydrantObj.y
        ) < 100 && Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.hydrantObj.disableBody(true, true);
        }

        if (this.cursors.up.isDown) {
            this.player.jump();
        }
    }

    collectBone(player, bone) {
        bone.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.bones.countActive(true) === 0) {
            this.scene.start('YouWin');
        }
    }
}