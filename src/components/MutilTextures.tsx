import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  MultiMaterial,
  Scene,
  SpotLight,
  StandardMaterial,
  Vector3
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent";

const onSceneReady = (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas()!;

  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  const light = new SpotLight("spoltlight", new Vector3(0, 12, 0), Vector3.Down(), Math.PI, 100);
  light.range = 20;

  const hemiLight = new HemisphericLight("light", Vector3.Zero());

  const faceUVs = [];
  faceUVs[0] = Color3.Red().toColor4();
  faceUVs[1] = Color3.Black().toColor4();
  faceUVs[2] = Color3.Blue().toColor4();
  faceUVs[3] = Color3.Green().toColor4();
  faceUVs[4] = Color3.Purple().toColor4();
  faceUVs[5] = Color3.White().toColor4();

  const box = MeshBuilder.CreateBox("box", { faceColors: faceUVs, sideOrientation: Mesh.DOUBLESIDE });
  // const material0 = new StandardMaterial("mat0", scene);
  // material0.diffuseColor = new Color3(1, 0, 0);

  // const material1 = new StandardMaterial("mat0", scene);
  // material1.diffuseColor = new Color3(0, 1, 0);

  // const material2 = new StandardMaterial("mat0", scene);
  // material2.diffuseColor = new Color3(0, 0, 1);

  // const boxMat = new MultiMaterial("multi", scene);
  // boxMat.subMaterials.push(material0);
  // boxMat.subMaterials.push(material1);
  // boxMat.subMaterials.push(material2);
  // box.material = boxMat;

  const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 });
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
