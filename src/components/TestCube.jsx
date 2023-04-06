import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'

export function ThreeCube({ texture }) {
  const meshRef = useRef()
  const materialRef = useRef()

  useEffect(() => {
    if (materialRef.current  && texture) {
      materialRef.current.map = texture
      materialRef.current.needsUpdate = true
    }
  },
    [texture]
  )

  useFrame(() => {
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.01
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        ref={materialRef} 
        // map={texture}
        />
    </mesh>
  )
}

export function TestCube({ texture }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2] }}
      >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <ThreeCube texture={texture} />
    </Canvas>
  )
}
