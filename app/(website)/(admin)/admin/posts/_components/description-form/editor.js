'use client'
import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"

import React, { useMemo } from 'react'

const Editor = ({onChange, value}) => {
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), {
        ssr:false
    }), [])
  return (
    <div className="bg-white">
        <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        />
    </div>
  )
}

export default Editor