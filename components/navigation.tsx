"use client"

export function Navigation() {
  return (
    <>
      <header className="header-container">
        <h1 className="name-title">Ahmed Mohammed</h1>
      </header>
      
      <nav className="nav-container">
        <div className="nav-links-wrapper">
          <a 
            href="mailto:ahmedm25085@gmail.com"
            className="nav-link"
          >
            Email
          </a>
          <a 
            href="https://www.linkedin.com/in/ahmed-moham"
            className="nav-link"
          >
            LinkedIn
          </a>
          <a 
            href="https://github.com/Ahmed-M25"
            className="nav-link"
          >
            GitHub
          </a>
        </div>
      </nav>
    </>
  )
}
