import {
  AbstractMesh,
  ActionManager,
  ArcRotateCamera,
  CubeTexture,
  Engine,
  ExecuteCodeAction,
  GlowLayer,
  HemisphericLight,
  Matrix,
  MeshBuilder,
  Quaternion,
  Scene,
  SceneLoader,
  Tools,
  Vector3
} from "@babylonjs/core";
import "@babylonjs/loaders";
import SceneComponent from "./SceneComponent";

let car;
let rotMesh: any;
let box: AbstractMesh;
const onSceneReady = (scene: Scene, camera: ArcRotateCamera): void => {
  const hdr = CubeTexture.CreateFromPrefilteredData("textures/env.env", scene);
  scene.environmentTexture = hdr;
  // camera.detachControl();

  const gl = new GlowLayer("gl", scene);
  gl.intensity = 0.5;

  box = MeshBuilder.CreateBox("box", { size: 0.01 });

  new HemisphericLight("light", Vector3.Up());

  // SceneLoader.ImportMeshAsync("", "models/", "SFScene.glb", scene).then(() => {
  //   const ground = scene.getMeshByName("SFScene_05")!;
  //   car = scene.getTransformNodeByName("SFCar_P")!;
  //   const ground1 = scene.getMeshByName("SFScene_06")!;
  //   const ground2 = scene.getMeshByName("Obj_10")!;
  //   ground.material!.alphaMode = Engine.ALPHA_ADD;
  //   ground1.material!.alphaMode = Engine.ALPHA_ADD;
  //   ground2.material!.alphaMode = Engine.ALPHA_ADD;

  //   // car.position = new Vector3(1, 0, 0);
  //   car.parent = box;
  //   box.visibility = 0.1;

  //   // 必须先设置为null
  //   ground.rotationQuaternion = null;
  //   scene.onBeforeRenderObservable.add(() => {
  //     ground.rotation.y += 0.001;
  //   });
  // });

  SceneLoader.ImportMeshAsync("", "models/", "Int_Chair.glb", scene).then(async (res) => {
    const { meshes, animationGroups } = res;

    scene.stopAllAnimations();
    // animationGroups[0].stop();
    meshes[0].rotationQuaternion = null;

    meshes[0].rotation.y = Tools.ToRadians(-90);
    const additiveMatArr = [scene.getMeshByName("Int_Chair_Dri_05"), scene.getMeshByName("Int_Chair_Pas_05"), scene.getMeshByName("Int_Ground_01")];
    additiveMatArr.forEach((mesh) => {
      if (mesh) {
        mesh.material!.alphaMode = Engine.ALPHA_ADD;
      }
    });
    const driverChair = scene.getMeshByName("Int_Chair_Dri_01")!;
    console.log(meshes);

    const box = MeshBuilder.CreateBox("box", { size: 0.5 });
    box.position.x = 2;
    box.position.y = 0.5;
    box.actionManager = new ActionManager(scene);
    box.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickUpTrigger, function () {
        alert("player clicked");
      })
    );
  });

  let isDragging = false;

  let dX = 0;
  const dY = 0;

  let prevX: number | undefined;
  let prevY: number | undefined;

  scene.onPointerDown = function castRay() {
    const ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), camera, false);

    const hit = scene.pickWithRay(ray);

    if (hit && hit.pickedMesh) {
      rotMesh = box;
    }
  };

  function rotateAroundWorldAxisWithBake(object: any, axis: Vector3, radians: number) {
    const rotationMatrix = Matrix.RotationAxis(axis.normalize(), radians);

    object.bakeTransformIntoVertices(rotationMatrix);
  }

  function rotateAroundWorldAxis(object: any, axis: Vector3, radians: number) {
    object.rMatrix = object.rMatrix || Matrix.Identity();
    const rotationMatrix = Matrix.RotationAxis(axis.normalize(), radians);
    object.rMatrix.multiplyToRef(rotationMatrix, object.rMatrix);
    object.rotationQuaternion = Quaternion.FromRotationMatrix(object.rMatrix);
  }

  const handlePointerDown = () => {
    isDragging = true;
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (isDragging) {
      const f = 0.005;

      if ([prevX, prevY].includes(undefined)) {
        prevX = e.clientX;
        // prevY = e.clientY;
      }

      dX = (prevX! - e.clientX) * f;
      // dY = (prevY - e.clientY) * f;

      prevX = e.clientX;
      prevY = e.clientY;
      if (rotMesh) {
        rotateAroundWorldAxisWithBake(rotMesh, new Vector3(0, 1, 0), dX);
        rotateAroundWorldAxisWithBake(rotMesh, new Vector3(1, 0, 0), dY);

        rotateAroundWorldAxis(rotMesh, new Vector3(0, 1, 0), dX);
        rotateAroundWorldAxis(rotMesh, new Vector3(1, 0, 0), dY);
      }
    }
  };

  const handlePointerLeave = () => {
    isDragging = false;

    prevX = undefined;
    prevY = undefined;
  };

  // const canvas = scene.getEngine().getRenderingCanvas()!;
  // canvas.addEventListener("pointerdown", handlePointerDown);
  // canvas.addEventListener("pointermove", handlePointerMove);
  // canvas.addEventListener("pointerup", handlePointerLeave);
  // canvas.addEventListener("pointerleave", handlePointerLeave);
};

const onRender = (scene: Scene, camera: ArcRotateCamera) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
