import {
  ArcRotateCamera,
  Color3,
  CubeTexture,
  GlowLayer,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  PBRMaterial,
  PBRMetallicRoughnessMaterial,
  Scene,
  StandardMaterial,
  Vector3
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent";

const onSceneReady = (scene: Scene) => {
  scene.environmentTexture = CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);

  const canvas = scene.getEngine().getRenderingCanvas()!;

  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 5, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  const hemi = new HemisphericLight("light", Vector3.Up().scale(10), scene);
  hemi.diffuse = new Color3(1, 1, 0);
  hemi.intensity = 0.1;

  const box = MeshBuilder.CreateBox("box", { size: 0.5, sideOrientation: Mesh.DOUBLESIDE });
  const boxMat = new StandardMaterial("mat");
  box.position.x = -2;
  boxMat.emissiveColor = new Color3(-1, 0.2, 0.5);
  box.material = boxMat;

  const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 0.5 });
  sphere.position = new Vector3(1.4, 0, 0);
  const sphereMat = new StandardMaterial("sphereMat");
  sphereMat.emissiveColor = Color3.FromHexString("#ffffff");
  sphere.material = sphereMat;

  const gl = new GlowLayer("gl");
  gl.intensity = 0.8;
  gl.addIncludedOnlyMesh(box);

  const torus = MeshBuilder.CreateTorus("torus", { diameter: 0.5 });
  torus.position = new Vector3(0, 1, 0);
  const torusMat = new PBRMetallicRoughnessMaterial("pbr", scene);
  torusMat.baseColor = new Color3(1, 0.77, 0.33);
  torusMat.metallic = 0.9;
  torusMat.roughness = 0;
  torusMat.environmentTexture = CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
  torus.material = torusMat;

  const cylinder = MeshBuilder.CreateCylinder("cylinder", { height: 1 });
  cylinder.position = new Vector3(1, 1, 1);
  const cylinderMat = new PBRMaterial("pbr", scene);
  cylinderMat.metallic = 1;
  cylinderMat.roughness = 1;
  cylinderMat.clearCoat.isTintEnabled = false;
  cylinderMat.indexOfRefraction = 1;
  cylinderMat.albedoColor = new Color3(1, 1, 1);

  cylinderMat.clearCoat.isEnabled = true;
  cylinderMat.clearCoat.intensity = 1;
  cylinder.material = cylinderMat;

  const sphere1 = MeshBuilder.CreateSphere("sphere", { segments: 16 });

  const pbr = new PBRMaterial("pbr", scene);
  sphere1.material = pbr;

  pbr.albedoColor = new Color3(1, 1, 1);
  pbr.metallic = 1.0;
  pbr.roughness = 1.0;

  pbr.clearCoat.isEnabled = true;

  pbr.albedoColor = new Color3(0.1, 0.1, 0.1);
  // 彩虹色 薄膜效应
  pbr.iridescence.isEnabled = true;
  pbr.iridescence.intensity = 0.9;

  scene.debugLayer.show();
  scene.debugLayer.select(cylinderMat, "CLEAR COAT");
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
