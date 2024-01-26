import {
  Animation,
  ArcRotateCamera,
  Color3,
  CubeTexture,
  HemisphericLight,
  MeshBuilder,
  Scene,
  SceneLoader,
  SpotLight,
  StandardMaterial,
  Texture,
  Vector3
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent";
import "@babylonjs/loaders";

const onSceneReady = (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas()!;

  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero(), scene);
  camera.attachControl(canvas);

  const light = new HemisphericLight("light", new Vector3(0, 10, 10), scene);

  SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "lamp.babylon").then(() => {
    const spotLight = new SpotLight("spotLight", Vector3.Zero(), new Vector3(0, -1, 0), Math.PI * 0.8, 0.01, scene);
    spotLight.diffuse = Color3.Yellow();
    spotLight.parent = scene.getMeshByName("bulb");

    const lamp = scene.getMeshByName("lamp")!;
    lamp.position = new Vector3(2, 0, 2);
    lamp.rotation = Vector3.Zero();
    lamp.rotation.y = -Math.PI / 4;
  });

  const skybox = MeshBuilder.CreateBox("skybox", { size: 120 });
  const skyboxMat = new StandardMaterial("skyboxMat");
  skyboxMat.backFaceCulling = false;
  skyboxMat.reflectionTexture = new CubeTexture("https://assets.babylonjs.com/textures/skybox", scene);
  skyboxMat.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMat.diffuseColor = new Color3(0, 0, 0);
  skyboxMat.specularColor = new Color3(0, 0, 0);
  skybox.material = skyboxMat;

  SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "valleyvillage.glb").then(() => {
    const ground = scene.getMeshByName("ground")!;
    (ground!.material! as any).maxSimultaneousLights = 5;
  });

  const hemiAnimation = new Animation("hemiAnimation", "intensity", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);

  const animationKeys = [];

  animationKeys.push({
    frame: 0,
    value: 1
  });

  animationKeys.push({
    frame: 150,
    value: 0.5
  });

  animationKeys.push({
    frame: 1500,
    value: 0.2
  });
  animationKeys.push({
    frame: 2000,
    value: 0
  });
  hemiAnimation.setKeys(animationKeys);
  light.animations = [];
  light.animations.push(hemiAnimation);

  scene.beginAnimation(light, 0, 1500, true, 1, () => {
    console.log("end");
  });
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
