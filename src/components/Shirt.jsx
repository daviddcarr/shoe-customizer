import { Canvas } from '@react-three/fiber'
import { useRef, useEffect, useMemo, useState } from 'react'
import { Texture, Color } from 'three'
import {
    PresentationControls,
    useGLTF,
    Environment,
    OrbitControls
} from '@react-three/drei'

export function Shirt({ texture }) {

    const [updatedTexture, setUpdatedTexture] = useState(null)

    const shirtGltf = useGLTF('./glb/shirt.glb')

    const shirt = useMemo(() => {
        return shirtGltf.nodes.Shirt003.clone()
    }, [shirtGltf])

    useEffect(() => {
        if (texture) {
            texture.flipY = false
            texture.needsUpdate = true
            setUpdatedTexture(texture)
        }
    }, [texture])
    
    useEffect(() => {
        if (shirt && updatedTexture) {
            const frontChild = shirt.children.find(child => child.material.name === "Shirt_Outside_Front")
            const backChild = shirt.children.find(child => child.material.name === "Shirt_Outside_Back")
    
            if (frontChild) {
                frontChild.material.map = updatedTexture
                frontChild.material.needsUpdate = true
            }
            if (backChild) {
                backChild.material.map = updatedTexture.clone()
                backChild.material.map.repeat.x = -1
                backChild.material.map.offset.x = 1
                backChild.material.map.needsUpdate = true
                backChild.material.needsUpdate = true
            }
        }
    }, [shirt, updatedTexture])


    return (
        <primitive
            object={shirt}
            />
    )
}

export function ShirtCanvas({ texture }) {
  return (
    <Canvas
      camera={{ position: [4, 0, 0] }}
      >
        <Environment
            preset="sunset"
            />
        <OrbitControls 
            enablePan={false}
            enableZoom={false}
            />
        <Shirt texture={texture} />
    </Canvas>
  )
}
