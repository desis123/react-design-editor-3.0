import React from "react"
import { Block } from "baseui/block"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import useOnClickOutside from "~/hooks/useOnClickOutside"
import { useDesign } from "@layerhub-pro/react"

export default function () {
  const { scenes, setScenes, setContextMenuTimelineRequest, contextMenuTimelineRequest } = useDesignEditorContext()
  const ref = React.useRef<HTMLDivElement | null>(null)
  const design = useDesign()

  useOnClickOutside(ref, () => {
    setContextMenuTimelineRequest({ ...contextMenuTimelineRequest, visible: false })
  })

  const timelineItemsContainerBounds = document.getElementById("TimelineItemsContainer")?.getBoundingClientRect() || {
    top: 0,
    left: 0,
  }

  const makeDeleteScene = async (id: string) => {
    // const updatedScenes = scenes.filter((scene) => scene.id !== contextMenuTimelineRequest.id)
    design?.deleteScene(id)
    setContextMenuTimelineRequest({ ...contextMenuTimelineRequest, visible: false })
    // if (updatedScenes[0]) {
    //   setScenes(updatedScenes)
    // } else {
    //   // const defaultTemplate = getDefaultTemplate({
    //   //   width: frame.width,
    //   //   height: frame.height,
    //   // })
    //   // await editor.scene.importFromJSON(defaultTemplate)
    //   // setCurrentDesign({
    //   //   id: nanoid(),
    //   //   frame: defaultTemplate.frame,
    //   //   metadata: {},
    //   //   name: "Untitled Design",
    //   //   previews: [],
    //   //   scenes: [],
    //   //   type: "VIDEO",
    //   // })
    //   // const initialDesign = editor.scene.exportToJSON() as any
    //   // const preview = await renderer.render(initialDesign, {})
    //   // setCurrentScene({ ...initialDesign, preview: preview, duration: 5000 })
    //   // setScenes([{ ...initialDesign, preview: preview, duration: 5000 }])
    // }
  }

  const makeAddScene = () => {}

  const makeDuplicateScene = async () => {
    design?.duplicateScene()
    setContextMenuTimelineRequest({ ...contextMenuTimelineRequest, visible: false })
  }

  return (
    <Block
      ref={ref}
      $style={{
        width: "160px",
        position: "absolute",
        backgroundColor: "#ffffff",
        boxShadow: "0 0 0 1px rgba(64,87,109,0.07),0 2px 12px rgba(53,71,90,0.2)",
        zIndex: 4,
        top: `${-4}px`,
        left: `${contextMenuTimelineRequest.left - timelineItemsContainerBounds.left}px`,
        padding: "0.5rem 0",
      }}
    >
      <Block
        onClick={makeDuplicateScene}
        $style={{
          fontSize: "14px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          padding: "0 1rem",
          ":hover": {
            backgroundColor: "rgba(0,0,0,0.1)",
            cursor: "pointer",
          },
        }}
      >
        Duplicate
      </Block>
      <Block
        onClick={() => makeDeleteScene(contextMenuTimelineRequest.id)}
        $style={{
          fontSize: "14px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          padding: "0 1rem",
          ":hover": {
            backgroundColor: "rgba(0,0,0,0.1)",
            cursor: "pointer",
          },
        }}
      >
        Delete
      </Block>
    </Block>
  )
}
