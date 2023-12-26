import { FC, useEffect, useRef } from "react";
import { Engine, Scene } from "@babylonjs/core";

type PropsType = {
  antialias: boolean;
  engineOptons?: any;
  adaptToDeviceRatio?: boolean;
  sceneOptions?: any;
  onRender: (scene: Scene) => void;
  onSceneReady: (scene: Scene) => void;
};

const SceneComponent: FC<PropsType> = (props) => {
  const { antialias, engineOptons, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest } = props;
  const canvasDom = useRef(null);

  useEffect(() => {
    const { current: canvas } = canvasDom;
    if (!canvas) return;

    const engine = new Engine(canvas, antialias, engineOptons, adaptToDeviceRatio);
    const scene = new Scene(engine, sceneOptions);

    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(scene);
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

  return <canvas ref={canvasDom} {...rest}></canvas>;
};

export default SceneComponent;
