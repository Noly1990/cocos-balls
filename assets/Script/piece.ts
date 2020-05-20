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


    @property
    type: string = "back";

    getRandomRange(x, y) {
        return Math.floor(Math.random() * y) + x;
    }

    getRandomX() {
        return 3 - 6 * Math.random();
    }

    getRandomY() {
        return 3 - 9 * Math.random()
    }

    onLoad() {
        
    }

    init(type: string) {
        this.type = type;
        this.node.color = new cc.Color(this.getRandomRange(0, 255), this.getRandomRange(0, 255), this.getRandomRange(0, 255));

        if (type === 'back') {
            const randomW = this.getRandomRange(10, 22);
            this.node.width = randomW;
            this.node.height = randomW;
            this.opacitySpeed = 2;
            this.speedX = this.getRandomX() / 6;
            this.speedY = 0.2;
            this.rotateSpeed = 0;
        } else {
            const randomW = this.getRandomRange(4, 15);
            this.node.width = randomW;
            this.node.height = randomW;
            this.speedX = this.getRandomX();
            this.speedY = this.getRandomY();
            this.opacitySpeed = 5;
            this.rotateSpeed = this.getRandomRange(-20, 40);
        }
    }

    removeSelf() {
        if (this.node.parent) {
            this.node.parent.removeChild(this.node, true);
            this.destroy()
        }
    }

    update(dt) {
        if (this.type === "back" && this.node.width > 0.5) {
            this.node.width -=0.05;
            this.node.height -=0.05;
        }
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
