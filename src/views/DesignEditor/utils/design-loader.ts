import { IScene } from "@layerhub-pro/types"
import { IDesign } from "~/interfaces/DesignEditor"
import { loadTemplateFonts } from "~/utils/fonts"
import { loadVideoEditorAssets } from "~/utils/video"

const loadGraphicTemplate = async (payload: IDesign) => {
  const { scenes } = payload
  for (const scn of scenes) {
    const scene: IScene = {
      name: scn.name,
      frame: payload.frame,
      id: scn.id,
      layers: scn.layers,
      metadata: {},
    }
    const loadedScene = await loadVideoEditorAssets(scene)
    await loadTemplateFonts(loadedScene)
  }
}

const loadPresentationTemplate = async (payload: IDesign) => {
  const { scenes } = payload
  for (const scn of scenes) {
    const scene: IScene = {
      name: scn.name,
      frame: payload.frame,
      id: scn.id,
      layers: scn.layers,
      metadata: {},
    }
    const loadedScene = await loadVideoEditorAssets(scene)
    await loadTemplateFonts(loadedScene)
  }
}

const loadVideoTemplate = async (payload: IDesign) => {
  const { scenes } = payload
  for (const scn of scenes) {
    const scene: IScene = {
      name: scn.name,
      frame: payload.frame,
      id: scn.id,
      layers: scn.layers,
      metadata: {},
    }
    const loadedScene = await loadVideoEditorAssets(scene)
    await loadTemplateFonts(loadedScene)
  }
}

const designLoaders = {
  GRAPHIC: loadGraphicTemplate,
  PRESENTATION: loadPresentationTemplate,
  VIDEO: loadVideoTemplate,
}

export const loadDesign = async (data: IDesign) => {
  const loader = await designLoaders[data.type as "GRAPHIC"]
  return loader(data)
}
