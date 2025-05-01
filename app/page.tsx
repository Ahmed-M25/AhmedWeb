"use client"

import { Suspense, useState, useMemo } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Mountains } from "@/components/mountains"
import { Pyramids } from "@/components/pyramids"
import { Navigation } from "@/components/navigation"
import { Loader } from "@/components/loader"
import { createSandTexture } from "@/utils/textures"

export default function Home() {
  const groundTexture = useMemo(() => createSandTexture("#e8c396", 1.0, 10), [])

  // incrementing this key forces React to unmount/remount the Canvas
  const [canvasKey, setCanvasKey] = useState(0)

  return (
    <main className="relative w-full h-screen bg-amber-50">
      <Navigation />

      {/* Hint overlay (stays put in the DOM) */}
      {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10 opacity-70 transition-opacity duration-500 hover:opacity-0">
        <div className="bg-amber-50/80 backdrop-blur-sm p-4 rounded-lg">
          <p className="text-amber-900 font-medium">Click on the pyramids to view projects</p>
          <p className="text-amber-800 text-sm mt-1">Drag to rotate | Scroll to zoom</p>
        </div>
      </div> */}

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
            <meshStandardMaterial map={groundTexture} color="#e8c396" roughness={0.9} metalness={0.05} receiveShadow />
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

      <footer className="absolute bottom-4 inset-x-0 flex justify-center space-x-6 text-amber-900 text-base">
        <a href="mailto:ahmedm25085@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
          Email
        </a>
        <a href="https://www.linkedin.com/in/ahmed-moham" target="_blank" rel="noopener noreferrer" className="hover:underline">
          LinkedIn
        </a>
        <a href="https://github.com/Ahmed-M25" target="_blank" rel="noopener noreferrer" className="hover:underline">
          GitHub
        </a>
      </footer>
    </main>
  )
}
