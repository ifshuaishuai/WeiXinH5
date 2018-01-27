import GameController from "../Controller/GameController";
import CameraController from "../Controller/CameraController";
import Log from "../Utils/Log";
import Utils from "../Utils/Utils";
import LevelConfig from "./LevelConfig";
import PlayerController from "../Controller/PlayerController";


const {ccclass, property, executionOrder} = cc._decorator;

@ccclass
@executionOrder(-1)
export default class LevelInitializer extends cc.Component
{
    @property(cc.Prefab)
    prefab_game_controller: cc.Prefab = null;

    @property(cc.Node)
    player_dummy: cc.Node = null;

    @property(cc.Camera)
    camera: cc.Camera = null;

    onLoad () : void
    {
        let gameController = GameController.getInstance();

        if(gameController === null)
        {
            // 实例化要先的对象要先挂到一个node上面，生命周期才会生效(但是如果player_dummy是prefab，又调用不到PlayerController生命周期，玄学待查)
            let node = Utils.instantiate(this.prefab_game_controller, this.node);
            node.parent = null;
        }

        if(!GameController.getInstance().isPlayerExist())
        {
            // 玩家不存在，自己设置dummy player
            GameController.getInstance().setPlayerNode(this.player_dummy);
        }
        else
        {
            // 玩家已存在，disable dummy player
            this.player_dummy.active = false;
        }

        let playerNode = GameController.getInstance().getPlayerNode();
        this.camera.addTarget(playerNode);
        this.camera.getComponent(CameraController).target = playerNode;

        // 开启监听
        playerNode.getComponent(PlayerController).registerEvents();

        playerNode.position = this.node.getComponent(LevelConfig).positionPlayer;
    }
}
