import { PBRMaterial, Scene, SceneLoader } from '@babylonjs/core'
import { PBRCustomMaterial } from '@babylonjs/materials'
import SceneComponent from './SceneComponent'
import '@babylonjs/loaders'

let customMaterial: PBRCustomMaterial | null = null

function setPBRCustomMaterial(originalMaterial: PBRMaterial, scene: Scene): PBRCustomMaterial {
  customMaterial = new PBRCustomMaterial(originalMaterial.name + '_custorm', scene)

  customMaterial.albedoColor = originalMaterial.albedoColor
  customMaterial.albedoTexture = originalMaterial.albedoTexture
  customMaterial.metallic = originalMaterial.metallic
  customMaterial.roughness = originalMaterial.roughness
  customMaterial.metallicTexture = originalMaterial.metallicTexture
  customMaterial.reflectionColor = originalMaterial.reflectionColor
  customMaterial.clearCoat.isEnabled = originalMaterial.clearCoat.isEnabled
  customMaterial.clearCoat.intensity = 1
  customMaterial.alpha = originalMaterial.alpha

  // customMaterial.needAlphaBlending = () => originalMaterial.needAlphaBlending();
  customMaterial.needDepthPrePass = originalMaterial.needDepthPrePass

  const time = performance.now() * 0.1

  customMaterial.AddUniform('time', 'float', 0)

  customMaterial.Fragment_MainEnd(`
          vec3 scanColor = vec3(.2,.2,1.0);
          float scanSpeed = 1.0;
          float scanWidth = 0.4;
          float t = fract(time * scanSpeed * 0.25) ;
          float scanLine = smoothstep(0.0,1.0,t) * 4.0 - 2.0;

          // float strength = 1.0 - abs(vPositionW.z - 0.5);

          float speed = 0.01;

          float scanEffect = smoothstep(scanWidth, 0.0, abs(vPositionW.z - scanLine));
          vec3 base = baseColor.rgb;
          // vec3 color =  mix(base,scanColor,scanEffect);
          // vec3 color =   scanColor * scanEffect;

          // gl_FragColor.rgb = vPositionW.rgb;



          float lowerBound = 0.2  + sin(time);
          float upperBound = 0.8  + sin(time);

          gl_FragColor = mix( gl_FragColor , vec4(scanColor,1.0) , smoothstep(lowerBound,lowerBound + 0.3, vPositionW.z)-smoothstep(upperBound-0.3,upperBound, vPositionW.z));



      `)

  return customMaterial
}

const onSceneReady = (scene: Scene) => {
  scene.createDefaultEnvironment()

  SceneLoader.ImportMeshAsync('', 'models/', 'C236.glb', scene).then((root) => {
    root.meshes[0].position.y = 0.01
    root.animationGroups[0].stop()
  })

  scene.executeWhenReady(() => {
    scene.materials.forEach((material) => {
      if (material.name.includes('C236')) {
        const newMat = setPBRCustomMaterial(material as PBRMaterial, scene)
        material.getBindedMeshes().forEach((mesh) => {
          mesh.material = newMat
        })
        scene.registerBeforeRender(() => {
          const time = performance.now() * 0.1
          newMat && newMat.getEffect() && newMat.getEffect().setFloat('time', time)
        })
      }
    })
  })
}

const onRender = (scene: Scene) => {
  scene.registerBeforeRender(() => {
    const time = performance.now() * 0.1
    customMaterial && customMaterial.getEffect() && customMaterial.getEffect().setFloat('time', time)
  })
}

export default () => <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}></SceneComponent>
