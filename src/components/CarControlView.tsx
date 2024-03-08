import { Scene, ArcRotateCamera, Animation } from "@babylonjs/core";
import { useState } from "react";
type Props = {
  scene: Scene;
  camera: ArcRotateCamera;
};
enum CameraAniRadian {
  FLASH_LIGHT = "2.2",
  DRIVER_WINDOW = "3",
  DRIVER_DOOR = "3.1",
  TRUNK = "4.6"
}

const ControlView = (props: Props) => {
  const { scene, camera } = props;
  const [radian, setRadian] = useState(Math.PI / 3.2);

  // 相机动画
  const carAnimation = (scene: Scene, camera: ArcRotateCamera, targetRadian: string): void => {
    camera.detachControl();
    const ani = new Animation("ani", "alpha", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrame = [];
    const beginFrame = 0;
    const endFrame = 30;
    keyFrame.push({
      frame: beginFrame,
      value: radian
    });

    keyFrame.push({
      frame: endFrame,
      value: Number(targetRadian)
    });
    ani.setKeys(keyFrame);

    camera.animations = [];
    camera.animations.push(ani);
    scene.beginAnimation(camera, 0, 30, false, 1.5, () => {
      camera.attachControl();
    });
  };

  const handle = (currentRadian: string) => {
    setRadian(Number(currentRadian));
    carAnimation(scene, camera, currentRadian);
  };

  return (
    <>
      <div style={{ color: "red", position: "absolute", top: "10px" }} onClick={() => handle(CameraAniRadian.FLASH_LIGHT)}>
        闪灯
      </div>
      <div style={{ color: "red", position: "absolute", top: "30px" }} onClick={() => handle(CameraAniRadian.DRIVER_WINDOW)}>
        车窗
      </div>
      <div style={{ color: "red", position: "absolute", top: "50px" }} onClick={() => handle(CameraAniRadian.DRIVER_DOOR)}>
        解锁
      </div>
      <div style={{ color: "red", position: "absolute", top: "70px" }} onClick={() => handle(CameraAniRadian.TRUNK)}>
        后备箱
      </div>
    </>
  );
};

export default ControlView;
