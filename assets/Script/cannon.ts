// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BallClass from "./ball";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CannonClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    deg: number = 0;


    @property(cc.Node)
    head: cc.Node = null;

    @property
    firePower: number = 1;

    @property(cc.Prefab)
    ballPrefab: cc.Prefab = null;

    @property
    ballSpeed: number = 1;

    @property
    shootSpeed: number = 5; // times per second

    // LIFE-CYCLE CALLBACKS:

    get aX() {
        return this.node.anchorX * this.node.width;
    }

    get aY() {
        return this.node.anchorY * this.node.height;
    }

    get headXY() {
        return this.node.convertToWorldSpaceAR(new cc.Vec2(this.head.x, this.head.y));
    }

    onLoad() {
        this.ballSpeed = 3;
        this.shootSpeed = 10;
        this.fire()
    }

    shutOneBall() {
        let ball = cc.instantiate(this.ballPrefab);
        this.node.parent.addChild(ball);
        const { x, y } = this.headXY;
        ball.setPosition(x, y)
        let ballScript: BallClass = ball.getComponent("ball");
        ballScript.speed = this.ballSpeed;
        ballScript.angle = this.deg + 90
        ballScript.power = this.firePower;
    }

    fire() {
        this.schedule(this.shutOneBall, 1 / this.shootSpeed, cc.macro.REPEAT_FOREVER, 0)
    }

    stopFire() {
        this.unschedule(this.shutOneBall);
    }

    updateBallSpeed() {
        this.ballSpeed++;
    }

    updateShootSpeed() {

    }

    updatePower() {
        this.firePower++;
    }


    rotate(deg) {
        if (deg > 89) {
            deg = 89;
        }
        if (deg < -89) {
            deg = -89;
        }
        this.node.angle = -deg;
        this.deg = -deg;
    }

    start() {

    }

    // update (dt) {}
}
