import { fabric } from "fabric"
import { ILayer, LayerType } from "@layerhub-pro/types"
import type Scene from "./scene"
import { nanoid } from "nanoid"
import { loadImageFromURL } from "../utils/image-loader"
import setObjectGradient, { generateObjectGradient } from "../utils/fabric"

class Background {
  constructor(public scene: Scene) {}

  public update = (options: Partial<ILayer>) => {
    const currentBackground = this.currentBackground!
    if (options.type) {
      if (currentBackground.type === options.type) {
        this.updateCurrentBackground(options)
      } else {
        this.recreateBackground(options)
      }
    } else {
      // @ts-ignore
      if (options.fill || (options.gradient && currentBackground.type !== LayerType.BACKGROUND)) {
        this.recreateBackground(options)
      } else {
        this.updateCurrentBackground(options)
      }
    }
    this.scene.canvas.requestRenderAll()
  }

  public updateCurrentBackground = (options: Partial<ILayer>) => {
    const currentBackground = this.currentBackground
    if (!options.fill && currentBackground?.type === LayerType.BACKGROUND_IMAGE) {
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
      currentBackground.setCoords()
      // @ts-ignore
      this.scaleBackground(currentBackground)
      this.scene.canvas.requestRenderAll()
    }
  }

  private scaleBackground = (object: fabric.Object) => {
    const frame = this.scene.frame
    const zoomRatio = this.scene.canvas.getZoom()

    if (object.type === "BackgroundImage") {
      const isFramePortrait = frame.height! > frame.width!
      const isObjectPortrait = object.height! > object.width!
      const refSize = Math.max(frame.height!, frame.width!)
      const refWidth = zoomRatio * refSize
      if (isFramePortrait) {
        if (isObjectPortrait) {
          object.scaleToWidth(refWidth)
        } else {
          object.scaleToHeight(refWidth)
        }
      } else {
        if (isObjectPortrait) {
          object.scaleToHeight(refWidth)
        } else {
          object.scaleToWidth(refWidth)
        }
      }
    }
    object.center()
  }

  public updateSolidGradientBackground = (options: Partial<ILayer>) => {
    const background = this.currentBackground as any
    // @ts-ignore
    if (options.gradient) {
      // @ts-ignore
      setObjectGradient(background, options.gradient)
    } else {
      background.set(options)
    }
  }

  public async recreateBackground(options: Partial<ILayer>) {
    const currentBackground = this.currentBackground
    const frame = this.scene.frame
    const zoomRatio = this.scene.canvas.getZoom()
    if (options.type === LayerType.BACKGROUND_IMAGE) {
      const background = (await this.generateBackgroundImage(options)) as any
      this.scene.canvas.insertAt(background, 2, false)
      background.scaleToWidth(frame.width! * zoomRatio)
      background.center()
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

    if (options.gradient) {
      const gradient = generateObjectGradient(background, options.gradient)
      background.set("fill", gradient)
    }

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
    const currentBackground = objects.find(
      (o) => o.type === LayerType.BACKGROUND || o.type === LayerType.BACKGROUND_IMAGE
    )

    return currentBackground
  }
}

export default Background
