import React from "react"
import { Context } from "../context"
import { ILayer } from "@layerhub-pro/types"

export function useObjects<T>() {
  const { objects } = React.useContext(Context)

  return objects as ILayer[]
}
