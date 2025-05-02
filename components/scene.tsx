"use client"

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Loader } from './loader'

const Canvas = dynamic(
  () => import('@react-three/fiber').then(mod => mod.Canvas),
  { ssr: false }
)

const SceneContent = ({ groundTexture, onContextLost }) => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 5, 15], fov: 50 }}
      onCreated={onContextLost}
    >
      <color attach="background" args={["#fdf6e3"]} />
      <fog attach="fog" args={["#f5e1c0", 15, 60]} />
      <ambientLight intensity={1.0} color="#ffecd1" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial 
          map={groundTexture} 
          color="#e8c396" 
          roughness={0.9} 
          metalness={0.05} 
        />
      </mesh>
    </Canvas>
  )
}

export default function Scene(props) {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<Loader />}>
        <SceneContent {...props} />
      </Suspense>
    </div>
  )
}