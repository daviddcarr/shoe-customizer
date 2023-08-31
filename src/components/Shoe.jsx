import { Canvas } from '@react-three/fiber'
import { useEffect, useMemo, useState } from 'react'
import {
    useGLTF,
    Environment,
    OrbitControls
} from '@react-three/drei'

export function Shoe({ texture }) {

    const [updatedTexture, setUpdatedTexture] = useState(null)

    const shoeGltf = useGLTF('./glb/shoe.glb')

    useEffect(() => {
        if (texture) {
            texture.flipY = false
            texture.needsUpdate = true
            setUpdatedTexture(texture)
        }
    }, [texture])
    
    useEffect(() => {
        if (shoeGltf && updatedTexture) {
            const editableChild = shoeGltf.scene.children.find(child => child.name === "ShoeOutside").children.find(child => child.material.name === "M.Shoe.Outside.Editable")

            if (editableChild) {
                editableChild.material.map = updatedTexture
                editableChild.material.needsUpdate = true
            }
        }
    }, [shoeGltf, updatedTexture])


    return (
        <primitive
            object={shoeGltf.scene}
            />
    )
}

export function ShoeCanvas({ texture }) {
  return (
    <Canvas
      camera={{ position: [4, 3, 0] }}
      >
        <Environment
            files={"sunset_fairway_2k.hdr"}
            />
        <OrbitControls 
            enablePan={false}
            enableZoom={false}
            autoRotate={true}
            autoRotateSpeed={0.5}
            />
        <Shoe texture={texture} />
    </Canvas>
  )
}
