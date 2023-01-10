import React from "react"
import { Modal, ROLE } from "baseui/modal"
import { Tabs, Tab } from "baseui/tabs"
import { Button, SIZE } from "baseui/button"
import { Block } from "baseui/block"
import SwapHorizontal from "~/components/Icons/SwapHorizontal"
import { Input } from "baseui/input"
import Scrollable from "~/components/Scrollable"
import { sampleFrames } from "~/constants/editor"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { useDesign, useObjects } from "@layerhub-pro/react"

const Resize = () => {
  const { displayResize } = useDesignEditorContext()

  return <>{displayResize && <ResizeModal />}</>
}

const ResizeModal = () => {
  const { displayResize: isOpen, setDisplayResize: setIsOpen } = useDesignEditorContext()
  const [frame, setFrame] = React.useState<any>()
  const objects = useObjects() as any[]
  const [activeKey, setActiveKey] = React.useState<string | number>("0")
  const design = useDesign()
  const [desiredFrame, setDesiredFrame] = React.useState({
    width: 0,
    height: 0,
  })
  const [selectedFrame, setSelectedFrame] = React.useState<any>({
    id: 0,
    width: 0,
    height: 0,
  })

  React.useEffect(() => {
    if (frame) {
      setDesiredFrame({
        width: frame.width,
        height: frame.height,
      })
    }
  }, [frame])

  React.useEffect(() => {
    const frame = objects.find((o) => o.type === "Frame")
    if (frame) {
      setFrame(frame)
    }
  }, [objects])

  const applyResize = React.useCallback(async () => {
    // @ts-ignore
    const size = activeKey === "0" ? selectedFrame : desiredFrame
    if (design) {
      await design.resize({
        width: parseInt(size.width),
        height: parseInt(size.height),
      })
    }

    setIsOpen(false)
  }, [design, selectedFrame, desiredFrame])
  const isEnabled =
    // @ts-ignore
    (activeKey === "0" && selectedFrame.id !== 0) ||
    // @ts-ignore
    (activeKey === "1" && !!parseInt(desiredFrame.width) && !!parseInt(desiredFrame.height))

  return (
    <>
      <Modal
        onClose={() => setIsOpen(false)}
        closeable={true}
        isOpen={isOpen}
        animate
        autoFocus
        size="auto"
        role={ROLE.dialog}
        overrides={{
          Dialog: {
            style: {
              borderTopRightRadius: "8px",
              borderEndStartRadius: "8px",
              borderEndEndRadius: "8px",
              borderStartEndRadius: "8px",
              borderStartStartRadius: "8px",
            },
          },
        }}
      >
        <Block $style={{ padding: "0 1.5rem", width: "440px" }}>
          <Block
            $style={{
              padding: "2rem 1rem 1rem",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Choose a format and resize your template.
          </Block>
          <Tabs
            overrides={{
              TabContent: {
                style: {
                  paddingLeft: 0,
                  paddingRight: 0,
                },
              },
              Tab: {
                style: {
                  flex: 1,
                  textAlign: "center",
                },
              },
              TabBar: {
                style: {
                  flex: 1,
                  // alignItems: "center",
                  // display: "flex",
                  // justifyContent: "center",
                  // backgroundColor: "#ffffff",
                },
              },
            }}
            activeKey={activeKey}
            onChange={({ activeKey }) => {
              setActiveKey(activeKey)
            }}
          >
            <Tab title="Preset size">
              <Block $style={{ width: "100%", height: "400px", display: "flex" }}>
                <Scrollable>
                  <Block $style={{ display: "grid" }}>
                    {sampleFrames.map((sampleFrame, index) => (
                      <Block
                        onClick={() => setSelectedFrame(sampleFrame)}
                        $style={{
                          padding: "0.5rem",
                          backgroundColor: selectedFrame.id === sampleFrame.id ? "rgb(243,244,245)" : "#ffffff",
                          ":hover": {
                            backgroundColor: "rgb(246,247,248)",
                            cursor: "pointer",
                          },
                        }}
                        key={index}
                      >
                        <Block $style={{ fontSize: "13px" }}>
                          <Block $style={{ fontWeight: 500 }}>{sampleFrame.name}</Block>
                          <Block $style={{ color: "rgb(119,119,119)" }}>
                            {sampleFrame.width} x {sampleFrame.height}px
                          </Block>
                        </Block>
                      </Block>
                    ))}
                  </Block>
                </Scrollable>
              </Block>
            </Tab>
            <Tab title="Custom size">
              <Block $style={{ padding: "2rem 2rem" }}>
                <Block
                  $style={{ display: "grid", gridTemplateColumns: "1fr 50px 1fr", alignItems: "end", fontSize: "14px" }}
                >
                  <Input
                    onChange={(e: any) => setDesiredFrame({ ...desiredFrame, width: e.target.value })}
                    value={desiredFrame.width}
                    startEnhancer="W"
                    size={SIZE.compact}
                  />
                  <Button
                    overrides={{
                      Root: {
                        style: {
                          height: "32px",
                        },
                      },
                    }}
                    size={SIZE.compact}
                    kind="tertiary"
                  >
                    <SwapHorizontal size={24} />
                  </Button>
                  <Input
                    onChange={(e: any) => setDesiredFrame({ ...desiredFrame, height: e.target.value })}
                    value={desiredFrame.height}
                    startEnhancer="H"
                    size={SIZE.compact}
                  />
                </Block>
              </Block>
            </Tab>
          </Tabs>
        </Block>
        <Block
          $style={{
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "2rem",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          <Button kind="secondary" size="compact" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button size="compact" disabled={!isEnabled} onClick={applyResize}>
            Resize template
          </Button>
        </Block>
      </Modal>
    </>
  )
}

export default Resize
