import { ArcRotateCamera, Color3, HemisphericLight, MeshBuilder, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";
import SceneComponent from "./SceneComponent";

const onSceneReady = (scene: Scene) => {
  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, Vector3.Zero(), scene);
  camera.attachControl(scene.getEngine().getRenderingCanvas()!);

  const light = new HemisphericLight("light", new Vector3(0, 2, 0), scene);
  light.intensity = 1;

  const box = MeshBuilder.CreateBox("box", { size: 0.5 }, scene);

  const mat = new StandardMaterial("mat", scene);
  mat.diffuseColor = Color3.Blue();
  mat.emissiveColor = Color3.Gray();

  box.material = mat;
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
