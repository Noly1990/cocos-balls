// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BallClass from "./ball";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CubeClass extends cc.Component {

    @property(cc.Label)
    lifeLable: cc.Label = null;


    @property(cc.Prefab)
    piecePrefab: cc.Prefab = null;

    @property
    life: number = 5;

    @property
    speed: number = 3;

    @property
    score: number = 5;

    @property
    alive: boolean = true;

    // LIFE-CYCLE CALLBACKS:

    getRandomRange(x, y) {
        return Math.floor(Math.random() * y) + x;
    }

    onLoad() {
        this.life = 5;
        this.speed = 1;
        this.node.group = "cube";
        this.lifeLable.string = this.life.toString();
        this.node.color = new cc.Color(this.getRandomRange(0, 255), this.getRandomRange(0, 255), this.getRandomRange(0, 255));

    }

    onCollisionEnter(other: cc.Collider, self) {
        if (!this.alive) return
        const ballScript: BallClass = other.node.getComponent("ball");
        const { power } = ballScript;

        this.minusLife(power);
        // ballScript.removeSelf();
        console.log(self.world.points.map(v => {
            return {
                x: v.x,
                y: v.y
            }
        }))

        if (this.life === 0) {
            this.alive = false;
            if (this.node.parent) {
                this.node.parent.getComponent("cannonbk").addScore(this.score);
            }
            this.rotateOut()
        } else {
            //this.lightSelf();
            this.bigerSelf()
        }
    }

    minusLife(v: number) {
        this.life -= v;
        this.lifeLable.string = this.life.toString();
    }

    fragmentOut() {

    }

    bigerSelf() {
        this.node.scale = 1.3;
    }

    lightSelf() {
        this.node.getComponents(cc.RenderComponent).forEach(renderComponent => {
            let material: cc.Material = renderComponent.getMaterial(0);
            material.setProperty("glowColorSize", 0.1);
            material.setProperty("glowColor", "#ff0000");
            material.setProperty("glowThreshold", 1);
            renderComponent.setMaterial(0, material);
        });
    }

    rotateOut() {
        var anim = this.getComponent(cc.Animation);
        anim.play("rotate-out");
    }

    rotateOutEnd() {
        console.log("rotateOutEnd");
        this.createPiece();
        this.createPiece();
        this.createPiece();
        this.createPiece();
        this.createPiece();
        this.createPiece();
        this.createPiece();
        this.createPiece();
        this.removeSelf()
    }

    createPiece() {
        const p = cc.instantiate(this.piecePrefab);
        const { x, y } = this.node.position;
        p.x = x;
        p.y = y;
        this.node.parent.addChild(p)
        p.getComponent("piece").init("cube")
    }

    removeSelf() {
        if (this.node.parent) {
            this.node.parent.removeChild(this.node, true);
            this.destroy()
        }
    }

    start() {

    }

    update(dt) {
        let { x, y } = this.node.position;
        if (y < 0) {
            this.removeSelf();
            return
        }
        if (this.node.scale > 1) {
            this.node.scale -=0.1;
        }
        this.node.setPosition(x, y - this.speed)
    }
}
