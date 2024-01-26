import { Color3, FreeCamera, HemisphericLight, Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";
import SceneComponent from "./SceneComponent";

let sphere: Mesh;
const onSceneReady = (scene: Scene) => {
  const camera = new FreeCamera("camera", new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero());
  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas);

  const light = new HemisphericLight("light", new Vector3(0, 10, 0), scene);
  light.intensity = 0.8;

  sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2 });

  const mat = new StandardMaterial("mat", scene);
  mat.diffuseColor = new Color3(1, 0, 0);
  sphere.material = mat;
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
