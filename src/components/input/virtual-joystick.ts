import * as Phaser from "phaser";

export type VirtualJoystick = {
  joystick: any;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  destroy: () => void;
};

export function createVirtualJoystick(scene: Phaser.Scene): VirtualJoystick | null {
  const hasTouch = scene.sys.game.device.input.touch;
  if (!hasTouch) return null;

  const anyScene = scene as any;
  const plugin = anyScene.rexVirtualJoystickPlugin;
  if (!plugin || typeof plugin.add !== "function") return null;

  const joystick = plugin.add({
    x: 120,
    y: scene.scale.height - 120,
    radius: 60,
    base: scene.add.circle(0, 0, 60, 0x000000, 0.25).setScrollFactor(0),
    thumb: scene.add.circle(0, 0, 30, 0xffffff, 0.35).setScrollFactor(0),
    dir: "8dir",
    fixed: true,
    enable: true,
  });

  const cursorKeys = joystick.createCursorKeys();

  joystick.base?.setDepth?.(10_000);
  joystick.thumb?.setDepth?.(10_001);

  return {
    joystick,
    cursorKeys,
    destroy: () => joystick.destroy?.(),
  };
}
