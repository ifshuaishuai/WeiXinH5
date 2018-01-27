import GlobalConfig from "../Utils/GlobalConfig";
import GameController from "./GameController";
import Utils from "../Utils/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BlockController extends cc.Component
{
    // 是否安全
    @property
    isSafeBlock: boolean = true;

    private _rigidBody: cc.RigidBody;

    onLoad() : void
    {
        this._rigidBody = this.node.getComponent(cc.RigidBody);
    }

    onBeginContact (contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) : void
    {
        let playerBody = otherCollider.body;
        let playerNode = playerBody.node;

        if(!GameController.getInstance().isNodePlayer(playerNode))
        {
            return;
        }

        if(!this.isSafeBlock)
        {
            // YOU DIED
            return;
        }

        switch(this._rigidBody.type)
        {
            case cc.RigidBodyType.Animated:
            // 线性或者角速度运动，玩家向上加力
            this.applyObjctImpulse(contact, playerBody, GlobalConfig.impulse_velocity_up);
            break;

            case cc.RigidBodyType.Dynamic:
            // 动态的，本身对应需要加力
            this.processDynamicBlock(contact, playerBody, selfCollider.body, GlobalConfig.impulse_velocity_right, GlobalConfig.impulse_velocity_up);
            break;

            case cc.RigidBodyType.Kinematic:
            // 运动不受力，玩家向上加力
            this.applyObjctImpulse(contact, playerBody, GlobalConfig.impulse_velocity_up);
            break;

            case cc.RigidBodyType.Static:
            // 静态的，玩家向上加力
            this.applyObjctImpulse(contact, playerBody, GlobalConfig.impulse_velocity_up);
            break;

            default:
            break;
        }
    }

    private applyObjctImpulse(contact: cc.PhysicsContact, playerBody: cc.RigidBody, impulse: cc.Vec2) : void
    {
        let manifold = contact.getWorldManifold();
        if (manifold.normal.y < 0)
        {
            // 如果玩家在物体下方碰撞
            return;
        }

        playerBody.linearVelocity = cc.v2();
        playerBody.applyLinearImpulse(impulse, playerBody.getWorldCenter(), true);
    }

    private processDynamicBlock(contact: cc.PhysicsContact, playerBody: cc.RigidBody, blockBody: cc.RigidBody, impulseRight: cc.Vec2, impulseUp: cc.Vec2) : void
    {
        let normal = contact.getWorldManifold().normal;
        let tan = Utils.normalToTan(normal);

        if(0 <= tan && tan < 1)
        {
			// 在需要加力的角度
			let impulseLength = impulseRight.x;
			let newPulseHorozontal = new cc.Vec2(-normal.x * impulseLength, -normal.y * impulseLength);
			this.applyObjctImpulse(contact, playerBody, newPulseHorozontal);
        }
        else
        {
            this.applyObjctImpulse(contact, playerBody, impulseUp);
        }
    }
}
