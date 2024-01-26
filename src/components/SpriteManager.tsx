import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  MeshBuilder,
  PointLight,
  Scene,
  SpotLight,
  Sprite,
  SpriteManager,
  Vector3
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent";

const onSceneReady = (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas()!;

  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero(), scene);
  camera.attachControl(canvas);

  const light = new SpotLight("spotLight", new Vector3(-1, 4, -1), new Vector3(0, -1, 0), Math.PI / 2, 10, scene);
  light.diffuse = new Color3(1, 1, 1);
  light.specular = new Color3(0, 1, 0);

  const hemLight = new HemisphericLight("hemiLight", Vector3.Zero(), scene);
  hemLight.intensity = 0.6;

  const pointLight = new PointLight("pointLight", Vector3.Up());
  pointLight.diffuse = new Color3(0, 0, 1);

  const ground = MeshBuilder.CreateGround("ground", { width: 20, height: 20 });

  const box = MeshBuilder.CreateBox("box", { size: 1 });
  box.position.y = 0.5;

  const spriteManagerTrees = new SpriteManager(
    "treeManager",
    "https://assets.babylonjs.com/textures/palm.png",
    2000,
    { width: 512, height: 1024 },
    scene
  );
  for (let i = 0; i < 500; i++) {
    const tree = new Sprite("tree", spriteManagerTrees);
    tree.position.x = Math.random() * -30;
    tree.position.z = Math.random() * 20 + 8;
    tree.position.y = 0.5;
  }

  for (let index = 0; index < 400; index++) {
    const tree = new Sprite("tree", spriteManagerTrees);
    tree.position.x = Math.random() * 25 + 7;
    tree.position.z = Math.random() * -35 + 8;
    tree.position.y = 0.5;
  }

  //UFO
  const spriteManagerUFO = new SpriteManager("ufoManager", "https://assets.babylonjs.com/environments/ufo.png", 1, { width: 128, height: 76 }, scene);
  const ufo = new Sprite("ufo", spriteManagerUFO);
  ufo.playAnimation(0, 16, true, 200);
  ufo.position.y = 5;
  ufo.position.z = 0;
  ufo.width = 2;
  ufo.height = 1;
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
