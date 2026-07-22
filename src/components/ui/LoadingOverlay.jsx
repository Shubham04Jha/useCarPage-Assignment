import { createPortal } from 'react-dom';

export default function LoadingOverlay() {
  return createPortal(
    <div className="blocking-loader-overlay" role="progressbar" aria-busy="true">
      <div className="blocking-loader-spinner" />
    </div>,
    document.body
  );
}
