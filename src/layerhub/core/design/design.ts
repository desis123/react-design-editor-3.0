import { IConfig, IDesign, IScene } from "@layerhub-pro/types"
import { FabricCanvas, IState } from "../common/interfaces"
import { Editor } from "../editor/editor"
import Scene from "./scene"
import { createFrame, createScene, fixDesignFrame } from "../utils/design"
import { nanoid } from "nanoid"
import Resizer from "../resizer"

interface DesignOptions {
  canvas: FabricCanvas
  design: IDesign
  config: IConfig
  editor: Editor
  state: IState
}
class Design {
  public activeScene: Scene
  private scenes: Scene[]
  private canvas: FabricCanvas
  public design: IDesign
  private config: IConfig
  private editor: Editor
  private state: IState
  public template: IDesign
  constructor(options: DesignOptions) {
    this.canvas = options.canvas
    this.config = options.config
    this.editor = options.editor
    this.state = options.state
    this.setDesign(options.design)
  }

  public updateDesign(props: Record<string, string | number | any>) {
    this.design = Object.assign({}, this.design, props)
    this.state.setTemplate(this.design)
  }

  public async setDesign(design: IDesign) {
    const fixedDesign = fixDesignFrame(design)
    this.design = fixedDesign
    this.template = fixedDesign
    await this.loadScenes()
    this.state.setTemplate(fixedDesign)
  }

  public async loadScenes() {
    const scenes = this.design.scenes.map((scene) => {
      return new Scene({
        scene: scene,
        canvas: this.canvas,
        config: this.config,
        editor: this.editor,
        state: this.state,
      })
    })

    await Promise.all(scenes.map((scene) => scene.prerender()))
    await Promise.all(scenes.map((scene) => scene.setPreviewDefault()))

    this.scenes = scenes
    this.updateContext()
    this.setActiveScene(scenes[0])
  }

  public toJSON() {
    const scenes = this.scenes.map((scene) => scene.toJSON())
    return {
      ...this.design,
      scenes,
    }
  }

  public setActiveScene(scene: Scene | string) {
    if (typeof scene === "string") {
      const activeScene = this.scenes.find((scn) => scn.id === scene)
      if (activeScene) {
        activeScene.renderObjects()
        this.activeScene = activeScene
        this.state.setActiveScene(activeScene)
      }
    } else {
      scene.renderObjects()
      this.activeScene = scene
      this.state.setActiveScene(scene)
    }
    // Adding fallback rendering
    setTimeout(() => {
      this.canvas.requestRenderAll()
    }, 0)
  }

  public async addScene() {
    const scene = await this.createScene()
    this.scenes.push(scene)
    this.updateContext()
    this.setActiveScene(scene)
  }

  public async duplicateScene() {
    const currentScene = this.activeScene.toJSON()
    currentScene.id = nanoid()
    const scene = new Scene({
      scene: currentScene,
      canvas: this.canvas,
      config: this.config,
      editor: this.editor,
      state: this.state,
    })
    await scene.prerender()
    await scene.setPreviewDefault()

    this.scenes.push(scene)
    this.updateContext()
    this.setActiveScene(scene)
  }

  public async createScene(sceneData?: IScene) {
    const frame = sceneData && sceneData.frame ? sceneData.frame : this.design.frame
    const emptyScene = createScene({ frame: frame })
    const scene = new Scene({
      scene: sceneData ? sceneData : emptyScene,
      canvas: this.canvas,
      config: this.config,
      editor: this.editor,
      state: this.state,
    })

    await scene.prerender()
    await scene.setPreviewDefault()
    return scene
  }

  public async deleteScene(id: string) {
    const isActive = this.activeScene.id === id
    const currentIndex = this.scenes.findIndex((scene) => scene.id === id)
    this.scenes = this.scenes.filter((scene) => scene.id !== id)
    if (!this.scenes.length) {
      const scene = await this.createScene()
      this.scenes = [scene]
      this.setActiveScene(scene)
    } else {
      if (isActive) {
        const newActiveIndex = Math.max(currentIndex - 1, 0)
        const newActiveScene = this.scenes[newActiveIndex]
        this.setActiveScene(newActiveScene)
      }
    }
    this.updateContext()
  }

  public updateContext() {
    this.state.setScenes([...this.scenes])
  }

  public resize = async (options: { width: number; height: number }) => {
    const currentDesign = this.toJSON()
    let resizedScenes: IScene[] = []

    for (const scene of currentDesign.scenes) {
      const resizer = new Resizer(scene, options, this.config)
      const resized = await resizer.resize()
      resizedScenes = resizedScenes.concat(resized)
    }
    const frame = createFrame({
      frame: {
        width: options.width,
        height: options.height,
      },
    })
    const newDesign: IDesign = {
      ...currentDesign,
      frame: frame,
      scenes: resizedScenes,
    }

    await this.setDesign(newDesign)
  }

  // public resize = async (options: { width: number; height: number }) => {
  //   const currentIndex = this.scenes.findIndex((s) => s.id === this.activeScene.id)
  //   const currentScene = this.activeScene.toJSON()
  //   const resizer = new Resizer(currentScene, options, this.config)
  //   const resized = await resizer.resize()
  //   const resizedScene = await this.createScene({ ...resized })

  //   this.scenes.splice(currentIndex, 1, resizedScene)
  //   this.updateContext()
  //   this.setActiveScene(resizedScene)
  // }
}

export default Design
