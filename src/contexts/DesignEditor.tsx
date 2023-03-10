import { IScene } from "@layerhub-pro/types"
import React from "react"
import { useToggle } from "react-use"
import { ContextMenuTimelineRequest, DesignType, IDesign } from "~/interfaces/DesignEditor"

interface ISceneEditorContext {
  scenes: IScene[]
  setScenes: (value: ((prevState: IScene[]) => IScene[]) | IScene[]) => void
  currentScene: IScene | null
  setCurrentScene: React.Dispatch<React.SetStateAction<IScene | null>>
  currentDesign: IDesign
  setCurrentDesign: React.Dispatch<React.SetStateAction<IDesign>>
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  editorType: DesignType
  setEditorType: React.Dispatch<React.SetStateAction<DesignType>>
  displayPlayback: boolean
  setDisplayPlayback: React.Dispatch<React.SetStateAction<boolean>>
  displayResize: boolean
  setDisplayResize: React.Dispatch<React.SetStateAction<boolean>>
  displayPreview: boolean
  setDisplayPreview: React.Dispatch<React.SetStateAction<boolean>>
  currentPreview: string
  setCurrentPreview: React.Dispatch<React.SetStateAction<string>>
  maxTime: number
  setMaxTime: React.Dispatch<React.SetStateAction<number>>
  contextMenuTimelineRequest: ContextMenuTimelineRequest
  setContextMenuTimelineRequest: React.Dispatch<React.SetStateAction<ContextMenuTimelineRequest>>
  isFullScreen: boolean
  toggleFullScreen: () => void
  designEditorLoading: DesignEditorState
  setDesignEditorLoading: (props: DesignEditorState) => void
}

export const DesignEditorContext = React.createContext<ISceneEditorContext>({
  isFullScreen: false,
  toggleFullScreen: () => {},
  scenes: [],
  setScenes: () => {},
  currentScene: null,
  setCurrentScene: () => {},
  currentDesign: {
    id: "",
    frame: {
      width: 1,
      height: 1,
    },
    metadata: {},
    name: "",
    previews: [],
    scenes: [],
    type: "",
  },
  setCurrentDesign: () => {},
  isSidebarOpen: true,
  setIsSidebarOpen: () => {},
  editorType: "NONE",
  setEditorType: () => {},
  displayPlayback: false,
  setDisplayPlayback: () => {},
  displayPreview: false,
  setDisplayPreview: () => {},
  displayResize: false,
  setDisplayResize: () => {},
  setCurrentPreview: () => {},
  currentPreview: "",
  maxTime: 0,
  setMaxTime: () => {},
  contextMenuTimelineRequest: {
    id: "",
    left: 0,
    top: 0,
    visible: false,
  },
  setContextMenuTimelineRequest: () => {},
  designEditorLoading: {
    isLoading: true,
    preview: "",
  },
  setDesignEditorLoading(props) {},
})

interface DesignEditorState {
  isLoading: boolean
  preview: string
}

export const DesignEditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFullScreen, toggleFullScreen] = useToggle(false)
  const [scenes, setScenes] = React.useState<IScene[]>([])
  const [currentScene, setCurrentScene] = React.useState<IScene | null>(null)
  const [currentDesign, setCurrentDesign] = React.useState<IDesign>({
    id: "",
    frame: {
      width: 1,
      height: 1,
    },
    metadata: {},
    name: "",
    previews: [],
    scenes: [],
    type: "",
  })
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const [editorType, setEditorType] = React.useState<DesignType>("NONE")
  const [displayPlayback, setDisplayPlayback] = React.useState<boolean>(false)
  const [displayPreview, setDisplayPreview] = React.useState<boolean>(false)
  const [displayResize, setDisplayResize] = React.useState<boolean>(false)
  const [currentPreview, setCurrentPreview] = React.useState<string>("")
  const [maxTime, setMaxTime] = React.useState(5000)
  const [designEditorLoading, setDesignEditorLoading] = React.useState<{
    isLoading: boolean
    preview: string
  }>({
    isLoading: false,
    preview: "",
  })
  const [contextMenuTimelineRequest, setContextMenuTimelineRequest] = React.useState<ContextMenuTimelineRequest>({
    id: "",
    left: 0,
    top: 0,
    visible: false,
  })
  const context = {
    scenes,
    setScenes,
    currentScene,
    setCurrentScene,
    currentDesign,
    setCurrentDesign,
    isSidebarOpen,
    setIsSidebarOpen,
    editorType,
    setEditorType,
    displayPlayback,
    setDisplayPlayback,
    displayPreview,
    setDisplayPreview,
    currentPreview,
    setCurrentPreview,
    maxTime,
    setMaxTime,
    contextMenuTimelineRequest,
    setContextMenuTimelineRequest,
    isFullScreen,
    toggleFullScreen,
    designEditorLoading,
    setDesignEditorLoading,
    displayResize,
    setDisplayResize,
  }
  return <DesignEditorContext.Provider value={context}>{children}</DesignEditorContext.Provider>
}
