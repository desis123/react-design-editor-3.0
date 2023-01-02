import { fabric } from "fabric"
import { ILayer, LayerType } from "@layerhub-pro/types"
import type Scene from "./scene"
import { nanoid } from "nanoid"
import { loadImageFromURL } from "../utils/image-loader"
import setObjectGradient from "../utils/fabric"

class Background {
  constructor(public scene: Scene) {}

  public update = (options: Partial<ILayer>) => {
    const currentBackground = this.currentBackground
    if (options.type) {
      if (options.type !== currentBackground?.type) {
        this.recreateBackground(options)
      }
    }
    {
      this.updateCurrentBackground(options)
    }
  }
  public updateCurrentBackground = (options: Partial<ILayer>) => {
    const currentBackground = this.currentBackground
    if (currentBackground?.type === LayerType.BACKGROUND_IMAGE) {
      this.updateBackgroundImage(options)
    } else {
      this.updateSolidGradientBackground(options)
    }
  }

  public updateBackgroundImage = async (options: Partial<ILayer>) => {
    const currentBackground = this.currentBackground
    // @ts-ignore
    if (options.src && currentBackground) {
      // @ts-ignore
      const image = await loadImageFromURL(options.src)
      // @ts-ignore
      currentBackground.setElement(image)
    }
  }

  public updateSolidGradientBackground = (options: Partial<ILayer>) => {
    const background = this.currentBackground as any
    if (options.fill.type) {
      setObjectGradient(background, options.gradientOptions)
    } else {
      background.update(options)
    }
  }

  public async recreateBackground(options: Partial<ILayer>) {
    const currentBackground = this.currentBackground
    if (options.type === LayerType.BACKGROUND_IMAGE) {
      const background = (await this.generateBackgroundImage(options)) as any
      this.scene.canvas.insertAt(background, 2, false)
    } else {
      const background = this.generateBackground(options)
      this.scene.canvas.insertAt(background, 2, false)
    }
    this.removeBackground(currentBackground)
  }

  public generateBackground(options: Partial<ILayer>) {
    const frame = this.scene.frame
    const background = new fabric.Background({
      id: nanoid(),
      name: "Background",
      width: frame.width,
      height: frame.height,
      top: frame.top,
      left: frame.left,
      fill: options.fill,
    })
    return background
  }

  public async generateBackgroundImage(options: Partial<ILayer>) {
    // @ts-ignore
    const image = await loadImageFromURL(options.src)
    const backgroundImage = new fabric.BackgroundImage(image, {
      id: nanoid(),
    })
    return backgroundImage
  }

  private removeBackground(object?: fabric.Object) {
    if (object) {
      this.scene.canvas.remove(object)
    }
  }
  get currentBackground() {
    const objects = this.scene.canvas.getObjects()
    const currentBackground = objects.find((o) => o.type === LayerType.BACKGROUND || LayerType.BACKGROUND)
    return currentBackground
  }
}

export default Background
