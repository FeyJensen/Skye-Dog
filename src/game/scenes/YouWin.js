import { Scene } from 'phaser';

export class YouWin extends Scene {
    constructor() {
        super('YouWin');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x87ceeb);

        this.add.text(512, 300, 'You Win!', {
            fontFamily: 'Arial Black',
            fontSize: 64,
            color: '#fff',
            stroke: '#000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 400, 'Congratulations!', {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#fff',
            align: 'center'
        }).setOrigin(0.5);

        const restartButton = this.add.text(512, 500, 'Restart', {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#ff0',
            backgroundColor: '#000'
        }).setOrigin(0.5).setInteractive();

        restartButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}