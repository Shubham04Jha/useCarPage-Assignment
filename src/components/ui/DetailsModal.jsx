import ReactDOM from 'react-dom';
import { useModalContext } from '../../hooks/useModalContext';
import { useEffect } from 'react';

function DetailsModal() {
  const { isOpen, closeModal } = useModalContext();

  // Close modal when pressing Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={closeModal} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className="modal-title">Fill in your details (implementation pending)</h2>
        <p className="modal-subtitle">Provide your contact details to get seller's contact</p>

        <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
          <div className="modal-field">
            <label className="modal-label">NAME</label>
            <div className="modal-input-wrapper">
              <input
                type="text"
                className="modal-input"
                placeholder="Enter Your Full Name"
                autoFocus
              />
            </div>
          </div>

          <div className="modal-field">
            <label className="modal-label">MOBILE</label>
            <div className="modal-input-wrapper mobile-wrapper">
              <span className="country-code">+91</span>
              <input
                type="tel"
                className="modal-input mobile-input"
                placeholder="Enter Mobile Number"
              />
            </div>
          </div>

          <div className="modal-checkbox-container">
            <label className="modal-checkbox-label">
              <input type="checkbox" className="modal-checkbox-input" defaultChecked />
              <span className="modal-checkbox-custom"></span>
              <span className="modal-checkbox-text">Allow notifications on WhatsApp</span>
            </label>
          </div>

          <button type="submit" className="modal-submit-btn">
            Submit
          </button>
        </form>

        <p className="modal-terms">
          By submitting this form you agree to our{' '}
          <a href="#" className="modal-terms-link" onClick={(e) => e.preventDefault()}>
            terms and conditions
          </a>
        </p>
      </div>
    </div>,
    document.body
  );
}

export default DetailsModal;
