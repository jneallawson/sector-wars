import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';

export class Game {
    private app: PIXI.Application;
    private viewport!: Viewport;
    private readonly WORLD_SIZE = 100000; // 100,000 meters

    constructor() {
        // Create the PIXI application
        this.app = new PIXI.Application();
        this.initialize();
    }

    async initialize() {
        // Initialize the PIXI application
        await this.app.init({
            background: '#000000',
            width: window.innerWidth,
            height: window.innerHeight,
            antialias: true,
        });

        // Add canvas to the document and ensure it fills the window
        document.body.appendChild(this.app.canvas);
        this.app.renderer.resize(window.innerWidth, window.innerHeight);

        // Initialize viewport
        this.viewport = new Viewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth: this.WORLD_SIZE,
            worldHeight: this.WORLD_SIZE,
            events: this.app.renderer.events,
        });

        // Add viewport to stage and fit it to screen
        this.app.stage.addChild(this.viewport);
        this.viewport.fit();
        this.viewport.moveCenter(this.WORLD_SIZE/2, this.WORLD_SIZE/2);

        // Activate viewport plugins
        this.viewport
            .drag()
            .pinch()
            .wheel()
            .decelerate()
            .clamp({ direction: 'all' })
            .clampZoom({
                minScale: 0.1,  // Can zoom out to see 10x more
                maxScale: 10    // Can zoom in 10x
            });

        // Handle window resize
        window.addEventListener('resize', this.onResize.bind(this));
        
        // Handle fullscreen changes
        document.addEventListener('fullscreenchange', this.onResize.bind(this));
    }

    private onResize(): void {
        // Update renderer and viewport dimensions
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.viewport.resize(window.innerWidth, window.innerHeight);
        this.viewport.fit();
    }

    // Method to toggle fullscreen
    public toggleFullscreen(): void {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
}
