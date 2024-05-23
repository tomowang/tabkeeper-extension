import { ElementType, ReactNode } from "react"

export interface IMenu {
  path: string
  title: string
  icon: ElementType
  element: ReactNode
}
