import React from "react"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { HexColorPicker } from "react-colorful"
import { Delete } from "baseui/icon"
import { throttle } from "lodash"
import { useActiveScene } from "@layerhub-pro/react"
import useAppContext from "~/hooks/useAppContext"
import { Tabs, Tab } from "baseui/tabs"

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
  const [activeKey, setActiveKey] = React.useState("0")

  const setBackgroundColor = throttle((color: string) => {
    if (scene) {
      scene.updateBackground({
        fill: color,
      })
    }
  }, 100)

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
              setActiveKey(activeKey)
            }}
            activeKey={activeKey}
          >
            <Tab title="Solid">
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
                <HexColorPicker onChange={setBackgroundColor} style={{ width: "100%" }} />
                <Block>
                  <Block $style={{ padding: "0.75rem 0", fontWeight: 500, fontSize: "14px" }}>Preset colors</Block>
                </Block>
              </Block>
            </Tab>
            <Tab title="Gradient">Content 2</Tab>
            <Tab title="Image">Content 3</Tab>
          </Tabs>
        </Block>
        <Block padding={"1.5rem"}>Background images</Block>
      </Scrollable>
    </Block>
  )
}
