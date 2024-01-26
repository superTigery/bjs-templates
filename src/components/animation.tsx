import { Scene, Animation, ArcRotateCamera, Vector3, HemisphericLight, Color3, MeshBuilder } from "@babylonjs/core";
import SceneComponent from "./SceneComponent";

const onSceneReady = (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas()!;

  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero(), scene);
  camera.attachControl(canvas);

  const light = new HemisphericLight("light", new Vector3(0, 10, -2), scene);
  light.diffuse = Color3.White();

  const box = MeshBuilder.CreateBox("box", { size: 1 });

  const boxAnimation = new Animation("boxAnimation", "position.x", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
  const boxKeys = [];
  boxKeys.push({
    frame: 0,
    value: 0
  });
  boxKeys.push({
    frame: 200,
    value: 4
  });

  boxAnimation.setKeys(boxKeys);
  box.animations = [];
  box.animations.push(boxAnimation);

  scene.beginAnimation(box, 200, 0, true);
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
