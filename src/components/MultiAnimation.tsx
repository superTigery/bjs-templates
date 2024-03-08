import {
  ArcRotateCamera,
  Color3,
  Color4,
  DirectionalLight,
  GlowLayer,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  UniversalCamera,
  Vector3
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent";

const onSceneReady = (scene: Scene) => {
  const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 3 - 30), scene);
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas()!;
  camera.attachControl(canvas, true);

  const light1 = new DirectionalLight("light1", Vector3.Down(), scene);
  const light2 = new HemisphericLight("light2", new Vector3(0, -1, 0), scene);
  light1.intensity = 0.25;
  light2.intensity = 0.5;

  const gl = new GlowLayer("gl");
  gl.intensity = 0.8;

  //door
  const door = MeshBuilder.CreateBox("door", { width: 2, height: 4, depth: 0.1 }, scene);
  const hinge = MeshBuilder.CreateBox("hinge", {}, scene);
  hinge.isVisible = false;
  door.parent = hinge;
  hinge.position.y = 2;
  door.position.x = -1;

  door.edgesWidth = 2;
  door.edgesColor = new Color3(0, 0, 1).toColor4();
  door.enableEdgesRendering();

  // light position
  const sphereLight = MeshBuilder.CreateSphere("sphere", { diameter: 0.2 }, scene);
  const sphereMat = new StandardMaterial("", scene);
  sphereMat.emissiveColor = new Color3(1, 1, 1);
  sphereLight.position = new Vector3(2, 3, 0.1);
  sphereLight.material = sphereMat;

  scene.registerBeforeRender(()=>{
    
  })
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
