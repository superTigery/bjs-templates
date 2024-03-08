import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  LensFlare,
  LensFlareSystem,
  MeshBuilder,
  PointerDragBehavior,
  Scene,
  StandardMaterial,
  Texture,
  Vector3
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent";

const onSceneReady = (scene: Scene) => {
  scene.fogMode = Scene.FOGMODE_LINEAR;
  scene.fogColor = Color3.FromHexString("#fff111");
  scene.fogStart = 20.0;
  scene.fogEnd = 50.0;
  scene.fogDensity = 1;

  const canvas = scene.getEngine().getRenderingCanvas()!;
  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light", Vector3.Up(), scene);
  light.intensity = 0.9;

  const window = MeshBuilder.CreateBox("door", { width: 1, height: 1.8, depth: 0.1 });
  window.position.y = 0.1;
  window.position.z = 0.5;
  const windowMat = new StandardMaterial("mat", scene);
  windowMat.diffuseColor = new Color3(0, 1, 0);
  window.material = windowMat;

  const dragBox = MeshBuilder.CreateBox("drag", { width: 1, height: 1.8, depth: 0.1 });
  const dragBoxMat = new StandardMaterial("mat", scene);
  dragBoxMat.diffuseColor = Color3.FromHexString("#fff111");
  dragBox.material = dragBoxMat;
  dragBox.position.y = 0.1;

  const pointerDragBehavior = new PointerDragBehavior({ dragAxis: new Vector3(0, 1, 0) });
  pointerDragBehavior.useObjectOrientationForDragging = false;

  pointerDragBehavior.onDragEndObservable.add((event) => {
    console.log(event);
    const { y } = dragBox.position;
    window.position = new Vector3(window.position.x, y, window.position.z);
  });
  dragBox.addBehavior(pointerDragBehavior);

  const url = "https://playground.babylonjs.com/";
  const lensFlareSystem = new LensFlareSystem("lensFlareSystem", camera, scene);
  const flare00 = new LensFlare(1, 0, Color3.Red(), `${url}/textures/flare.png`, lensFlareSystem);
  const flare01 = new LensFlare(0.075, 0.5, new Color3(0.8, 0.56, 0.72), `${url}/textures/flare3.png`, lensFlareSystem);
  const flare02 = new LensFlare(0.1, -0.15, new Color3(0.71, 0.8, 0.95), `${url}/textures/Flare2.png`, lensFlareSystem);
  const flare03 = new LensFlare(0.15, 0.25, new Color3(0.95, 0.89, 0.71), `${url}/textures/flare.png`, lensFlareSystem);

  const ground = MeshBuilder.CreateGround("ground", { width: 15, height: 15 });
  const groundMat = new StandardMaterial("groundMat", scene);
  groundMat.diffuseTexture = new Texture("https://playground.babylonjs.com/textures/amiga.jpg", scene);
  groundMat.diffuseTexture.vScale = 12;
  groundMat.diffuseTexture.uScale = 12;
  ground.material = groundMat;
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
