import { IStaticText } from "@layerhub-pro/types"
import { groupBy } from "lodash"
import { IFontFamily } from "~/interfaces/editor"

const generateMockFont = (options: { family: string; color: string }) => {
  return {
    color: options.color,
    family: options.family,
    bold: false,
    italic: false,
    styleOptions: {
      hasBold: false,
      hasItalic: false,
      options: [
        {
          id: "font_UuUROxd7E08W3MafVUIykLs5",
          family: options.family,
          full_name: options.family,
          post_script_name: options.family,
          preview: "",
          style: options.family,
          url: "",
          category: "sans-serif",
          user_id: "",
        },
      ],
    },
  }
}
export const getTextProperties = (object: Required<IStaticText>, fonts: IFontFamily[]) => {
  const color = object.fill
  const family = object.fontFamily
  const selectedFont = fonts.find((sampleFont) => sampleFont.post_script_name === family)
  if (!selectedFont) {
    return generateMockFont({
      family,
      color,
    })
  }
  const groupedFonts = groupBy(fonts, "family")
  const selectedFamily = groupedFonts[selectedFont!?.family]
  const hasBold = selectedFamily.find((font) => font.post_script_name.includes("-Bold"))
  const hasItalic = selectedFamily.find((font) => font.post_script_name.includes("-Italic"))
  const styleOptions = {
    hasBold: !!hasBold,
    hasItalic: !!hasItalic,
    options: selectedFamily,
  }
  return {
    color,
    family: selectedFamily[0].family,
    bold: family.includes("Bold"),
    italic: family.includes("Italic"),
    underline: object.underline,
    styleOptions,
  }
}
