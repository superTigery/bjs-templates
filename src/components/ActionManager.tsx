import {
  ActionManager,
  ArcRotateCamera,
  Color3,
  ExecuteCodeAction,
  HemisphericLight,
  InterpolateValueAction,
  MeshBuilder,
  PointLight,
  Scene,
  SetValueAction,
  StandardMaterial,
  Texture,
  Vector3,
  VolumetricLightScatteringPostProcess
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent";

const onSceneReady = (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas()!;
  scene.useRightHandedSystem = true;

  const light = new HemisphericLight("light", Vector3.Up(), scene);
  light.groundColor = new Color3(0.4, 0, 0);
  light.intensity = 0.8;
  // 停用灯光
  light.setEnabled(true);

  // 光照贴图
  const lightMap = new Texture("https://playground.babylonjs.com/textures/candleopacity.png", scene);
  const groundMaterial = new StandardMaterial("groundMat", scene);
  groundMaterial.lightmapTexture = lightMap;

  const pointLight = new PointLight("omni", Vector3.Zero(), scene);

  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 5, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  const box = MeshBuilder.CreateBox("box")!;
  box.position.y = 1;
  const mat = new StandardMaterial("boxMat");
  mat.emissiveColor = new Color3(0.1, 0.1, 0.1);
  box.material = mat;
  box.actionManager = new ActionManager();
  box.actionManager.registerAction(new InterpolateValueAction(ActionManager.OnPickUpTrigger, light, "diffuse", Color3.Red(), 1000));

  box.actionManager.registerAction(new SetValueAction(ActionManager.OnPointerOutTrigger, box.material, "emissiveColor", box.material.emissiveColor));
  box.actionManager.registerAction(new SetValueAction(ActionManager.OnPointerOverTrigger, box.material, "emissiveColor", Color3.White()));
  box.actionManager.registerAction(new InterpolateValueAction(ActionManager.OnPointerOutTrigger, box, "scaling", new Vector3(1, 1, 1), 150));
  box.actionManager.registerAction(new InterpolateValueAction(ActionManager.OnPointerOverTrigger, box, "scaling", new Vector3(1.1, 1.1, 1.1), 150));

  const ground = MeshBuilder.CreateGround("ground", { width: 5, height: 5 });
  ground.material = groundMaterial;
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
