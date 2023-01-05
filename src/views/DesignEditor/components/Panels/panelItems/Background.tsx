import React from "react"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { HexColorPicker } from "react-colorful"
import { Delete } from "baseui/icon"
import { throttle } from "lodash"
import { useActiveScene } from "@layerhub-pro/react"
import useAppContext from "~/hooks/useAppContext"
import { Tabs, Tab } from "baseui/tabs"
import { BACKGROUND_GRADIENTS, BACKGROUND_IMAGES } from "~/constants/editor"
import { Input } from "baseui/input"
import { PLACEMENT, StatefulPopover } from "baseui/popover"

const PRESET_COLORS = [
  "#f44336",
  "#ff9800",
  "#ffee58",
  "#66bb6a",
  "#26a69a",
  "#03a9f4",
  "#3f51b5",
  "#673ab7",
  "#9c27b0",
  "#ec407a",
  "#8d6e63",
  "#d9d9d9",
]

export default function () {
  const scene = useActiveScene()
  const { setActiveSubMenu } = useAppContext()
  const [isLoading, setIsLoading] = React.useState(false)
  const [activeKey, setActiveKey] = React.useState("0")

  const setBackgroundMode = async (k: string) => {
    // setIsLoading(true)
    if (k !== activeKey) {
      setActiveKey(k)
      // console.log({ k })
    }
  }

  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem 1.5rem 1rem",
        }}
      >
        <Block>Background</Block>

        <Block onClick={() => setActiveSubMenu("")} $style={{ cursor: "pointer", display: "flex" }}>
          <Delete size={24} />
        </Block>
      </Block>
      <Scrollable>
        <Block $style={{ padding: "0 1.5rem" }}>
          <Tabs
            overrides={{
              Tab: {
                style: {
                  flex: 1,
                  textAlign: "center",
                },
              },
              TabContent: {
                style: {
                  paddingLeft: 0,
                  paddingRight: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                },
              },
            }}
            onChange={({ activeKey }) => {
              // @ts-ignore
              setBackgroundMode(activeKey)
            }}
            activeKey={activeKey}
          >
            <Tab title="Solid">
              <SolidBackround />
            </Tab>
            <Tab title="Gradient">
              <GradientBackground />
            </Tab>
            <Tab title="Image">
              <ImageBackground />
            </Tab>
          </Tabs>
        </Block>
      </Scrollable>
    </Block>
  )
}

const GradientBackground = () => {
  const activeScene = useActiveScene()
  const [state, setState] = React.useState({
    angle: 0,
    angleTemp: 0,
    colors: ["#F4D03F", "#16A085"],
  })
  const setGradient = (options: any) => {
    setState({ ...state, ...options, angleTemp: options.angle })
    // @ts-ignore
    activeScene.background.update({ gradient: options })
  }
  return (
    <Block $style={{ padding: "0.5rem 0" }}>
      <Block
        $style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
          gap: "0.35rem",
        }}
      >
        {BACKGROUND_GRADIENTS.map((gradient, index) => {
          return (
            <Block
              onClick={() => setGradient(gradient)}
              key={index}
              $style={{
                borderRadius: "4px",
                height: "38px",
                cursor: "pointer",
                backgroundColor: "#3EECAC",
                backgroundImage: `linear-gradient(${gradient.angle + 90}deg, ${gradient.colors[0]}, ${
                  gradient.colors[1]
                })`,
              }}
            ></Block>
          )
        })}
      </Block>
    </Block>
  )
}
const ImageBackground = () => {
  const activeScene = useActiveScene()

  const setBackgroundImage = React.useCallback(
    (url: string) => {
      if (activeScene) {
        activeScene.background.update({
          type: "BackgroundImage",
          src: url,
        })
      }
    },
    [activeScene]
  )
  return (
    <Block>
      <Block $style={{ padding: "0.5rem 0" }}>
        <Block
          $style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
            gap: "0.35rem",
          }}
        >
          {BACKGROUND_IMAGES.map((image, index) => (
            <Block
              $style={{
                cursor: "pointer",
                borderRadius: "4px",
                backgroundImage: `url("${image}")`,
                backgroundSize: "cover",
              }}
              onClick={() => setBackgroundImage(image)}
              height={"38px"}
              key={index}
            ></Block>
          ))}
        </Block>
      </Block>
    </Block>
  )
}
const SolidBackround = () => {
  const activeScene = useActiveScene()

  const setBackgroundColor = React.useCallback(
    throttle((color: string) => {
      if (activeScene) {
        activeScene.background.update({
          fill: color,
        })
      }
    }, 100),
    [activeScene]
  )

  return (
    <Block>
      <Block $style={{ padding: "0.5rem 0" }}>
        <Block
          $style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
            gap: "0.35rem",
          }}
        >
          {PRESET_COLORS.map((color, index) => (
            <Block
              $style={{
                cursor: "pointer",
                borderRadius: "4px",
              }}
              onClick={() => setBackgroundColor(color)}
              backgroundColor={color}
              height={"38px"}
              key={index}
            ></Block>
          ))}
        </Block>
        <Block $style={{ padding: "1rem 0" }}>
          <Block $style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <StatefulPopover
              placement={PLACEMENT.bottomLeft}
              content={
                <div
                  style={{
                    padding: "1rem",
                    background: "#ffffff",
                    width: "200px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    textAlign: "center",
                  }}
                >
                  <HexColorPicker
                    onChange={(color) => {
                      // changeBackgroundColor(c, color)
                    }}
                  />
                </div>
              }
              accessibilityType={"tooltip"}
            >
              <Block
                $style={{ height: "32px", width: "32px", background: "#000000", flex: "none", borderRadius: "4px" }}
              >
                C
              </Block>
            </StatefulPopover>

            <Input size="compact" value={"#FFFFFF"} />
          </Block>
        </Block>
        {/* <HexColorPicker onChange={setBackgroundColor} style={{ width: "100%" }} /> */}
      </Block>
    </Block>
  )
}
