import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Scene,
  Sound,
  StandardMaterial,
  Texture,
  Vector3,
  Vector4,
  Tools,
  Animation,
  SceneLoader,
  Axis,
  Space
} from "@babylonjs/core";

import SceneComponent from "./SceneComponent";

class walk {
  turn: number = 0;
  dist: number = 0;
  constructor(turn: number, dist: number) {
    this.turn = turn;
    this.dist = dist;
  }
}

const onSceneReady = (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas()!;

  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero());
  camera.attachControl(canvas);

  camera.setTarget(Vector3.Zero());

  const light = new HemisphericLight("light", new Vector3(0, 6, 0), scene);
  light.intensity = 1;

  const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10, subdivisions: 2 });
  const groundMat = new StandardMaterial("groundMat", scene);
  groundMat.diffuseColor = Color3.Green();
  ground.material = groundMat;

  // 添加声音
  const sound = new Sound("sound", "https://playground.babylonjs.com/sounds/bounce.wav", scene);
  sound.play();

  //创建屋顶
  const roof = MeshBuilder.CreateCylinder("roof", { diameter: 1.3, height: 1.2, tessellation: 3 });
  const roofMat = new StandardMaterial("foorMat");
  roofMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);
  roof.material = roofMat;
  roof.scaling.x = 0.75;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 1.22;

  const faceUV: Vector4[] = [];
  faceUV[0] = new Vector4(0.5, 0.0, 0.75, 1.0); //rear face
  faceUV[1] = new Vector4(0.0, 0.0, 0.25, 1.0); //front face
  faceUV[2] = new Vector4(0.25, 0, 0.5, 1.0); //right side
  faceUV[3] = new Vector4(0.75, 0, 1.0, 1.0); //left side

  const box = MeshBuilder.CreateBox("box", { width: 1, height: 1, faceUV });
  const boxMat = new StandardMaterial("boxMat");
  boxMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/cubehouse.png");
  box.material = boxMat;
  box.position.y = 0.5;

  const house = Mesh.MergeMeshes([roof, box], true, false, undefined, false, true);
  const cloneHouse = house?.clone("cloneHouse");
  cloneHouse!.position.x = 2;

  const animCar = new Animation("carAnim", "position.x", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
  const carKeys = [];
  carKeys.push({
    frame: 0,
    value: -4
  });

  carKeys.push({
    frame: 150,
    value: 4
  });

  carKeys.push({
    frame: 210,
    value: 4
  });
  animCar.setKeys(carKeys);

  SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "car.babylon").then((res) => {
    res.meshes[0].position = new Vector3(2, 0.2, -2);
    const wheelRB = scene.getMeshByName("wheelRB");
    const wheelRF = scene.getMeshByName("wheelRF");
    const wheelLB = scene.getMeshByName("wheelLB");
    const wheelLF = scene.getMeshByName("wheelLF");

    scene.beginAnimation(wheelRB, 0, 30, true);
    scene.beginAnimation(wheelRF, 0, 30, true);
    scene.beginAnimation(wheelLB, 0, 30, true);
    scene.beginAnimation(wheelLF, 0, 30, true);

    res.meshes[0].animations = [];
    res.meshes[0].animations.push(animCar);
    scene.beginAnimation(res.meshes[0], 0, 210, true);
  });

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

  SceneLoader.ImportMeshAsync("him", "https://playground.babylonjs.com/scenes/Dude/", "Dude.babylon", scene).then((result) => {
    const dude = result.meshes[0];
    dude.scaling = new Vector3(0.015, 0.015, 0.015);
    dude.position.z = 2;

    scene.beginAnimation(result.skeletons[0], 0, 120, true, 1.0);
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
