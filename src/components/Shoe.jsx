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

    //         const frontChild = shoe.children.find(child => child.material.name === "shoe_Outside_Front")
    //         const backChild = shoe.children.find(child => child.material.name === "shoe_Outside_Back")
    
    //         if (frontChild) {
    //             frontChild.material.map = updatedTexture
    //             frontChild.material.needsUpdate = true
    //         }
    //         if (backChild) {
    //             backChild.material.map = updatedTexture.clone()
    //             backChild.material.map.repeat.x = -1
    //             backChild.material.map.offset.x = 1
    //             backChild.material.map.needsUpdate = true
    //             backChild.material.needsUpdate = true
    //         }
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
      camera={{ position: [4, 0, 0] }}
      >
        <Environment
            preset="sunset"
            />
        <OrbitControls 
            enablePan={false}
            enableZoom={false}
            />
        <Shoe texture={texture} />
    </Canvas>
  )
}
