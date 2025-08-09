"use client"
import * as React from "react"
import { ReactNode } from 'react'
// import { cn } from "@repo/design-system/lib/utils"

interface BoxProps {
    children: any // ReactNode
}

function Box({ children }: BoxProps) {
    return <div className="box">{children}</div>
}

export { Box }