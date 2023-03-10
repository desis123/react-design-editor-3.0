type FontVariant = "300" | "regular" | "400" | "500" | "600" | "700" | "800"

export interface Resource {
  id: string
  preview: string
  src: string
  object: string
}

export interface IFontFamily {
  id: string
  category: string
  family: string
  full_name: string
  post_script_name: string
  preview: string
  style: string
  url: string
}

export interface TextOptions {
  underline: boolean
  textAlign: string
  fontSize: number
  fill: string
  charSpacing: number
  lineHeight: number
  fontFamily: string
  isGroup: boolean
  isMultiple: boolean
  styles: any[]
  font: any
  activeStyle: any
}

export interface Uploading {
  status: string
  progress: number
}
export interface IUpload {
  id: string
  contentType: string
  folder: string
  name: string
  type: string
  url: string
}

export interface Param {
  key: string
  name: string
  value: string
}
