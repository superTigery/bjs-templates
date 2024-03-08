import { ArcRotateCamera, Color3, Color4, HemisphericLight, MeshBuilder, Scene, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import SceneComponent from "./SceneComponent";

const onSceneReady = (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas()!;

  // scene.clearColor = Color4.FromHexString("#fff010");
  scene.ambientColor = new Color3(1, 1, 1);

  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 3, 10, Vector3.Zero());
  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light", new Vector3(0, 10, 0), scene);
  light.diffuse = new Color3(0, 1, 0);
  light.specular = new Color3(1, 0, 0);
  light.intensity = 0.8;

  const box = MeshBuilder.CreateBox("box", { size: 0.5 });
  const boxMat = new StandardMaterial("boxMat");
  // 漫反射颜色
  boxMat.diffuseColor = new Color3(1, 0, 1);
  // 高光颜色
  boxMat.specularColor = new Color3(0.5, 0.6, 0.85);
  // 自发光颜色
  boxMat.emissiveColor = new Color3(1, 1, 1);
  // 环境颜色  在未设置scene.ambientColor 时 不起作用
  boxMat.ambientColor = new Color3(0.23, 0.98, 0.53);

  // 漫反射贴图 boxMat.diffuseTexture
  // 高光颜色贴图 boxMat.specularTexture
  // 自发光颜色贴图 boxMat.emissiveTexture
  // 环境贴图  boxMat.emissiveTexture

  //  材质透明度
  boxMat.alpha = 0.5;
  // 纹理透明设置  boxMat.diffuseTexture?.hasAlpha = true

  // 凹凸贴图  myMaterial.bumpTexture
  // 反转凸起和凹痕
  // boxMat.invertNormalMapX = true;
  // boxMat.invertNormalMapY = true;

  // 透明贴图 boxMat.opacityTexture

  // 设置偏移量
  // boxMat.diffuseTexture.uScale = 5.0;
  // boxMat.diffuseTexture.vScale = 5.0;

  // 细节贴图
  // boxMat.detailMap.texture = new Texture("textures/detailmap.png", scene);
  // boxMat.detailMap.isEnabled = true;

  // 细节呈现强度设置
  // boxMat.detailMap.diffuseBlendLevel = 0.1; // between 0 and 1
  // boxMat.detailMap.bumpLevel = 1; // between 0 and 1
  // boxMat.detailMap.roughnessBlendLevel = 0.25; // between 0 and 1

  // 背面剔除 默认为true
  boxMat.backFaceCulling = true;

  // 线框模式
  boxMat.wireframe = true;

  boxMat.alpha = 0.1;
  box.material = boxMat;
  const alpha = 0;
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
