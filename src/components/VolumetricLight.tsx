import {
  ArcRotateCamera,
  Camera,
  Engine,
  PointLight,
  Scene,
  SceneLoader,
  Texture,
  Vector3,
  VolumetricLightScatteringPostProcess
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent";
import "@babylonjs/loaders";

const onSceneReady = (scene: Scene, camera: Camera, engine: Engine) => {
  const light = new PointLight("Omni", new Vector3(20, 20, 100), scene);

  const canvas = scene.getEngine().getRenderingCanvas()!;
  //Adding an Arc Rotate Camera
  const camera1 = new ArcRotateCamera("Camera", -0.5, 2.2, 100, Vector3.Zero(), scene);
  camera1.attachControl(canvas, false);

  // The first parameter can be used to specify which mesh to import. Here we import all meshes
  SceneLoader.ImportMeshAsync("", "models/", "Int_Chair.glb", scene).then((res) => {
    scene.stopAllAnimations();
  });

  // Create the "God Rays" effect (volumetric light scattering)
  const godrays = new VolumetricLightScatteringPostProcess("godrays", 1.0, camera1, undefined, 100, Texture.BILINEAR_SAMPLINGMODE, engine, false);

  // By default it uses a billboard to render the sun, just apply the desired texture
  // position and scale
  godrays.mesh.material.diffuseTexture = new Texture(
    "https://playground.babylonjs.com/textures/sun.png",
    scene,
    true,
    false,
    Texture.BILINEAR_SAMPLINGMODE
  );
  godrays.mesh.material.diffuseTexture.hasAlpha = true;
  godrays.mesh.position = new Vector3(-150, 150, 150);
  godrays.mesh.scaling = new Vector3(350, 350, 350);

  light.position = godrays.mesh.position;
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
