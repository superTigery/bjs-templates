import { ArcRotateCamera, Color3, HemisphericLight, Scene, Vector3 } from "@babylonjs/core";
import SceneComponent from "./SceneComponent";

const onSceneReady = (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas()!;

  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 3, 10, Vector3.Zero());
  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light", Vector3.Zero());
  light.intensity = 0.9;
  light.diffuse = new Color3(0, 1, 0);
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
