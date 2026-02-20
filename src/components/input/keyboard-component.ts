import * as Phaser from "phaser";
import { InputComponent } from "./input-component";
import { createVirtualJoystick, VirtualJoystick } from "./virtual-joystick";

export class KeyboardComponent extends InputComponent {
  #cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  #attackKey: Phaser.Input.Keyboard.Key;
  #actionKey: Phaser.Input.Keyboard.Key;
  #enterKey: Phaser.Input.Keyboard.Key;
  #vjoy: VirtualJoystick | null = null;

  constructor(keyboardPlugin: Phaser.Input.Keyboard.KeyboardPlugin) {
    super();
    this.#cursorKeys = keyboardPlugin.createCursorKeys();
    this.#attackKey = keyboardPlugin.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.#actionKey = keyboardPlugin.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    this.#enterKey = keyboardPlugin.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.#vjoy = createVirtualJoystick(keyboardPlugin.scene);

    // z = B, Attack
    // x = A, Talk, Run, Lift/Throw, Push/Pull
    // shift = Select, Open Save Menu
    // return/enter = Start, Open Inventory
  }

  get #effectiveCursorKeys(): Phaser.Types.Input.Keyboard.CursorKeys {
    return this.#vjoy?.cursorKeys ?? this.#cursorKeys;
  }

  get isUpDown(): boolean {
    return this.#effectiveCursorKeys.up.isDown;
  }

  get isUpJustDown(): boolean {
    return Phaser.Input.Keyboard.JustDown(this.#effectiveCursorKeys.up);
  }

  get isDownDown(): boolean {
    return this.#effectiveCursorKeys.down.isDown;
  }

  get isDownJustDown(): boolean {
    return Phaser.Input.Keyboard.JustDown(this.#effectiveCursorKeys.down);
  }

  get isLeftDown(): boolean {
    return this.#effectiveCursorKeys.left.isDown;
  }

  get isRightDown(): boolean {
    return this.#effectiveCursorKeys.right.isDown;
  }

  get isActionKeyJustDown(): boolean {
    return Phaser.Input.Keyboard.JustDown(this.#actionKey);
  }

  get isAttackKeyJustDown(): boolean {
    return Phaser.Input.Keyboard.JustDown(this.#attackKey);
  }

  get isSelectKeyJustDown(): boolean {
    return Phaser.Input.Keyboard.JustDown(this.#effectiveCursorKeys.shift);
  }

  get isEnterKeyJustDown(): boolean {
    return Phaser.Input.Keyboard.JustDown(this.#enterKey);
  }
}
