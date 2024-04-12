import * as THREE from 'three'
import { loadAssets } from './loadAssets'

interface ConfigParams {
  [key: string]: any
}

type Config = Record<
  `ori${Capitalize<'images' | 'materials' | 'textures'>}`,
  ConfigParams
>

type onProgress = (p: number) => void

const TEXTURE_MAPPING = {
  UVMapping: 300,
  CubeReflectionMapping: 301,
  CubeRefractionMapping: 302,
  EquirectangularReflectionMapping: 303,
  EquirectangularRefractionMapping: 304,
  CubeUVReflectionMapping: 306,
}

const TEXTURE_WRAPPING = {
  RepeatWrapping: 1000,
  ClampToEdgeWrapping: 1001,
  MirroredRepeatWrapping: 1002,
}

const TEXTURE_FILTER = {
  NearestFilter: 1003,
  NearestMipmapNearestFilter: 1004,
  NearestMipmapLinearFilter: 1005,
  LinearFilter: 1006,
  LinearMipmapNearestFilter: 1007,
  LinearMipmapLinearFilter: 1008,
}

function parseTexture(data: ConfigParams, texture: THREE.Texture) {
  function parseConstant(value: number | string, type: any) {
    if (typeof value === 'number') return value

    console.warn('parseTextures: Constant should be in numeric form.', value)

    return type[value]
  }

  if (data.name !== undefined) texture.name = data.name

  if (data.mapping !== undefined)
    texture.mapping = parseConstant(data.mapping, TEXTURE_MAPPING)

  if (data.offset !== undefined) texture.offset.fromArray(data.offset)
  if (data.repeat !== undefined) texture.repeat.fromArray(data.repeat)
  if (data.center !== undefined) texture.center.fromArray(data.center)
  if (data.rotation !== undefined) texture.rotation = data.rotation

  if (data.wrap !== undefined) {
    texture.wrapS = parseConstant(data.wrap[0], TEXTURE_WRAPPING)
    texture.wrapT = parseConstant(data.wrap[1], TEXTURE_WRAPPING)
  }

  if (data.format !== undefined) texture.format = data.format
  if (data.type !== undefined) texture.type = data.type
  if (data.encoding !== undefined) texture.encoding = data.encoding

  if (data.minFilter !== undefined)
    texture.minFilter = parseConstant(data.minFilter, TEXTURE_FILTER)
  if (data.magFilter !== undefined)
    texture.magFilter = parseConstant(data.magFilter, TEXTURE_FILTER)
  if (data.anisotropy !== undefined) texture.anisotropy = data.anisotropy

  if (data.flipY !== undefined) texture.flipY = data.flipY

  if (data.premultiplyAlpha !== undefined)
    texture.premultiplyAlpha = data.premultiplyAlpha
  if (data.unpackAlignment !== undefined)
    texture.unpackAlignment = data.unpackAlignment

  if (data.userData !== undefined) texture.userData = data.userData

  return texture
}

export async function loadTextures({
  basePath,
  oriImages,
  onProgress,
}: {
  basePath: string
  oriImages: ConfigParams
  onProgress?: onProgress
}) {
  const images: Record<string, THREE.Texture> = {}

  let cnt = 0
  const total = Object.keys(oriImages).length

  for (const uuid in oriImages) {
    const tex = oriImages[uuid]
    images[uuid] = await loadAssets(
      `${basePath}${tex}` as `/${string}.${'jpg' | 'png'}`,
    )
    cnt++
    onProgress && onProgress(cnt / total)
  }

  return images
}

export function presetTextures(
  images: Record<string, THREE.Texture>,
  oriTextures: ConfigParams,
) {
  const textures: Record<string, THREE.Texture> = {}

  for (const uuid in oriTextures) {
    const { image } = oriTextures[uuid]
    if (images[image])
      textures[uuid] = parseTexture(oriTextures[uuid], images[image])
  }
  return textures
}

export function presetMaterial(
  textures: Record<string, THREE.Texture>,
  oriMaterials: ConfigParams,
) {
  const materials: Record<string, THREE.Material> = {}

  const loader = new THREE.MaterialLoader()
  loader.setTextures(textures)

  for (const uuid in oriMaterials) {
    const data = oriMaterials[uuid]
    materials[uuid] = loader.parse(data)
  }

  return materials
}

export async function loadConfig(
  config: Config & { texBasePath: string; onProgress?: onProgress },
) {
  const { oriImages, oriTextures, oriMaterials, texBasePath, onProgress } = config

  const images = await loadTextures({
    basePath: texBasePath,
    oriImages,
    onProgress,
  })

  const textures = presetTextures(images, oriTextures)

  const materials = presetMaterial(textures, oriMaterials)

  return materials
}
