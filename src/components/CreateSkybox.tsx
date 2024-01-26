import { ArcRotateCamera, Color3, CubeTexture, HemisphericLight, MeshBuilder, Scene, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import SceneComponent from "./SceneComponent";

const onSceneReady = (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas()!;

  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero(), scene);
  camera.attachControl(canvas);
  camera.upperBetaLimit = Math.PI / 2.2;

  const light = new HemisphericLight("light", new Vector3(0, 10, -5), scene);
  light.intensity = 0.8;

  const box = MeshBuilder.CreateBox("box", { size: 2, sideOrientation: 2 });
  const boxMat = new StandardMaterial("boxMat");
  boxMat.diffuseColor = Color3.Yellow();
  box.material = boxMat;

  const skybox = MeshBuilder.CreateBox("skybox", { size: 150 }, scene);
  const skyboxMat = new StandardMaterial("skybox", scene);
  skyboxMat.backFaceCulling = false;
  skyboxMat.reflectionTexture = new CubeTexture("https://assets.babylonjs.com/textures/skybox", scene);
  skyboxMat.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMat.specularColor = new Color3(0, 0, 0);
  skybox.material = skyboxMat;
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
