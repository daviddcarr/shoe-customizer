import './App.css'

import { useState } from 'react'
import { TextureLoader } from 'three'

import DrawingCanvas from './components/DrawingCanvas'
import { ShirtCanvas } from './components/Shirt'
import { ShoeCanvas } from './components/Shoe'

function App() {

  const [texture, setTexture] = useState(null)

  const applyTexture = () => {
    const fabricCanvas = document.getElementById('fabric-canvas')
    const dataUrl = fabricCanvas.toDataURL()

    // console.log("dataUrl", dataUrl)

    // const img = new Image();
    // img.src = dataUrl;
    // document.body.appendChild(img);

    const loader = new TextureLoader()
    loader.load(dataUrl, (texture) => {
      setTexture(texture)
    })
  }

  return (
    <>
      <main className="max-w-[1024px] m-auto py-6">
        <div className="flex justify-between flex-col md:flex-row p-4">
          <div className=''>
            <DrawingCanvas applyTexture={applyTexture} />
          </div>
          <div className='grow'>
            <ShoeCanvas texture={texture} />
          </div>
        </div>
      </main>
    </>
  )
}

export default App;
