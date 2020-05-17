// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BallClass from "./ball";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlaneClass extends cc.Component {

    @property
    speed: number = 0;

    @property
    life: number = 0;

    @property
    alive: boolean = true;

    @property
    score: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.group = "plane";
        this.life = 1;
        this.speed = 1;
        this.score = 5;
        this.alive = true;
    }


    onCollisionEnter(other: cc.Collider, self) {
        const ballScript: BallClass = other.node.getComponent("ball");
        const { power } = ballScript;
        if (this.alive) {
            this.life = this.life - power;
            ballScript.removeSelf();
        }

        if (this.life === 0) {
            this.alive = false;
            if (this.node.parent) {
                this.node.parent.getComponent("cannonbk").addScore(this.score);
            }
            this.removeSelf();
        }

    }

    removeSelf() {
        if (this.node.parent) {
            this.node.parent.removeChild(this.node, true);
            this.destroy()
        }
    }

    update(dt) {
        let { x, y } = this.node.position;
        if (y < 0) {
            this.removeSelf();
            return
        }
        this.node.setPosition(x, y - this.speed)
    }
}
