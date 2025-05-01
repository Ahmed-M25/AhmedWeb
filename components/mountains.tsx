"use client"

import { useMemo } from "react"
import * as THREE from "three"

export function Mountains() {
  const mountainGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(200, 80, 64, 32)

    const position = geometry.attributes.position

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i)
      const y = position.getY(i)

      if (y > -39) {
        let z = 0

        z += 15 * Math.pow(Math.abs(Math.sin(x * 0.03)), 2) * Math.pow(Math.abs(Math.sin(y * 0.04 + 1)), 1.5)

        z += 8 * Math.pow(Math.abs(Math.sin(x * 0.06 + 2)), 1.8) * Math.pow(Math.abs(Math.cos(y * 0.05 + 3)), 1.2)

        z += 4 * Math.pow(Math.abs(Math.sin(x * 0.1 + 4)), 1.5) * Math.pow(Math.abs(Math.sin(y * 0.08 + 5)), 1.1)

        z += (Math.random() - 0.5) * 0.5

        position.setZ(i, z)
      }
    }

    geometry.computeVertexNormals()

    return geometry
  }, [])

  const mountainMaterials = useMemo(() => {
    return [
      new THREE.MeshStandardMaterial({
        color: "#b8a99a",
        roughness: 1,
        metalness: 0.1,
        flatShading: true,
      }),
      new THREE.MeshStandardMaterial({
        color: "#c0b0a0",
        roughness: 1,
        metalness: 0.1,
        flatShading: true,
      }),
      new THREE.MeshStandardMaterial({
        color: "#a89e90",
        roughness: 1,
        metalness: 0.1,
        flatShading: true,
      }),
    ]
  }, [])

  return (
    <group>
      {/* Main mountain range */}
      <mesh
        geometry={mountainGeometry}
        material={mountainMaterials[0]}
        position={[0, 0, -60]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      />

      {/* Left mountain range (slightly different position and rotation) */}
      <mesh
        geometry={mountainGeometry}
        material={mountainMaterials[1]}
        position={[-120, -5, -80]}
        rotation={[-Math.PI / 2, 0, Math.PI / 16]}
        scale={[0.8, 0.7, 0.7]}
        receiveShadow
      />

      {/* Right mountain range */}
      <mesh
        geometry={mountainGeometry}
        material={mountainMaterials[2]}
        position={[120, -8, -70]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 16]}
        scale={[0.9, 0.8, 0.6]}
        receiveShadow
      />
    </group>
  )
}
