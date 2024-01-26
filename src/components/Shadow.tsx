import {
  ArcRotateCamera,
  Axis,
  Color3,
  DirectionalLight,
  MeshBuilder,
  Scene,
  SceneLoader,
  ShadowGenerator,
  Space,
  SpotLight,
  StandardMaterial,
  Tools,
  Vector3
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent";
import "@babylonjs/loaders";

class walk {
  turn: number;
  dist: number;
  constructor(turn: number, dist: number) {
    this.turn = turn;
    this.dist = dist;
  }
}

const onSceneReady = (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas()!;

  const camera = new ArcRotateCamera("camera", (-3 * Math.PI) / 4, Math.PI / 3, 250, Vector3.Zero(), scene);
  camera.upperBetaLimit = Math.PI / 2.2;

  camera.attachControl(canvas);

  const light = new DirectionalLight("dir01", new Vector3(0, -1, 1), scene);
  light.position = new Vector3(0, 15, -30);

  const ground = MeshBuilder.CreateGround("ground", { width: 120, height: 120 });
  // 接收阴影
  ground.receiveShadows = true;

  const box = MeshBuilder.CreateBox("box", { size: 1 });
  box.position.y = 2;
  box.position.z = -4;
  const boxMat = new StandardMaterial("boxMat");
  boxMat.diffuseColor = Color3.Green();
  box.material = boxMat;

  const box1 = box.clone("box1");
  box1.position.x = 2;

  //生成阴影
  const shaderGenerator = new ShadowGenerator(1024, light);

  // 添加产生阴影的网格
  shaderGenerator.addShadowCaster(box, true);

  const track: walk[] = [];
  track.push(new walk(86, 7));
  track.push(new walk(-85, 14.8));
  track.push(new walk(-93, 16.5));
  track.push(new walk(48, 25.5));
  track.push(new walk(-112, 30.5));
  track.push(new walk(-72, 33.2));
  track.push(new walk(42, 37.5));
  track.push(new walk(-98, 45.2));
  track.push(new walk(0, 47));

  SceneLoader.ImportMeshAsync("him", "https://playground.babylonjs.com/scenes/Dude/", "Dude.babylon", scene).then((res) => {
    const dude = res.meshes[0]!;
    dude.scaling = new Vector3(0.12, 0.12, 0.12);
    shaderGenerator.addShadowCaster(dude, true);
    scene.beginAnimation(res!.skeletons[0], 0, 100, true);
    camera.parent = dude;

    let distance = 0;
    const step = 0.015;
    let p = 0;

    scene.onBeforeRenderObservable.add(() => {
      dude.movePOV(0, 0, step);
      distance += step;

      if (distance > track[p].dist) {
        dude.rotate(Axis.Y, Tools.ToRadians(track[p].turn), Space.LOCAL);
        p += 1;
        p %= track.length;
        if (p === 0) {
          distance = 0;
          dude.position = new Vector3(-6, 0, 0);
          // dude.rotationQuaternion = startRotation.clone();
        }
      }
    });
  });
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
