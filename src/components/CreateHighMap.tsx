import { ArcRotateCamera, HemisphericLight, MeshBuilder, Scene, SceneLoader, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders";
import SceneComponent from "./SceneComponent";

const onSceneReady = (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas()!;

  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new Vector3(0, 10, 0), scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas);
  camera.minZ = 0.5;

  const light = new HemisphericLight("light", new Vector3(0, 10, 5), scene);
  light.intensity = 0.9;

  const largeGround = MeshBuilder.CreateGroundFromHeightMap("ground", "https://assets.babylonjs.com/environments/villageheightmap.png", {
    width: 40,
    height: 40,
    subdivisions: 20,
    minHeight: 0,
    maxHeight: 2
  });

  const largeGroundMat = new StandardMaterial("groundMat");
  largeGroundMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/valleygrass.png");
  largeGround.material = largeGroundMat;
  // 避免闪烁
  largeGround.position.y = -0.01;

  SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "valleyvillage.glb");
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
