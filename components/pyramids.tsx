"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { InteractivePyramid } from "./interactive-pyramid"

// Sample project data
const projects = [
  {
    title: "HighlightHero",
    description: "A highlight reel generator that shows off the best clips in uploaded game footage.",
    tags: ["React", "Flask", "Qwen2"],
    github: "https://github.com/Ahmed-M25/HighlightHero",
    image: "/HighlightHero.png?height=300&width=500",
  },
  {
    title: "Get Clone",
    description: "Create an AI clone of yourself that looks, speaks, and acts like you.",
    tags: ["Next.js", "FastAPI", "ElevenLabs", "Whisper"],
    github: "https://github.com/Ahmed-M25/getclone",
    image: "/getclone.png?height=300&width=500",
  },
  {
    title: "Project Lebron",
    description: "Raspberry Pi + React Native-powered basketball tracker.",
    tags: ["Raspberry Pi", "React Native", "MongoDB", "Flask"],
    github: "https://github.com/Ahmed-M25/projectLebron",
    image: "/project_lebron.webp?height=300&width=500",
  },
]

export function Pyramids() {
  const groupRef = useRef<THREE.Group>(null)
  const sandParticlesRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }

    // sand particles
    if (sandParticlesRef.current) {
      sandParticlesRef.current.rotation.y += 0.0005
      const positions = sandParticlesRef.current.geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.random() * 0.01 - 0.005 

        if (positions[i + 1] > 5) {
          positions[i + 1] = 0
        }
      }
      sandParticlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      {/* Pyramids */}
      <InteractivePyramid position={[0, 2.5, 0]} size={[5, 5, 4]} project={projects[0]} />

      <InteractivePyramid position={[-7, 2.25, -5]} size={[4.5, 4.5, 4]} project={projects[1]} />

      <InteractivePyramid position={[7, 1.5, -7]} size={[3, 3, 4]} project={projects[2]} />

      {/* Attempt at Sphinx */}
      <group position={[10, 0.5, 2]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 1, 1.5]} />
          <meshStandardMaterial color="#c19a6b" roughness={0.8} />
        </mesh>
        <mesh position={[1.25, 0.75, 0]} castShadow>
          <boxGeometry args={[0.5, 0.5, 1]} />
          <meshStandardMaterial color="#c19a6b" roughness={0.8} />
        </mesh>
      </group>


      {/* Sand Particles */}
      <points ref={sandParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1500}
            array={new Float32Array(4500).map((_, i) => {
              if (i % 3 === 0) return (Math.random() - 0.5) * 50 // x
              if (i % 3 === 1) return Math.random() * 5 // y
              return (Math.random() - 0.5) * 50 // z
            })}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.08} color="#e1bf92" sizeAttenuation transparent opacity={0.7} />
      </points>
    </group>
  )
}