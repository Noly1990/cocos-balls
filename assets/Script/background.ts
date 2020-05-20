// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class BackgroudClass extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    @property(cc.Prefab)
    piecePrefab: cc.Prefab = null;


    onLoad () {
        setInterval(()=>{
            this.createPiece();
        },500);
    }

    createPiece() {
        const p = cc.instantiate(this.piecePrefab);
        const { width, height } = this.node;
        p.x = Math.random() * width;
        p.y = Math.random() * height;
        this.node.addChild(p);
        p.getComponent("piece").init("back");
    }

    start () {

    }

    // update (dt) {}
}
