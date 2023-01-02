import React from "react"
import { Block } from "baseui/block"
import { Button } from "baseui/button"
import { Check } from "baseui/icon"
import { useActiveScene } from "@layerhub-pro/react"

export default function () {
  const activeScene = useActiveScene()
  const makeCrop = React.useCallback(() => {
    if (activeScene) {
      activeScene.objects.applyCrop()
    }
  }, [activeScene])
  return (
    <Block
      $style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        justifyContent: "space-between",
      }}
    >
      <Button onClick={makeCrop} startEnhancer={() => <Check size={24} />} size="compact" kind="tertiary">
        Apply Crop
      </Button>
    </Block>
  )
}
