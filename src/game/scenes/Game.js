import { Player } from '../../GameObject/Player';
import { Scene } from 'phaser';
import { EventBus } from '../EventBus';


export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x3cb371);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(200, 660, 'wall');
        this.platforms.create(600, 660, 'wall'); // Ground
        this.platforms.create(1000, 660, 'wall');
        this.platforms.create(500, 330, 'wall'); // Platform


        this.player = new Player(this, 350, 265); 
        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();

        // bones
        this.bones = this.physics.add.staticGroup();
        this.bones.create(350, 600, 'bone').setScale(0.3).refreshBody();
        this.bones.create(500, 200, 'bone').setScale(0.3).refreshBody();
        this.bones.create(800, 500, 'bone').setScale(0.3).refreshBody();
        
        this.physics.add.collider(this.bones, this.platforms);
        this.physics.add.overlap(this.player, this.bones, this.collectBone, null, this);    
        
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff'
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
            this.player.idle
        }

        if (this.cursors.up.isDown) {
            this.player.jump();
        }

    }

    changeScene() {
        this.scene.start('GameOver');
    }


    collectBone(player, bone) {
        bone.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

       if (this.bones.countActive(true) === 0) {
        this.scene.start('Level2');
    }
    }
}
