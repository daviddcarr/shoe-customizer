import { useEffect, useRef, useState } from "react"
import { fabric } from "fabric"
import { ChromePicker } from "react-color"

import { CgShapeSquare, CgShapeTriangle, CgShapeCircle } from "react-icons/cg"
import { RiPaintFill, RiDeleteBin6Line, RiCloseCircleLine, RiGridLine } from "react-icons/ri"
import { BsCircleFill } from "react-icons/bs"
import { FaShapes, FaPaintBrush } from "react-icons/fa"

import UIButton from "./UIButton"

export default function DrawingCanvas({applyTexture, tutorialState, setTutorialState}) {

    // Refs
    const canvasRef = useRef()

    // States
    const [isDrawingMode, setIsDrawingMode] = useState(false)
    const [currentColor, setCurrentColor] = useState("#ff3333")
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [brushSize, setBrushSize] = useState(5)
    const [showOverlay, setShowOverlay] = useState(false)

    // Effects
    useEffect(() => {
        if (!canvasRef.current) {

            canvasRef.current = new fabric.Canvas("fabric-canvas", {
                height: 512,
                width: 512,
                isDrawingMode: isDrawingMode,
                backgroundColor: "#ffffff",
            })

            canvasRef.current.freeDrawingBrush.color = currentColor
            canvasRef.current.freeDrawingBrush.width = brushSize

            resizeCanvas()

            window.onresize = () => {
                resizeCanvas()
            }
        }

    }, [])

    useEffect(() => {
        if (canvasRef.current) {
            applyTexture()
        }
    }, [canvasRef, applyTexture])

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.isDrawingMode = isDrawingMode
        }
    }, [isDrawingMode])

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.freeDrawingBrush.color = currentColor
        }
    }, [currentColor])


    // Methods
    const addSquare = () => {
        console.log("add square")

        var rect = new fabric.Rect({
            left: 250,
            top: 250,
            fill: currentColor,
            width: 20,
            height: 20
        })

        canvasRef.current.add(rect)
    }

    const addTriangle = () => {
        console.log("add triangle")

        var triangle = new fabric.Triangle({
            left: 250,
            top: 250,
            fill: currentColor,
            width: 20,
            height: 20
        })

        canvasRef.current.add(triangle)
    }

    const addCircle = () => {
        console.log("add circle")

        var circle = new fabric.Circle({
            left: 250,
            top: 250,
            fill: currentColor,
            radius: 10
        })

        canvasRef.current.add(circle)
    }

    const updateBrushSize = (size) => {
        setBrushSize(size)
        canvasRef.current.freeDrawingBrush.width = size
    }

    const deleteSelected = () => {

        const activeObjects = canvasRef.current.getActiveObjects()
        
        console.log("activeObjects", activeObjects)

        activeObjects.forEach(object => {
            console.log("object", object)
            canvasRef.current.remove(object)
        })
    }

    const resizeCanvas = () => {
        const outerCanvasContainer = document.getElementById("fabric-canvas-wrapper")

        const ratio = canvasRef.current.getWidth() / canvasRef.current.getHeight()
        const containerWidth = outerCanvasContainer.clientWidth
        const scale = containerWidth / canvasRef.current.getWidth()
        const zoom = canvasRef.current.getZoom() * scale

        canvasRef.current.setDimensions({ width: containerWidth, height: containerWidth / ratio })
        canvasRef.current.setViewportTransform([zoom, 0, 0, zoom, 0, 0])
    }


    return (
        <>
            <div id="fabric-canvas-wrapper" className="relative">
                <canvas
                    id="fabric-canvas" 
                    className="rounded-lg relative"
                    />
                {
                    showOverlay &&
                    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                        <img src="./canvas_guide.png" alt="Canvas Guide" className="w-full h-full object-contain" />
                    </div>
                }
                { showColorPicker &&
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <ChromePicker
                            color={currentColor}
                            onChange={(color) => setCurrentColor(color.hex)}
                            />
                    </div>
                }
            </div>
            <div className="toolbar w-full flex justify-start gap-2 items-stretch mt-2">
                <UIButton
                    className="bg-white hover:bg-purple-900 hover:text-white text-xl px-2 py-2 rounded-lg"
                    onClick={() => setIsDrawingMode(!isDrawingMode)}
                    tooltip={`Toggle ${isDrawingMode ? "Edit" : "Drawing"} Mode`}
                    showTutorial={tutorialState === 0}
                    tutorial="Click here to toggle between drawing and editing mode."
                    tutorialState={tutorialState}
                    setTutorialState={setTutorialState}
                    >
                        { isDrawingMode ? <FaShapes /> : <FaPaintBrush /> }
                </UIButton>
                <UIButton
                    className={`px-2 py-1 rounded-lg text-xl ${showColorPicker ? "text-red-600" : ""}`}
                    style={{backgroundColor: !showColorPicker ? currentColor : "#BBB"}}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    tooltip={showColorPicker ? "Close Color Picker" : "Open Color Picker"}
                    showTutorial={tutorialState === 1}
                    tutorial="Click here to open and close the color picker."
                    tutorialState={tutorialState}
                    setTutorialState={setTutorialState}
                    >
                    { !showColorPicker ? <RiPaintFill /> : <RiCloseCircleLine /> }
                </UIButton>
                <UIButton
                    className={`${showOverlay ? "bg-purple-800" : "bg-white"} hover:bg-purple-900 hover:text-white text-xl px-2 py-2 rounded-lg`}
                    onClick={() => setShowOverlay(!showOverlay)}
                    tooltip={`${showOverlay ? "Hide" : "Show"} Guide`}
                    showTutorial={tutorialState === 2}
                    tutorial="Click here to show and hide the canvas guide."
                    tutorialState={tutorialState}
                    setTutorialState={setTutorialState}
                    >
                    <RiGridLine />
                </UIButton>


                { !isDrawingMode ? <>
                    <UIButton 
                        className="bg-white hover:bg-purple-900 hover:text-white text-xl px-2 py-2 rounded-lg ml-auto"
                        onClick={addSquare}
                        tooltip="Add Square"
                        parentClasses="ml-auto"
                        >
                            <CgShapeSquare />
                    </UIButton>
                    <UIButton
                        className="bg-white hover:bg-purple-900 hover:text-white text-xl px-2 py-2 rounded-lg"
                        onClick={addTriangle}
                        tooltip="Add Triangle"
                        >
                        <CgShapeTriangle />
                    </UIButton>
                    <UIButton
                        className="bg-white hover:bg-purple-900 hover:text-white text-xl px-2 py-2 rounded-lg"
                        onClick={addCircle}
                        tooltip="Add Circle"
                        >
                        <CgShapeCircle />
                    </UIButton> 
                </> : <>
                    <UIButton
                        className={`${brushSize === 2 ?  'bg-purple-800 text-white' : 'bg-white'} hover:bg-purple-900 hover:text-white text-[5px] px-2 py-2 rounded-lg w-[36px]`}
                        parentClasses="ml-auto"
                        onClick={() => updateBrushSize(2)}
                        tooltip="Small Brush"
                        >
                        <BsCircleFill className="m-auto" />
                    </UIButton>
                    <UIButton
                        className={`${brushSize === 5 ?  'bg-purple-800 text-white' : 'bg-white'} hover:bg-purple-900 hover:text-white text-[8px] px-2 py-2 rounded-lg w-[36px]`}
                        onClick={() => updateBrushSize(5)}
                        tooltip="Medium Brush"
                        >
                        <BsCircleFill className="m-auto" />
                    </UIButton>
                    <UIButton
                        className={`${brushSize === 10 ?  'bg-purple-800 text-white' : 'bg-white'} hover:bg-purple-900 hover:text-white text-[15px] px-2 py-2 rounded-lg w-[36px]`}
                        onClick={() => updateBrushSize(10)}
                        tooltip="Large Brush"
                        >
                        <BsCircleFill className="m-auto" />
                    </UIButton>
                    <UIButton
                        className={`${brushSize === 15 ?  'bg-purple-800 text-white' : 'bg-white'} hover:bg-purple-900 hover:text-white text-[20px] px-2 py-2 rounded-lg w-[36px]`}
                        onClick={() => updateBrushSize(15)}
                        tooltip="Extra Large Brush"
                        >
                        <BsCircleFill className="m-auto" />
                    </UIButton>
                </>}


                { !isDrawingMode && <UIButton
                    className="bg-white hover:bg-purple-900 hover:text-white text-xl px-2 py-2 rounded-lg"
                    onClick={deleteSelected}
                    tooltip="Delete Selected"
                    parentClasses=""
                    >
                    <RiDeleteBin6Line />
                </UIButton> }
            </div>
        </>
    )

}