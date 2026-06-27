import ImageCarousel from '../ui/ImageCarousel';

function CarGridCell({car}) {
  const { stockImages: images, carName, km, fuel, cityName, price, areaName } = car;
  return (
    <article className="car-grid-cell">
      <ImageCarousel images={images} altText={carName} />

      <div className="car-grid-cell__content">
        <h3 className="car-grid-cell__title">{carName}</h3>
        <p className="car-grid-cell__meta">{`${km} km | ${fuel} | ${areaName}, ${cityName}`}</p>
        <p className="car-grid-cell__price">{price}</p>
        <button type="button" className="car-grid-cell__cta">
          Get Seller Details
        </button>
      </div>
    </article>
  );
}

export default CarGridCell;