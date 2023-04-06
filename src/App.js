import './App.css'

import { useState } from 'react'
import { TextureLoader } from 'three'

import DrawingCanvas from './components/DrawingCanvas'
import { ShoeCanvas } from './components/Shoe'
import SVGLogo from './components/Logo'
import UIButton from './components/UIButton'

import { HiCubeTransparent } from 'react-icons/hi'

import { CgShapeSquare, CgShapeTriangle, CgShapeCircle } from "react-icons/cg"
import { RiPaintFill, RiDeleteBin6Line, RiCloseCircleLine, RiGridLine } from "react-icons/ri"
import { BsCircleFill } from "react-icons/bs"
import { FaShapes, FaPaintBrush } from "react-icons/fa"

function App() {

  const [texture, setTexture] = useState(null)
  const [showAbout, setShowAbout] = useState(false)
  const [showThreeCanvas, setShowThreeCanvas] = useState(false)

  const applyTexture = () => {
    const fabricCanvas = document.getElementById('fabric-canvas')
    const dataUrl = fabricCanvas.toDataURL()

    const loader = new TextureLoader()
    loader.load(dataUrl, (texture) => {
      setTexture(texture)
    })
  }

  return (
    <>
      <header className="text-white font-montserrat">
          <div className="max-w-[1024px] m-auto p-4 flex justify-between items-center border-b-[1px] border-b-purple-800">
            <SVGLogo className="fill-white max-w-[150px]" />

            <ul className="flex items-center space-x-4">
              <li>
                <a 
                  href="#about" 
                  className=""
                  >About</a>
              </li>
              <li>
                <a 
                  href="https://www.daviddylancarr.com/"
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 bg-white text-purple-900 hover:bg-purple-900 hover:text-white rounded-lg"
                  >Contact</a>
              </li>
            </ul>
          </div>
      </header>
      <main className="max-w-[1024px] m-auto py-6  font-montserrat">
    
        <div className="px-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white">3D SHOE DESIGNER</h1>
          <UIButton
            onClick={() => setShowThreeCanvas(!showThreeCanvas)}
            className={`${ showThreeCanvas ?  'bg-purple-800 text-white' : 'bg-white'} hover:bg-purple-900 hover:text-white px-2 text-xl py-2 rounded-lg md:hidden`}
            tooltip="Toggle 3D View"
          >
            <HiCubeTransparent />
          </UIButton>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4 my-6 relative">
          <div className=''>
            <DrawingCanvas applyTexture={applyTexture} />
          </div>
          <div className={`${showThreeCanvas ? 'h-[calc(100%-44px)] bg-purple-800 bg-opacity-50 rounded-lg z-100 opacity-100' : 'h-0 md:h-auto opacity-0 md:opacity-100 pointer-events-none'} md:bg-transparent transition-opacity md:h-auto absolute md:relative top-0 left-0 w-full overflow-hidden`}>
            <div className='md:grow h-full'>
              <ShoeCanvas texture={texture} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mx-4 my-12 gap-4">
          <article className="space-y-4">
            <h2 id="About" className="text-2xl font-bold text-white">How-To</h2>
            <hr />
            <p className="text-white">
              Use the white square canvas above to create your design!
            </p>
            <p className="text-white">
              There are two modes: <strong>Drawing <FaPaintBrush className="inline" /></strong> and <strong>Edit <FaShapes className="inline" /></strong>. Use Drawing Mode to freestyle paint your designs. Use Edit Mode to add shapes or move shapes and lines around.
            </p>
            <p className="text-white">
              You can change the color of your brush or shapes by toggling the <strong>Color Picker <RiPaintFill className="inline" /></strong>. Currently the color picker only affects shapes or drawings that are added after the color is changed.
            </p>
            <p className="text-white">
              By default you'll see an overlay <strong>Guide <RiGridLine className="inline" /></strong>  that shows the areas of the canvas that will appears on the shoe.
            </p>
            <p className="text-white">
              In <strong>Drawing Mode <FaPaintBrush className="inline" /></strong> you can draw lines by clicking and dragging. You can also change the size of your brush by clicking the <strong>Size Buttons <BsCircleFill className="inline" /></strong>.
            </p>
            <p className="text-white">
              In <strong>Edit Mode <FaShapes className="inline" /></strong> you can add shapes by clicking any one of the <strong>Shape Buttons <CgShapeSquare className="inline" /> <CgShapeTriangle className="inline" /> <CgShapeCircle className="inline" /></strong>. Click on any object or objects and you can manipulate them to your liking, or remove them with the <strong>Delete <RiDeleteBin6Line className="inline" /></strong> button. 
            </p>
            <p className="text-white">
              If you're on mobile you can toggle the 3D view by clicking the <strong>3D View <HiCubeTransparent className="inline" /></strong> button. Tap / Click and drag to rotate the shoe!
            </p>
          </article>

          <article>
            <form className="rounded-lg p-4 border-[1px] border-white bg-white bg-opacity-5 space-y-4">
              <h2 className="text-2xl font-bold text-white">Contact</h2>
              <hr />
              <div className="flex flex-col">
                <label htmlFor="name" className="text-white">Name</label>
                <input type="text" name="name" id="name" className="bg-white rounded-lg p-2 mt-0" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-white">Email</label>
                <input type="email" name="email" id="email" className="bg-white rounded-lg p-2 mt-0" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="message" className="text-white">Message</label>
                <textarea name="message" id="message" className="bg-white rounded-lg p-2 mt-0" />
              </div>
              <button className="bg-white text-purple-900 hover:bg-purple-900 hover:text-white rounded-lg px-4 py-2 mt-4">Send</button>
            </form>
          </article>

        </div>
      </main>
    </>
  )
}

export default App;
