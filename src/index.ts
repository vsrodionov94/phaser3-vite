import Phaser from "phaser";
import picture from './assets/image.jpg';

class Example extends Phaser.Scene {
    angle = 0;
    text!: Phaser.GameObjects.Text;
    point2!: Phaser.Math.Vector2;
    point!: Phaser.Math.Vector2;
    graphics!: Phaser.GameObjects.Graphics;

    preload() {
        this.load.image('picture', picture);
    }

    create ()
    {
        this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x2266aa } });

        this.point = new Phaser.Math.Vector2(250, 0);
        this.point2 = new Phaser.Math.Vector2(250, 0);

        this.text = this.add.text(30, 30, '');

        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) =>
        {
            this.point2.copy(pointer);

            this.point2.x -= 400;
            this.point2.y -= 300;
        });

        this.add.sprite(400, 300, 'picture').setScale(0.3);
    }

    update ()
    {
        this.graphics.clear();

        this.angle += 0.005;

        // vector starting at 0/0
        this.point.setTo(Math.cos(this.angle) * 250, Math.sin(this.angle) * 250);

        // drawn from the center (as if center was 0/0)
        this.graphics.lineBetween(400, 300, 400 + this.point.x, 300 + this.point.y);

        this.graphics.lineStyle(2, 0x00aa00);
        this.graphics.lineBetween(400, 300, 400 + this.point2.x, 300 + this.point2.y);

        const cross = this.point.cross(this.point2);

        const area = this.point.length() * this.point2.length();

        const angleBetween = Math.asin(cross / area);

        this.text.setText([
            `Cross product: ${cross}`,
            `Normalized cross product: ${cross / area}`,
            `Sinus of the angle between vectors: ${Phaser.Math.RadToDeg(angleBetween)}`,
            `Green vector is on the ${cross > 0 ? 'right' : 'left'}`
        ].join('\n'));
    }
}

const config = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
