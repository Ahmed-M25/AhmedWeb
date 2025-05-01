import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      title: "3D Portfolio",
      description: "An interactive 3D portfolio showcasing my work using Three.js and React Three Fiber.",
      tags: ["Three.js", "React", "TypeScript"],
      link: "#",
      github: "#",
    },
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with 3D product visualization.",
      tags: ["Next.js", "Three.js", "Stripe"],
      link: "#",
      github: "#",
    },
    {
      title: "Interactive Data Visualization",
      description: "3D visualization of complex datasets for a research institution.",
      tags: ["D3.js", "Three.js", "React"],
      link: "#",
      github: "#",
    },
  ]

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-500"
      id="projects-section"
    >
      <div className="bg-amber-50/90 backdrop-blur-sm p-8 rounded-lg max-w-4xl pointer-events-auto">
        <h2 className="text-3xl font-bold text-amber-900 mb-6">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="bg-white border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">{project.title}</CardTitle>
                <CardDescription className="text-amber-700">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="text-amber-900 border-amber-300">
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </Button>
                <Button variant="default" size="sm" className="bg-amber-600 hover:bg-amber-700">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
