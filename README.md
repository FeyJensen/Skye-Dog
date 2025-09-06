# Skye Dog

Skye Dog is a platformer game built with Phaser 3 and React, bundled using Vite. Help Skye collect bones, jump on platforms, and reach victory!


## How to Play

- Use the arrow keys to move Skye left, right, and jump.
- Collect all the bones to win the game!
- Land on platforms to avoid falling.

## Getting Started

**Requirements:**  
- [Node.js](https://nodejs.org) installed

**Setup:**
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to play.

## Project Structure

| Path                          | Description                                  |
|-------------------------------|----------------------------------------------|
| `index.html`                  | Main HTML file                               |
| `src/App.jsx`                 | Main React component                         |
| `src/PhaserGame.jsx`          | React component that runs the Phaser game    |
| `src/game/scenes/`            | Phaser scenes (MainMenu, Game, YouWin, etc.) |
| `src/game/GameObject/Player.js`| Skye player class                            |
| `public/assets`               | Game images and spritesheets                 |
| `public/style.css`            | Basic CSS                                    |

## Scenes

- **MainMenu:** Start the game.
- **Game:** Play as Skye, collect bones, and jump on platforms.
- **YouWin:** Celebrate your victory!

## Customization

You can add new levels, change assets, or tweak gameplay by editing the files in `src/game/scenes` and `public/assets`.

## Credits

Created by Fey Jensen.  
Powered by Phaser 3, React, and Vite.

## Community & Help

- [Phaser Documentation](https://newdocs.phaser.io)
- [Phaser Discord](https://discord.gg/phaser)
- [React Documentation](https://react.dev)

Enjoy playing Skye Dog!

