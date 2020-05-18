// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    @property
    speedX: number = 0;

    @property
    speedY: number = 0;

    @property
    rotateSpeed: number = 0;

    @property
    opacitySpeed: number = 0;

    getRandomRange(x, y) {
        return Math.floor(Math.random() * y )+ x;
    }

    getRandomXY() {
        return 3 - 6 * Math.random();
    }

    onLoad() {
        this.node.color = new cc.Color(this.getRandomRange(0, 255), this.getRandomRange(0, 255), this.getRandomRange(0, 255));
        const randomW = this.getRandomRange(5, 12);
        this.node.width = randomW;
        this.node.height = randomW;
        
        this.speedX = this.getRandomXY();
        this.speedY = this.getRandomXY();
        this.opacitySpeed = 5;
        this.rotateSpeed = this.getRandomRange(1, 20);
    }

    fadeOut() {

    }

    rotateOut() {

    }

    start() {

    }


    removeSelf() {
        if (this.node.parent) {
            this.node.parent.removeChild(this.node , true);
            this.destroy()
        }
    }

    update(dt) {
        this.node.opacity -= this.opacitySpeed;
        this.node.angle += this.rotateSpeed;

        let { x, y } = this.node.position;

        this.node.setPosition(x + this.speedX, y + this.speedY)

        if (this.node.opacity < 25) {
            this.node.active = false;
            this.removeSelf()
        }
    }
}
