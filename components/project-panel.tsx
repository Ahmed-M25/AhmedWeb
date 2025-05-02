"use client"

import { Html } from "@react-three/drei"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, X } from "lucide-react"

type ProjectData = {
  title: string
  description: string
  tags: string[]
  link: string
  github: string
  image?: string
}

type ProjectPanelProps = {
  project: ProjectData
  position: [number, number, number]
  onClose: () => void
  visible: boolean
}

export function ProjectPanel({ project, position, onClose, visible }: ProjectPanelProps) {
  if (!visible) return null

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent click from propagating to canvas
  }

  return (
    <Html
      position={position}
      center
      transform
      distanceFactor={15}
      occlude={[]}
      zIndexRange={[100, 0]}
      className="pointer-events-auto"
      onClick={handleCardClick}
    >
      <div className="project-panel" onClick={handleCardClick}>
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          <button className="project-close-btn" onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
          <p className="project-description">{project.description}</p>
        </div>
        <div className="project-content">
          {project.image && (
            <div className="project-image-container">
              <img 
                src={project.image} 
                alt={project.title} 
                className="project-image"
              />
            </div>
          )}
          <div className="project-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="project-tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="project-footer">
          <a 
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            onClick={e => e.stopPropagation()}
          >
            <Github className="h-4 w-4" />
            Code
          </a>
          {project.link && (
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </Html>
  )
}
