"use client"

import { Suspense, useState, useMemo } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Mountains } from "@/components/mountains"
import { Pyramids } from "@/components/pyramids"
import { Navigation } from "@/components/navigation"
import { Loader } from "@/components/loader"
import { useSandTexture } from "@/utils/textures"

export default function Home() {
  const groundTexture = useSandTexture("#e8c396", 1.0, 10)
  const [canvasKey, setCanvasKey] = useState(0)

  return (
    <div className="canvas-wrapper">
      <Suspense fallback={<Loader />}>
        <Canvas
          key={canvasKey}                        // ← forces full remount on context loss
          legacy                                 // avoid React.StrictMode double-mount
          dpr={1}                                // single DPR to save GPU
          shadows={false}                        // disable shadows for stability
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
            preserveDrawingBuffer: true,         // try to preserve drawing buffer after restore
          }}
          camera={{ position: [0, 5, 15], fov: 50 }}
          onCreated={({ gl }) => {
            const canvas = gl.domElement
            canvas.addEventListener("webglcontextlost", (e) => {
              e.preventDefault()                  // prevent the “sad tab” screen
              console.warn("🔴 WebGL context lost — remounting Canvas")
              setCanvasKey((k) => k + 1)          // bump the key, remount everything
            })
          }}
        >
          <color attach="background" args={["#fdf6e3"]} />
          <fog attach="fog" args={["#f5e1c0", 15, 60]} />

          <ambientLight intensity={1.0} color="#ffecd1" />
          <hemisphereLight args={["#ffecd1", "#e6ccb2", 0.7]} position={[0, 50, 0]} />
          <Mountains />

          <Pyramids />

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial 
              map={groundTexture || undefined} 
              color="#e8c396" 
              roughness={0.9} 
              metalness={0.05} 
              receiveShadow 
            />
          </mesh>

          <Environment preset="sunset" intensity={0.7} />
          <directionalLight position={[5, 10, 5]} intensity={2.5} castShadow shadow-mapSize={1024} color="#ffedd0" />


          <OrbitControls
            enablePan={false}
            enableZoom
            maxPolarAngle={Math.PI / 2 - 0.1}
            minDistance={5}
            maxDistance={25}
            target={[0, 2, 0]}
          />
        </Canvas>
      </Suspense>
      
      <Navigation />
    </div>
  )
}
