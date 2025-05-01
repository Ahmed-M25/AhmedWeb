"use client"

import { useState, useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useTexture, Text } from "@react-three/drei"
import * as THREE from "three"
import { ProjectPanel } from "./project-panel"

type ProjectData = {
  title: string
  description: string
  tags: string[]
  link: string
  github: string
  image?: string
}

type InteractivePyramidProps = {
  position: [number, number, number]  
  size: [number, number, number]     
  project: ProjectData
}

export function InteractivePyramid({
  position,
  size: [radius, height],
  project,
}: InteractivePyramidProps) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const meshRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)
  const textRef = useRef<THREE.Mesh>(null!)

  const { camera } = useThree()
  const sandTexture = useTexture("/pyramidTexture.jpg?height=512&width=512")
  sandTexture.wrapS = sandTexture.wrapT = THREE.RepeatWrapping
  sandTexture.repeat.set(1, 1)

  const panelOffset = useRef<[number, number, number]>([0, height * 0.8, radius * 0.5])

  useEffect(() => {
    const onWheel = () => {
      if (!clicked) return
      const worldPos = new THREE.Vector3(...position)
      if (camera.position.distanceTo(worldPos) > 25) {
        setClicked(false)
      }
    }
    window.addEventListener("wheel", onWheel)
    return () => window.removeEventListener("wheel", onWheel)
  }, [clicked, camera, position])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    const floatAmt = Math.sin(t * 0.5) * 0.05
    meshRef.current.position.set(0, height / 2 + floatAmt, 0)
    glowRef.current.position.set(0, height / 2 + floatAmt, 0)

    const glowMat = glowRef.current.material as THREE.MeshBasicMaterial
    if (hovered) {
      glowMat.opacity = 0.3 + Math.sin(t * 3) * 0.1
      glowRef.current.scale.setScalar(1.05 + Math.sin(t * 2) * 0.02)
    } else {
      glowMat.opacity = 0
    }

    if (textRef.current) {
      const textFloat = Math.sin(t * 1) * 0.1
      textRef.current.position.y = height + 0.6 + textFloat
    }

    if (clicked) {
      const dir = new THREE.Vector3()
        .subVectors(camera.position, new THREE.Vector3(...position))
        .setY(0)
        .normalize()
      panelOffset.current[0] = dir.x * radius * 0.8
      panelOffset.current[2] = dir.z * radius * 0.8
    }
  })

  return (
    <group position={[position[0], 0, position[2]]}>
      {/* pyramid */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked((c) => !c)}
        castShadow
        receiveShadow
      >
        <coneGeometry args={[radius, height, 4, 1]} />
        <meshStandardMaterial
          map={sandTexture}
          color={hovered ? "#f0d9b5" : "#e6ccb2"}
          roughness={1}
          metalness={0.1}
        />
      </mesh>

      {/* glow */}
      <mesh ref={glowRef} pointerEvents="none" scale={1.05}>
        <coneGeometry args={[radius, height, 4, 1]} />
        <meshBasicMaterial
          color="#ffecd1"
          transparent
          opacity={0}
          side={THREE.BackSide}
        />
      </mesh>

      <Text
        ref={textRef}
        position={[0, height + 0.2, 0]}   
        fontSize={0.3}
        maxWidth={2}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#fff"
        color="#333"
      >
        Click to view project
      </Text>

      <group position={panelOffset.current} scale={[0.5, 0.5, 0.5]}>
        <ProjectPanel
          project={project}
          visible={clicked}
          onClose={() => setClicked(false)}
        />
      </group>
    </group>
  )
}
