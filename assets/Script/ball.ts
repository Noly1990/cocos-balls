// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class BallClass extends cc.Component {

    @property
    speed: number = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    @property
    speedX: number = 1;

    @property
    speedY: number = 1;

    @property
    top: number = 960;


    @property
    left: number = 0;

    @property
    right: number = 480;

    @property
    angle: number = 90;

    @property
    power: number = 1;

    @property
    needReflect: boolean = true;

    onLoad() {
        this.left = 0 + this.node.width / 2;
        this.right = this.node.parent.width - this.node.width / 2;
        this.top = this.node.parent.height - this.node.width / 2;
        this.node.group = "ball";

        this.needReflect = true;
    }

    removeSelf() {
        if (this.node.parent) {
            this.node.parent.removeChild(this.node, true);
            this.destroy();
        }

    }

    update(dt) {
        const { x, y } = this.node.position;

        if (this.needReflect) {
            if (x < this.left) {
                this.speedX = -this.speedX;
            }
            if (x > this.right) {
                this.speedX = -this.speedX;
            }
            if (y > this.top) {
                this.speedY = -this.speedY;
            }
            if (y < 0) {
                this.removeSelf()
            }
        } else {
            if (x < this.left || x > this.right || y > this.top || y < 0) {
                this.removeSelf()
            }
        }

        this.node.setPosition(new cc.Vec2(
            x + this.speed * this.speedX * Math.cos(this.angle / 180 * Math.PI) * this.speed,
            y + this.speed * this.speedY * Math.sin(this.angle / 180 * Math.PI) * this.speed,
        ))
    }
}
