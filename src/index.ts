import { Game } from './Game';

// Add basic CSS to ensure full viewport usage
const style = document.createElement('style');
style.textContent = `
    * {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    body {
        width: 100vw;
        height: 100vh;
    }
`;
document.head.appendChild(style);

// Initialize game
const game = new Game();
game.initialize().catch(console.error);

// Add fullscreen toggle on 'F' key press
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'f') {
        game.toggleFullscreen();
    }
});
