import Profile from './profile.js';

/**
 * Represent the home screen of the game.
 *
 * @export
 * @class LevelScene
 * @extends {Phaser.Scene}
 */
export default class LevelScene extends Phaser.Scene {
  /**
   * Creates an instance of LevelScene.
   * @memberof LevelScene
   */
  constructor() {
    super('LevelScene');
  }

  /**
   * Creates the content of the LevelScene.
   *
   * @param {*} data
   * @memberof LevelScene
   */
  create(data) {
    this.level = data.level;
    this.scene.get('MusicScene').play(1);
    this.scene.run('PauseScene', data);
    this.scene.pause();
    this.map = this.make.tilemap({
      key: 'level' + data.level,
    });
    const tileset = this.map.addTilesetImage('tileset', 'tileset');
    this.map.createStaticLayer('bg', tileset, 0, 0);
    this.fg = this.map.createDynamicLayer('fg', tileset, 0, 0);
    this.fg.setCollisionBetween(0, 200);
    this.fg.setCollision(92, false);
    this.fg.setCollision(94, false);
    this.fg.setCollision(140, false);
    this.fg.setCollision(152, false);
    const start = this.fg.findByIndex(152);
    this.hero = this.physics.add.sprite(
        start.getCenterX(),
        start.getCenterY() - 4,
        'sprites',
        'heroidle1',
    );
    this.hero.speed = 200;
    this.hero.setDrag(2000, 0);
    this.hero.setMaxVelocity(200, 500);
    this.hero.setSize(12, 16);
    this.hero.setOffset(2, 8);
    this.anims.create({
      key: 'idle',
      frames: [
        {key: 'sprites', frame: 'heroidle1'},
        {key: 'sprites', frame: 'heroidle2'},
        {key: 'sprites', frame: 'heroidle3'},
        {key: 'sprites', frame: 'heroidle4'},
      ],
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'run',
      frames: [
        {key: 'sprites', frame: 'herorun1'},
        {key: 'sprites', frame: 'herorun2'},
        {key: 'sprites', frame: 'herorun3'},
        {key: 'sprites', frame: 'herorun4'},
      ],
      frameRate: 8,
      repeat: -1,
    });
    this.physics.add.collider(this.hero, this.fg);
    this.pasted = this.add.image(0, 0, 'tiles');
    this.pasted.visible = false;
    this.pasting = false;
    this.marker = this.add.graphics();
    this.marker.lineStyle(1, 0xffffff, 1);
    this.marker.strokeRect(0, 0, 16, 16);
    this.selection = this.add.graphics();
    this.selection.lineStyle(2, 0xffffff, 1);
    this.selection.strokeRect(0, 0, 16, 16);
    this.selection.visible = false;
    this.keys =
      this.input.keyboard.addKeys('W,A,S,D,UP,LEFT,DOWN,RIGHT,SPACE,ENTER,C,V,CTRL,O,P,F');
    this.input.keyboard.on('keydown', (event) => {
      event.preventDefault();
    });
    this.input.keyboard.on('keydown-ENTER', (event) => {
      event.preventDefault();
    });
    this.input.keyboard.on('keydown-SPACE', (event) => {
      event.preventDefault();
    });
    this.cameras.main.setBounds(
        0, 0, this.fg.x + this.fg.width, this.fg.y + this.fg.height,
    );
    this.ctrls = data.level + 2;
    this.outofctrllabel = this.add.text(512, 40, 'Out of Control!', {
      fontSize: '32px',
      fontFamily: 'font',
      align: 'center',
      lineSpacing: 24,
    });
    this.outofctrllabel.visible = false;
    this.outofctrllabel.setOrigin(0.5);
    this.ctrllabel = this.add.text(8, 8, this.ctrls);
    this.ctrllabel.setOrigin(0.5);
    this.ctrllabel.visible = false;
    this.input.keyboard.on('keydown-F', () => {
      this.scene.restart({
        level: this.level,
        first: true,
      });
    });
    this.input.keyboard.on('keydown-C', () => {
      if (this.keys.CTRL.isDown && this.ctrls) {
        this.copied = this.selected;
        this.ctrls -= 1;
        this.ctrllabel.text = this.ctrls;
      }
    });
    this.input.keyboard.on('keydown-V', () => {
      if (this.keys.CTRL.isDown && this.ctrls && this.copied) {
        this.pasted.setFrame(this.copied - 1);
        this.pasting = true;
        this.ctrls -= 1;
        this.ctrllabel.text = this.ctrls;
      }
    });
  }

  /**
   *
   *
   * @memberof LevelScene
   */
  update() {
    if (!this.hero.body) {
      return;
    }
    const acceleration = this.hero.body.blocked.down ? 600 : 200;
    if (this.keys.A.isDown) {
      this.hero.setAccelerationX(-acceleration);
      this.hero.setFlipX(true);
    } else if (this.keys.D.isDown) {
      this.hero.setAccelerationX(acceleration);
      this.hero.setFlipX(false);
    } else {
      this.hero.setAccelerationX(0);
    }
    if (this.hero.body.blocked.down && this.keys.SPACE.isDown) {
      this.hero.setVelocityY(-500);
    }
    if (this.hero.body.velocity.x) {
      this.hero.anims.play('run', true);
    } else {
      this.hero.anims.play('idle', true);
    }
    const pointer = this.input.activePointer;
    const worldPoint = pointer.positionToCamera(this.cameras.main);
    const heroTileXY = this.fg.worldToTileXY(this.hero.x, this.hero.y);
    const end = this.fg.getTileAt(heroTileXY.x, heroTileXY.y);
    if (end && end.index === 140) {
      if (this.level < 5) {
        this.scene.restart({
          level: this.level + 1,
          first: true,
        });
      } else {
        this.scene.stop();
        this.scene.start('WinScene');
      }
    }
    const pointerTileXY = this.fg.worldToTileXY(worldPoint.x, worldPoint.y);
    const snappedWorldPoint = this.fg.tileToWorldXY(
        pointerTileXY.x, pointerTileXY.y,
    );
    if (this.ctrls) {
      this.ctrllabel.text = this.ctrls;
    } else {
      this.outofctrllabel.visible = true;
    }
    this.marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
    const tile = this.fg.getTileAt(pointerTileXY.x, pointerTileXY.y);
    if (tile) {
      this.marker.visible = true;
      this.pasted.visible = false;
      if (pointer.isDown) {
        this.selection.visible = true;
        this.selection.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
        this.selected = tile.index;
        this.ctrllabel.setPosition(snappedWorldPoint.x + 8, snappedWorldPoint.y + 8);
        this.ctrllabel.visible = true;
      }
    } else {
      this.marker.visible = false;
      if (this.pasting) {
        this.pasted.visible = true;
        this.pasted.setPosition(snappedWorldPoint.x + 8, snappedWorldPoint.y + 8);
        if (pointer.isDown) {
          const newtile = this.fg.putTileAtWorldXY(this.copied, worldPoint.x, worldPoint.y);
          newtile.setCollision(true);
          this.pasting = false;
          this.pasted.visible = false;
        }
      }
    }
    if (this.level === 5 && !this.endadded) {
      // console.log('ja');
      const left = this.fg.getTileAt(60, 34);
      const mid = this.fg.getTileAt(61, 34);
      const right = this.fg.getTileAt(62, 34);
      // if (left) console.log(left.index);
      // if (mid) console.log(mid.index);
      // if (right) console.log(right.index);
      if (left && left.index === 104 &&
        mid && mid.index === 105 &&
        right && right.index === 106) {
        this.fg.putTileAt(140, 61, 33);
        this.endadded = true;
      }
    }
  }
}
