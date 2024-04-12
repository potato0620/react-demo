import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VRMLoaderPlugin } from '@pixiv/three-vrm'

type onProgress = (p: number) => void

type TextureLoader = THREE.TextureLoader | RGBELoader | EXRLoader

type ModelLoader = FBXLoader | GLTFLoader | THREE.ObjectLoader

type Loader = TextureLoader | ModelLoader

type AssetsSuffix = keyof Assets

interface Assets {
  'gltf': GLTF
  'glb': GLTF
  'vrm': GLTF
  'json': THREE.Group
  'obj': THREE.Group
  'fbx': THREE.Group
  'jpg': THREE.Texture
  'png': THREE.Texture
  'hdr': THREE.DataTexture
  'exr': THREE.DataTexture
}

function createLoader<K extends AssetsSuffix>(loader: Loader, basePath?: string) {
  if (basePath)
    loader.setPath(basePath)

  return function (src: string, onProgress?: onProgress): Promise<Assets[K]> {
    return new Promise((resolve, reject) => {
      let cnt = 2
      const load = () => {
        loader.load(
          src,
          (res: any) => {
            resolve(res)
          },
          (xhr) => {
            if (onProgress) onProgress(xhr.loaded / xhr.total)
          },
          (e) => {
            if (cnt) {
              load()
              cnt--
            }
            else {
              reject(e)
            }
          },
        )
      }
      load()
    })
  }
}

const loader = {
  gltf: createLoader<'gltf'>(new GLTFLoader()),
  glb: createLoader<'gltf'>(new GLTFLoader()),
  fbx: createLoader<'fbx'>(new FBXLoader()),
  obj: createLoader<'obj'>(new OBJLoader()),
  json: createLoader<'json'>(new THREE.ObjectLoader()),
  hdr: createLoader<'hdr'>(new RGBELoader()),
  jpg: createLoader<'jpg'>(new THREE.TextureLoader()),
  png: createLoader<'png'>(new THREE.TextureLoader()),
  exr: createLoader<'exr'>(new EXRLoader()),
  vrm: createLoader<'vrm'>(
    new GLTFLoader().register((parser) => {
      return new VRMLoaderPlugin(parser)
    })),
}

export function loadAssets<K extends AssetsSuffix>(src: `/${string}.${K}`, onProgress?: (p: number) => void) {
  const suffix = src.split('.').pop()?.toLowerCase()
  return loader[suffix as AssetsSuffix](src, onProgress) as Promise<Assets[K]>
}

