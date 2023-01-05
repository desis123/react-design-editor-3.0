import { fabric } from "fabric"
import groupBy from "lodash/groupBy"

class StaticVectorObject extends fabric.Group {
  static type = "StaticVector"
  public src: string
  public objectColors: Record<string, any[]> = {}
  public colorMap = {}
  private watermark: string
  private _watermark: fabric.Group | fabric.Object

  public updateLayerColor(prev: string, next: string) {
    const sameObjects = this.objectColors[prev]

    if (sameObjects) {
      sameObjects.forEach((c) => {
        c.fill = next
      })
      this.canvas?.requestRenderAll()
      // @ts-ignore
      this.colorMap[prev] = next
    }
  }

  //@ts-ignore
  initialize(objects, options, others) {
    this.watermark = others.watermark

    const existingColorMap = others.colorMap
    const objectColors = groupBy(objects, "fill")
    // set colorMap
    if (existingColorMap) {
      Object.keys(existingColorMap).forEach((color) => {
        const colorObjects = objectColors[color]
        if (colorObjects) {
          // @ts-ignore
          colorObjects.forEach((c) => {
            c.fill = existingColorMap[color]
          })
        }
      })
    }
    this.objectColors = objectColors

    const colorMap: Record<string, string> = {}

    Object.keys(objectColors).forEach((c) => {
      colorMap[c] = c
    })
    if (existingColorMap) {
      Object.keys(existingColorMap).forEach((c) => {
        colorMap[c] = existingColorMap[c]
      })
    }
    this.colorMap = colorMap

    this.set("src", others.src)

    if (this.watermark) {
      if (!this._watermark) {
        fabric.loadSVGFromURL(
          this.watermark,
          (watermarkObjects, waterMarkOptions) => {
            const object = fabric.util.groupSVGElements(objects, options)
            const watermarkGroup = fabric.util.groupSVGElements(watermarkObjects, {
              ...waterMarkOptions,
              opacity: 0.5,
              top: options.height / 2 - waterMarkOptions.height / 2,
              left: options.width / 2 - waterMarkOptions.width / 2,
            })
            this._watermark = watermarkGroup
            // @ts-ignore
            super.initialize([object, watermarkGroup], { ...others, colorMap })
            if (this.canvas) {
              this.canvas.requestRenderAll()
            }
          },
          // @ts-ignore
          null,
          { crossOrigin: "Anonymous" }
        )

        return this
      } else {
        const object = fabric.util.groupSVGElements(objects, options)
        // @ts-ignore
        super.initialize([object, this._watermark], { ...others, colorMap })
        if (this.canvas) {
          this.canvas.requestRenderAll()
        }

        return this
      }
    } else {
      const object = fabric.util.groupSVGElements(objects, options)
      // @ts-ignore
      super.initialize([object], { ...others, colorMap })
      if (this.canvas) {
        this.canvas.requestRenderAll()
      }
      return this
    }
  }

  toObject(propertiesToInclude = []) {
    // @ts-ignore
    return super.toObject(propertiesToInclude, {
      src: this.src,
      watermark: this.watermark,
    })
  }
  toJSON(propertiesToInclude = []) {
    // @ts-ignore
    return super.toObject(propertiesToInclude, {
      src: this.src,
      watermark: this.watermark,
    })
  }

  static fromObject(options: any, callback: Function) {
    fabric.loadSVGFromURL(options.src, (objects, opts) => {
      return callback && callback(new fabric.StaticVector(objects, opts, { ...options }))
    })
  }
}

fabric.StaticVector = fabric.util.createClass(StaticVectorObject, {
  type: StaticVectorObject.type,
})

fabric.StaticVector.fromObject = StaticVectorObject.fromObject

export type SvgOptions = fabric.Group & { text: string }

declare module "fabric" {
  namespace fabric {
    class StaticVector extends StaticVectorObject {
      constructor(objects: any, options: any, others: any)
    }
  }
}

export default StaticVectorObject
