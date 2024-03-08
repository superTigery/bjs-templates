import { FC, useEffect, useRef, useState } from "react";
import { ArcRotateCamera, Engine, GizmoManager, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import CarControlView from "./CarControlView";

type PropsType = {
  antialias: boolean;
  engineOptons?: any;
  adaptToDeviceRatio?: boolean;
  sceneOptions?: any;
  children?: any;
  onRender: (scene: Scene, camera: ArcRotateCamera) => void;
  onSceneReady: (scene: Scene, camera: ArcRotateCamera) => void;
};

const SceneComponent: FC<PropsType> = (props) => {
  const { antialias, engineOptons, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest } = props;
  const canvasDom = useRef(null);
  const [scene, setScene] = useState<Scene>();
  const [camera, setCamera] = useState<ArcRotateCamera>();

  useEffect(() => {
    const { current: canvas } = canvasDom;
    if (!canvas) return;

    const engine = new Engine(canvas, antialias, engineOptons, adaptToDeviceRatio);
    const scene = new Scene(engine, sceneOptions);

    const camera = new ArcRotateCamera("camera", Math.PI / 3, Math.PI / 2.5, 5, Vector3.Zero(), scene);
    // camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas);
    camera.minZ = 0.1;
    camera.fov = 0.9;
    camera.useFramingBehavior = true;
    camera.wheelDeltaPercentage = 0.05;
    // 获取或设置鼠标滚轮精度或相机缩放的速度。
    camera.wheelPrecision = 512;
    // 定义指针捏紧精度或相机缩放的速度。
    camera.pinchPrecision = 1024;
    camera.panningAxis = Vector3.Zero();
    // camera.upperBetaLimit = Math.PI / 2;
    // camera.lowerBetaLimit = Math.PI / 3;
    camera.wheelPrecision = 0.05;
    camera.speed = 1;

    camera.position.set(1, 3, 1);

    setCamera(camera);

    if (scene.isReady()) {
      setScene(scene);
      onSceneReady(scene, camera, engine);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene, camera));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(scene, camera);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [antialias, engineOptons, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady]);

  return (
    <>
      <canvas ref={canvasDom} {...rest}></canvas>
      <CarControlView scene={scene as Scene} camera={camera as ArcRotateCamera} />
    </>
  );
};

export default SceneComponent;
