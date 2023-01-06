import React from "react"
import { useDesign } from "@layerhub-pro/react"
import { Block } from "baseui/block"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import useOnClickOutside from "~/hooks/useOnClickOutside"

export default function () {
  const { setContextMenuTimelineRequest, contextMenuTimelineRequest } = useDesignEditorContext()
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
    design?.deleteScene(id)
    setContextMenuTimelineRequest({ ...contextMenuTimelineRequest, visible: false })
  }

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
