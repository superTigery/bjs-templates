import { Color4, DefaultRenderingPipeline, HemisphericLight, MeshBuilder, NodeMaterial, Scene, Vector3 } from "@babylonjs/core";
import SceneComponent from "./SceneComponent";

const onSceneReady = (scene: Scene) => {
  const color = Color4.FromInts(0, 244, 244, 255);
  scene.clearColor = color;
  const light = new HemisphericLight("light", Vector3.Zero());
  light.intensity = 1;

  const ground = MeshBuilder.CreateGround("ground", { width: 2, height: 2, subdivisions: 64 });
  ground.scaling = new Vector3(30, 30, 30);
  ground.rotation.y = Math.PI;

  NodeMaterial.ParseFromSnippetAsync("#3FU5FG#1").then((mat) => {
    ground.material = mat;
  });

  const addPostEffects = () => {
    const pipeline = new DefaultRenderingPipeline("defaultPepeline");
    pipeline.bloomEnabled = true;
    pipeline.bloomThreshold = 0;
    pipeline.bloomKernel = 0.35;
    pipeline.bloomScale = 0.5;

    pipeline.grainEnabled = true;
    pipeline.grain.intensity = 8;
    pipeline.chromaticAberrationEnabled = true;
    pipeline.chromaticAberration.aberrationAmount = 65.1;
    pipeline.chromaticAberration.radialIntensity = 2;

    pipeline.sharpenEnabled = true;
    pipeline.sharpen.edgeAmount = 0.15;
  };

  addPostEffects();
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
