import React from "react"
import { useStyletron } from "baseui"
import Add from "~/components/Icons/Add"
import useDesignEditorPages from "~/hooks/useDesignEditorScenes"
import { DesignEditorContext } from "~/contexts/DesignEditor"
import { nanoid } from "nanoid"
import { getDefaultTemplate } from "~/constants/design-editor"
import { useActiveScene, useEditor, useScenes } from "@layerhub-pro/react"
import { IScene } from "@layerhub-pro/types"
import SceneItem from "./SceneItem"
import { Block } from "baseui/block"
import useContextMenuTimelineRequest from "~/hooks/useContextMenuTimelineRequest"
import SceneContextMenu from "./SceneContextMenu"
import Scrollable from "~/components/Scrollable"

export default function () {
  const scenes = useScenes()
  const activeScene = useActiveScene()

  const editor = useEditor()
  const [css] = useStyletron()
  const contextMenuTimelineRequest = useContextMenuTimelineRequest()

  const addScene = React.useCallback(() => {
    if (editor) {
      editor.design.addScene()
    }
  }, [editor])

  const setActiveScene = React.useCallback(
    (id: string) => {
      if (editor) {
        editor.design.setActiveScene(id)
      }
    },
    [editor]
  )

  return (
    <Block $style={{ flex: 1, display: "flex", height: "130px" }}>
      <Scrollable>
        <Block id="TimelineItemsContainer" $style={{ padding: "0.25rem 0.75rem", background: "#ffffff" }}>
          <div className={css({ display: "flex", alignItems: "center" })}>
            {contextMenuTimelineRequest.visible && <SceneContextMenu />}
            {scenes.map((scene, index) => {
              return (
                <SceneItem
                  key={index}
                  isCurrentScene={activeScene && activeScene.id === scene.id}
                  scene={scene}
                  index={index}
                  setActiveScene={setActiveScene}
                  preview={scene.preview}
                />
              )
            })}
            <div
              style={{
                background: "#ffffff",
                padding: "1rem 1rem 1rem 0.5rem",
              }}
            >
              <div
                onClick={addScene}
                className={css({
                  width: "100px",
                  height: "56px",
                  background: "rgb(243,244,246)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                })}
              >
                <Add size={20} />
              </div>
            </div>
          </div>
        </Block>
      </Scrollable>
    </Block>
  )
}
