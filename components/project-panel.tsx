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

  return (
    <Html
      position={position}
      center
      transform
      distanceFactor={15}
      occlude={[]}
      zIndexRange={[100, 0]}
      className="pointer-events-auto"
    >
      <Card className="w-64 bg-amber-50/95 backdrop-blur-sm border-amber-200 shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-amber-900">{project.title}</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 rounded-full -mt-1 -mr-1">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription className="text-amber-700">{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          {project.image && (
            <div className="mb-3 rounded-md overflow-hidden">
              <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-32 object-cover" />
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
        <Button asChild variant="outline" size="sm">
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            Code
          </a>
        </Button>
          {/* <Button variant="default" size="sm" className="bg-amber-600 hover:bg-amber-700">
            <ExternalLink className="mr-2 h-4 w-4" />
            View
          </Button> */}
        </CardFooter>
      </Card>
    </Html>
  )
}
