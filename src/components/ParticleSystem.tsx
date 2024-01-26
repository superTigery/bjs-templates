import {
  AbstractMesh,
  ArcRotateCamera,
  Color3,
  Color4,
  DirectionalLight,
  HemisphericLight,
  MeshBuilder,
  ParticleSystem,
  PointerEventTypes,
  Scene,
  StandardMaterial,
  Texture,
  Vector3
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent";

const onSceneReady = (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas()!;

  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero(), scene);
  camera.attachControl(canvas);

  const light = new DirectionalLight("light", new Vector3(0, -1, 0), scene);
  light.diffuse = new Color3(1, 0, 0);
  light.intensity = 0.6;
  light.specular = new Color3(1, 1, 1);

  const hemiLight = new HemisphericLight("light1", new Vector3(0, 10, 0));
  hemiLight.intensity = 0.9;
  hemiLight.diffuse = new Color3(0, 1, 0);

  const ground = MeshBuilder.CreateGround("groud", { width: 10, height: 10 });

  const cylinder = MeshBuilder.CreateCylinder("cylinder", { diameter: 0.2 });
  const cylinderMat = new StandardMaterial("cylinderMat");
  cylinderMat.diffuseColor = Color3.Green();
  cylinder.material = cylinderMat;

  const particleSystem = new ParticleSystem("particleSystem", 5000, scene);
  particleSystem.particleTexture = new Texture("https://assets.babylonjs.com/textures/flare.png", scene);
  // 粒子发射位置
  particleSystem.emitter = Vector3.Up();

  // 发射box大小
  particleSystem.minEmitBox = new Vector3(-0.01, 0, -0.01);
  particleSystem.maxEmitBox = new Vector3(0.01, 0, 0.01);

  // 颜色
  particleSystem.color1 = new Color4(1, 0, 0, 0.5);
  particleSystem.color2 = new Color4(0, 1, 0, 0.5);
  // 叠加模式
  particleSystem.blendMode = ParticleSystem.BLENDMODE_ADD;

  // 粒子大小
  particleSystem.minSize = 0.01;
  particleSystem.maxSize = 0.05;

  // 生命周期
  particleSystem.minLifeTime = 0.3;
  particleSystem.maxLifeTime = 2;

  // 发射速率
  particleSystem.emitRate = 1000;

  // 散射方向
  particleSystem.direction1 = new Vector3(1, 9, 1);
  particleSystem.direction2 = new Vector3(-1, 9, -1);

  // 力度
  particleSystem.minEmitPower = 0.2;
  particleSystem.maxEmitPower = 0.6;

  particleSystem.updateSpeed = 0.01;

  // 设置重力
  particleSystem.gravity = new Vector3(0, -9.81, 0);
  particleSystem.start();

  let switched = true;
  scene.onPointerObservable.add((pointerInfo) => {
    console.log(pointerInfo.type);
    switch (pointerInfo.type) {
      case PointerEventTypes.POINTERDOWN:
        if (pointerInfo!.pickInfo!.hit) {
          pointerDown(pointerInfo!.pickInfo!.pickedMesh as AbstractMesh);
        }
    }
  });

  const pointerDown = (mesh: AbstractMesh) => {
    if (mesh === cylinder) {
      switched = !switched;
      if (switched) {
        particleSystem.start();
      } else {
        particleSystem.stop();
      }
    }
  };
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
