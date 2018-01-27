import Log from "../Utils/Log";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraController extends cc.Component
{
    @property(cc.Node)
    target: cc.Node = null;

    @property
    cameraY: number = 400;

    // 如果target不存在，自己生成target用来移动

    private _camera: cc.Camera = null;

    onLoad(): void
    {
        this._camera = this.getComponent(cc.Camera);
    }

    onEnable(): void
    {
        cc.director.getPhysicsManager().attachDebugDrawToCamera(this._camera);
    }

    onDisable(): void
    {
        cc.director.getPhysicsManager().detachDebugDrawFromCamera(this._camera);
    }

    lateUpdate(): void
    {
        let targetPos = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        targetPos.y = this.cameraY;

        this.node.position = this.node.parent.convertToNodeSpaceAR(targetPos);
    }
}
