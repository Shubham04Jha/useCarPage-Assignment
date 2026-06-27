import { useEffect, useMemo, useState } from 'react';

const carouselStyles = {
  position: 'relative',
  width: '100%',
  aspectRatio: '4 / 3',
  background: '#f3f4f6',
  overflow: 'hidden',
};

const imageStyles = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};

const placeholderStyles = {
  ...carouselStyles,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#6b7280',
  fontSize: '0.95rem',
};

const buttonStyles = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  border: 'none',
  background: 'rgba(17, 24, 39, 0.75)',
  color: '#fff',
  width: '2.25rem',
  height: '2.25rem',
  borderRadius: '999px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.2s ease, transform 0.1s ease',
};

const prevButtonStyles = {
  ...buttonStyles,
  left: '0.65rem',
};

const nextButtonStyles = {
  ...buttonStyles,
  right: '0.65rem',
};

function normalizeImages(images) {
  if (!Array.isArray(images)) {
    return [];
  }

  return images.filter((image) => typeof image === 'string' && image.trim() !== '');
}

function ImageCarousel({ images = [], altText = 'Carousel image' }) {
  const normalizedImages = useMemo(() => normalizeImages(images), [images]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [normalizedImages.length]);

  if (normalizedImages.length === 0) {
    return (
      <div style={placeholderStyles}>
        <span>No image available</span>
      </div>
    );
  }

  const goToPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? normalizedImages.length - 1 : currentIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % normalizedImages.length);
  };

  return (
    <div style={carouselStyles}>
      <img
        style={imageStyles}
        src={normalizedImages[activeIndex]}
        alt={altText}
      />

      {normalizedImages.length > 1 && (
        <>
          <button
            type="button"
            style={prevButtonStyles}
            onClick={goToPrevious}
            aria-label="Show previous image"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            style={nextButtonStyles}
            onClick={goToNext}
            aria-label="Show next image"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

export default ImageCarousel;
