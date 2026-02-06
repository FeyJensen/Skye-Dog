import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';
import { YouWin } from './scenes/YouWin';
import { Level2 } from './scenes/Level2';
import { Level3 } from './scenes/Level3';
import { Level4 } from './scenes/Level4';
import { Level5 } from './scenes/Level5';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 700,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver,
        YouWin,
        Level2,
        Level3,
        Level4,
        Level5
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, 
            debug: false // Set to true to see physics bodies
        }
    },
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;
