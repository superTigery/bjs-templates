import { AbstractMesh, Color4, CubeTexture, NodeMaterial, NodeMaterialBlock, Scene, SceneLoader, Texture } from "@babylonjs/core";
import SceneComponent from "./SceneComponent";
import "@babylonjs/loaders";

const onSceneReady = (scene: Scene) => {
  const clearColor = Color4.FromInts(0, 255, 233, 255);
  // scene.clearColor = clearColor;

  const server = "https://patrickryanms.github.io/BabylonJStextures/Demos/waveShader";

  const env = CubeTexture.CreateFromPrefilteredData("models/studio.env", scene);
  env.name = "studioIBL";
  env.gammaSpace = false;
  env.rotationY = 2.3667;
  scene.environmentTexture = env;
  scene.environmentIntensity = 1;

  let bar: AbstractMesh;
  const meshParams = {
    minX: 0,
    maxX: 0,
    minZ: 0,
    maxZ: 0
  };
  async function loadMeshes() {
    const result = await SceneLoader.ImportMeshAsync("", `models/`, "bars.glb");
    for (const mesh of result.meshes) {
      if (mesh.name === "bars") {
        bar = mesh;
        meshParams.minX = mesh.getBoundingInfo().boundingBox.minimumWorld.x;
        meshParams.maxX = mesh.getBoundingInfo().boundingBox.maximumWorld.x;
        meshParams.minZ = mesh.getBoundingInfo().boundingBox.minimumWorld.z;
        meshParams.maxZ = mesh.getBoundingInfo().boundingBox.maximumWorld.z;
      }
    }
  }

  let straightWave: NodeMaterialBlock;
  async function createMaterials() {
    NodeMaterial.IgnoreTexturesAtLoadTime = true;
    const texBarColor = new Texture(`textures/barsColor_randomValue.png`, scene, false, false, Texture.NEAREST_SAMPLINGMODE);
    texBarColor.wrapU = texBarColor.wrapV = Texture.CLAMP_ADDRESSMODE;
    const barsMat = await NodeMaterial.ParseFromFileAsync("barsMat", `models/bars.json`, scene);
    barsMat.build(false);
    barsMat.transparencyMode = 0;

    barsMat.getBlockByName("baseColorTex").texture = texBarColor;
    barsMat.getBlockByName("minX").value = meshParams.minX;
    barsMat.getBlockByName("maxX").value = meshParams.maxX;
    barsMat.getBlockByName("minZ").value = meshParams.minZ;
    barsMat.getBlockByName("maxZ").value = meshParams.maxZ;
    straightWave = barsMat.getBlockByName("straightWave");
    straightWave.value = 2; // straightWave.value =  1 , straightWave.value = 0

    bar.material = barsMat;
  }

  setTimeout(async () => {
    await loadMeshes();
    await createMaterials();
  });
};

const onRender = (scene: Scene) => {};

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>;
