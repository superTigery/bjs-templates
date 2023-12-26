import {
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
  Vector4,
  Animation,
  IAnimationKey,
  SceneLoader,
  Axis,
  Space,
  Tools,
  CubeTexture,
  Color3,
  SpriteManager,
  Sprite,
  Mesh,
  ParticleSystem,
  Color4,
  PointerEventTypes,
  AbstractMesh,
  Material,
  PBRMaterial,
  BaseTexture,
  Engine
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent";
import earcut from "earcut";
import "@babylonjs/loaders";

const onSceneReady = (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas();

  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 30, new Vector3(0, 0, 0));
  camera.attachControl(canvas, true);
  const light = new HemisphericLight("light", new Vector3(1, 1, 0));

  //Create Village ground
  // const groundMat = new StandardMaterial("groundMat");
  // groundMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/villagegreen.png");
  // groundMat.diffuseTexture.hasAlpha = true;

  // const ground = MeshBuilder.CreateGround("ground", { width: 24, height: 24 });
  // ground.material = groundMat;

  // //large ground
  // const largeGroundMat = new StandardMaterial("largeGroundMat");
  // largeGroundMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/valleygrass.png");

  // const largeGround = MeshBuilder.CreateGroundFromHeightMap("largeGround", "https://assets.babylonjs.com/environments/villageheightmap.png", {
  //   width: 150,
  //   height: 150,
  //   subdivisions: 20,
  //   minHeight: 0,
  //   maxHeight: 10
  // });
  // largeGround.material = largeGroundMat;
  // largeGround.position.y = -0.01;

  // // SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "valleyvillage.glb");

  // // 创建天空盒
  // const skybox = MeshBuilder.CreateBox("skybox", { size: 150 }, scene);
  // const skyboxMaterial = new StandardMaterial("skybox", scene);
  // skyboxMaterial.backFaceCulling = false;
  // skyboxMaterial.reflectionTexture = new CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
  // skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  // skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  // skyboxMaterial.specularColor = new Color3(0, 0, 0);
  // skybox.material = skyboxMaterial;

  // // SceneLoader.ImportMeshAsync("him", "https://playground.babylonjs.com/scenes/Dude/", "Dude.babylon", scene).then((result) => {
  // //   var dude = result.meshes[0];
  // //   dude.scaling = new Vector3(0.25, 0.25, 0.25);

  // //   scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);
  // // });

  // const spriteManagerTrees = new SpriteManager(
  //   "treesManager",
  //   "https://playground.babylonjs.com/textures/palm.png",
  //   2000,
  //   { width: 512, height: 1024 },
  //   scene
  // );

  // for (let i = 0; i < 500; i++) {
  //   const tree = new Sprite("tree", spriteManagerTrees);
  //   tree.position.x = Math.random() * -30;
  //   tree.position.z = Math.random() * 20 + 8;
  //   tree.position.y = 0.5;
  // }

  // for (let i = 0; i < 500; i++) {
  //   const tree = new Sprite("tree", spriteManagerTrees);
  //   tree.position.x = Math.random() * 25 + 7;
  //   tree.position.z = Math.random() * -35 + 7;
  //   tree.position.y = 0.5;
  // }

  // const ufoManager = new SpriteManager("ufoManager", "https://assets.babylonjs.com/environments/ufo.png", 1, { width: 128, height: 76 }, scene);
  // const ufo = new Sprite("ufo", ufoManager);
  // ufo.playAnimation(0, 16, true, 125);

  // ufo.position.y = 2;
  // ufo.position.z = 0;
  // ufo.width = 2;
  // ufo.height = 1;

  // const fountainProfile = [
  //   new Vector3(0, 0, 0),
  //   new Vector3(10, 0, 0),
  //   new Vector3(10, 4, 0),
  //   new Vector3(8, 4, 0),
  //   new Vector3(8, 1, 0),
  //   new Vector3(1, 2, 0),
  //   new Vector3(1, 15, 0),
  //   new Vector3(3, 17, 0)
  // ];

  // const fountaion = MeshBuilder.CreateLathe("fountain", { shape: fountainProfile, sideOrientation: Mesh.DOUBLESIDE });
  // fountaion.scaling = new Vector3(0.3, 0.3, 0.3);

  // const particleSystem = new ParticleSystem("particles", 5000, scene);
  // particleSystem.particleTexture = new Texture("https://playground.babylonjs.com/textures/flare.png", scene);
  // particleSystem.emitter = new Vector3(0, 10, 0);
  // particleSystem.minEmitBox = new Vector3(-0.01, 0, -0.01); // minimum box dimensions
  // particleSystem.maxEmitBox = new Vector3(0.01, 0, 0.01); // maximum box dimensions
  // particleSystem.color1 = new Color4(0.7, 0.8, 1.0, 1.0);
  // particleSystem.color2 = new Color4(0.2, 0.5, 1.0, 1.0);

  // particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;

  // particleSystem.minSize = 0.01;
  // particleSystem.maxSize = 0.05;

  // particleSystem.minLifeTime = 0.3;
  // particleSystem.maxLifeTime = 1.5;

  // particleSystem.emitRate = 1500;

  // particleSystem.direction1 = new Vector3(-1, 8, 1);
  // particleSystem.direction2 = new Vector3(1, 8, -1);

  // particleSystem.minEmitPower = 0.2;
  // particleSystem.maxEmitPower = 0.6;
  // particleSystem.updateSpeed = 0.01;

  // particleSystem.gravity = new Vector3(0, -9.81, 0);

  // let switched = false;

  // const pointerDown = (mesh: AbstractMesh) => {
  //   if (mesh === fountaion) {
  //     switched = !switched;
  //     if (switched) {
  //       particleSystem.start();
  //     } else {
  //       particleSystem.stop();
  //     }
  //   }
  // };

  // scene.onPointerObservable.add((pointerInfo) => {
  //   switch (pointerInfo.type) {
  //     case PointerEventTypes.POINTERDOWN:
  //       if (pointerInfo.pickInfo?.hit) {
  //         pointerDown(pointerInfo.pickInfo.pickedMesh as Mesh);
  //       }
  //   }
  // });

  // SceneLoader.ImportMeshAsync("", "models/", "C236.glb", scene).then(({ meshes, animationGroups }) => {
  //   meshes[0].position.y = 0.01;
  //   animationGroups[0].stop();
  //   console.log(meshes);
  // });

  SceneLoader.ImportMeshAsync("", "models/", "wind.glb", scene).then((gltf) => {
    // meshes[1].material = mat;

    const meshes = gltf.meshes;
    const texture = (meshes[1]!.material as PBRMaterial)!.albedoTexture!;
    texture.hasAlpha = true;
    (meshes[1]!.material as PBRMaterial).alphaMode = Engine.ALPHA_COMBINE;

    function windUVAnimation() {
      texture.vOffset -= 0.015;
    }

    if (meshes) {
      scene.onBeforeRenderObservable.add(windUVAnimation);
    }
  });
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
