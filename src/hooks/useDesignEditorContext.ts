import { useContext } from "react"
import { DesignEditorContext } from "~/contexts/DesignEditor"

function useDesignEditorContext() {
  const {
    editorType,
    setEditorType,
    displayPlayback,
    setDisplayPlayback,
    setDisplayPreview,
    displayPreview,
    currentScene,
    setCurrentScene,
    setScenes,
    scenes,
    maxTime,
    setMaxTime,
    contextMenuTimelineRequest,
    setContextMenuTimelineRequest,
    currentDesign,
    setCurrentDesign,
    isFullScreen,
    toggleFullScreen,
    designEditorLoading,
    setDesignEditorLoading,
    displayResize,
    setDisplayResize,
  } = useContext(DesignEditorContext)
  return {
    editorType,
    setEditorType,
    displayPlayback,
    setDisplayPlayback,
    setDisplayPreview,
    displayPreview,
    currentScene,
    setCurrentScene,
    setScenes,
    scenes,
    maxTime,
    setMaxTime,
    contextMenuTimelineRequest,
    setContextMenuTimelineRequest,
    currentDesign,
    setCurrentDesign,
    isFullScreen,
    toggleFullScreen,
    designEditorLoading,
    setDesignEditorLoading,
    displayResize,
    setDisplayResize,
  }
}

export default useDesignEditorContext
