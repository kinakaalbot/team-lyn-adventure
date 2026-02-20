import * as Phaser from "phaser";
// Import rex virtual joystick plugin in a way that works with bundlers
import VirtualJoystickPlugin from "phaser3-rex-plugins/plugins/virtualjoystick-plugin";
import { SCENE_KEYS } from "./scenes/scene-keys";
import { PreloadScene } from "./scenes/preload-scene";
import { GameScene } from "./scenes/game-scene";
import { UiScene } from "./scenes/ui-scene";
import { GameOverScene } from "./scenes/game-over-scene";

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, // Use AUTO to fallback to Canvas if WebGL fails (iOS Safari)
  pixelArt: true,
  roundPixels: true,
  scale: {
    parent: "game-container",
    width: 256,
    height: 224,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
  },
  backgroundColor: "#000000",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: false,
    },
  },
  plugins: {
    global: [
      {
        key: "rexVirtualJoystick",
        plugin: VirtualJoystickPlugin,
        start: true,
      },
    ],
  },
};

const game = new Phaser.Game(gameConfig);

game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
game.scene.add(SCENE_KEYS.GAME_SCENE, GameScene);
game.scene.add(SCENE_KEYS.UI_SCENE, UiScene);
game.scene.add(SCENE_KEYS.GAME_OVER_SCENE, GameOverScene);
game.scene.start(SCENE_KEYS.PRELOAD_SCENE);
