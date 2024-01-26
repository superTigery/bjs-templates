import { ArcRotateCamera, CubeTexture, Engine, GlowLayer, Scene, SceneLoader, Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders";
import SceneComponent from "./SceneComponent";

const onSceneReady = (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas()!;

  const camera = new ArcRotateCamera("camera", Math.PI / 3.2, Math.PI / 2.4, 6, Vector3.Zero(), scene);
  camera.setTarget(new Vector3(1, 0, 0));
  camera.attachControl(canvas);

  const hdr = CubeTexture.CreateFromPrefilteredData("textures/env.env", scene);
  scene.environmentTexture = hdr;
  // camera.upperBetaLimit = Math.PI / 2.5;
  // camera.lowerBetaLimit = Math.PI / 2;

  // const light = new HemisphericLight("light", Vector3.Zero(), scene);
  // light.intensity = 0.8;
  // light.diffuse = new Color3(135 / 255, 206 / 255, 235 / 255);
  // light.specular = new Color3(255, 255, 255);

  const gl = new GlowLayer("gl", scene);
  gl.intensity = 0.1;

  SceneLoader.ImportMeshAsync("", "models/", "untitled.glb", scene).then((res) => {
    console.log(res, "res");

    for (const geo in res.meshes) {
      console.log(res.meshes[geo].name);
    }
    const ground = scene.getMeshByName("SFScene_05")!;
    const car = scene.getMeshByName("SFCar.glb")!;
    const ground1 = scene.getMeshByName("SFScene_06")!;
    const ground2 = scene.getMeshByName("Obj_10")!;
    ground.material!.alphaMode = Engine.ALPHA_ADD;
    ground1.material!.alphaMode = Engine.ALPHA_ADD;
    ground2.material!.alphaMode = Engine.ALPHA_ADD;
    scene.onBeforeRenderObservable.add(() => {
      res.meshes[0].rotation.z += 0.01;
    });
  });
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
