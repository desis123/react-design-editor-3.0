import { Block } from "baseui/block"
import { Spinner, SIZE } from "baseui/spinner"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"

export default function () {
  const { designEditorLoading } = useDesignEditorContext()

  return (
    <>
      {designEditorLoading.isLoading ? (
        <Block
          $style={{
            height: "100%",
            width: "100%",
            background: "#f1f2f6",
            position: "absolute",
            zIndex: 100,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner $size={SIZE.medium} />
        </Block>
      ) : null}
    </>
  )
}
