"use client"

export function Navigation() {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-10 hidden md:block">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-amber-900">Ahmed Mohammed</div>
          </div>
        </div>
      </nav>

    </>
  )
}
