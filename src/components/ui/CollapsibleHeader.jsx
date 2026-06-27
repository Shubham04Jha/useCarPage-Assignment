import { useState } from "react"

export function CollapsibleHeader({title, children, ...props}) {
  const [isOpen, setIsOpen] = useState(props.isOpen ?? true);
  return (
    <div className="filter-section">
      <button 
        type="button"
        className="collapsible-header"
        onClick={() => setIsOpen(p => !p)}
        aria-expanded={isOpen}
        aria-label={isOpen ? `Collapse ${title}` : `Expand ${title}`}
      >
        <h3>{title}</h3>
        
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`collapsible-header__arrow ${isOpen ? 'is-open' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && (
        <div className="collapsible-content">
          {children}
        </div>
      )}
    </div>
  )
}

