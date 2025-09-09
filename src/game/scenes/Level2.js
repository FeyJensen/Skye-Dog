import { Player } from '../../GameObject/Player';
import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Level2 extends Scene {
    constructor() {
        super('Level2');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x3cb371);

        this.platforms = this.physics.add.staticGroup();
        // Add different platforms for level 2
        this.platforms.create(200, 600, 'wall');
        this.platforms.create(800, 600, 'wall');
        this.platforms.create(200, 300, 'wall');
        this.platforms.create(800, 300, 'wall');
        this.platforms.create(200, 100, 'wall');

        this.hydrant = this.physics.add.staticGroup();
        this.hydrantObj = this.hydrant.create(200, 200, 'hydrant').setScale(0.2).refreshBody();


        this.player = new Player(this, 100, 200);
        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();

        // bones for level 2
        this.bones = this.physics.add.staticGroup();
        this.bones.create(350, 500, 'bone').setScale(0.3).refreshBody();
        this.bones.create(800, 450, 'bone').setScale(0.3).refreshBody();
        this.bones.create(600, 350, 'bone').setScale(0.3).refreshBody();

        this.physics.add.collider(this.bones, this.platforms);
        this.physics.add.collider(this.player, this.hydrant);
        this.physics.add.overlap(this.player, this.bones, this.collectBone, null, this);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff'
        });



        EventBus.emit('current-scene-ready', this);
    }

    update() {
        // Same as your Game scene
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
            this.player.idle
        }

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
            this.scene.start('Level3');
        }
    }
}