import Assert from "../Utils/Assert";
import Log from "../Utils/Log";
import Utils from "../Utils/Utils";
import LevelConfig from "../SceneScript/LevelConfig";
import PlayerController from "./PlayerController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameController extends cc.Component
{
    private static _instance: GameController = null;

    public static getInstance() : GameController
    {
        if(this._instance === null)
        {
            Log.w(`this._instance === null`);
        }

        return this._instance;
    }


    @property(cc.Node)
    node_Player: cc.Node = null;

    private _playerNode: cc.Node = null;

    onLoad () : void
    {
        GameController._instance = this;

        this._playerNode = this.node_Player;
        if(this._playerNode)
        {
            cc.game.addPersistRootNode(this._playerNode);
        }

        // 切换场景不销毁
        this.node.parent = null;
        cc.game.addPersistRootNode(this.node);
    }

    public isPlayerExist() : boolean
    {
        return this._playerNode !== null;
    }

    public getPlayerNode() : cc.Node
    {
        return this._playerNode;
    }

    public setPlayerNode(node: cc.Node) : void
    {
        this._playerNode = node;
    }

    public isNodePlayer(node: cc.Node) : boolean
    {
        return (node === this._playerNode);
    }

    public loadScene(sceneName: string) : void
    {
        cc.director.loadScene(sceneName);
    }
}
