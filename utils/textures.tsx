"use client"

import { useEffect, useState } from 'react'
import * as THREE from 'three'

export function createSandTexture(color = "#e8c396", roughness = 1.0, scale = 1.0) {
  // Return null during server-side rendering
  if (typeof window === 'undefined') return null

  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 512
  const context = canvas.getContext("2d")!

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
  gradient.addColorStop(0, new THREE.Color(color).offsetHSL(0.02, 0.1, 0.05).getStyle())
  gradient.addColorStop(0.5, color)
  gradient.addColorStop(1, new THREE.Color(color).offsetHSL(-0.02, 0.05, -0.05).getStyle())

  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)

  const baseColor = new THREE.Color(color)
  const lighterColor = new THREE.Color(color).offsetHSL(0.01, 0.1, 0.12).getStyle()
  const darkerColor = new THREE.Color(color).offsetHSL(-0.01, 0.05, -0.1).getStyle()

  for (let i = 0; i < 20000; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const size = Math.random() * 2 + 0.5

    context.beginPath()
    context.arc(x, y, size, 0, Math.PI * 2)
    context.fillStyle = Math.random() > 0.5 ? lighterColor : darkerColor
    context.fill()
  }

  for (let i = 0; i < 30; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const width = Math.random() * 80 + 40
    const height = Math.random() * 20 + 10

    context.beginPath()
    context.ellipse(x, y, width, height, Math.random() * Math.PI, 0, Math.PI * 2)
    context.fillStyle =
      Math.random() > 0.5
        ? new THREE.Color(color).offsetHSL(0.02, 0.1, 0.08).getStyle()
        : new THREE.Color(color).offsetHSL(-0.02, 0.05, -0.08).getStyle()
    context.globalAlpha = 0.4
    context.fill()
    context.globalAlpha = 1.0
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(scale, scale)

  return texture
}

// Create a hook to handle the texture creation
export function useSandTexture(color = "#e8c396", roughness = 1.0, scale = 1.0) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    const newTexture = createSandTexture(color, roughness, scale)
    setTexture(newTexture)
  }, [color, roughness, scale])

  return texture
}