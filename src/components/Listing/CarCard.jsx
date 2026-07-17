import ImageCarousel from '../ui/ImageCarousel';
import { useModalContext } from '../../hooks/useModalContext';

function CarCard({ car }) {
  const { imageUrls, carName, kilometersDriven, fuelType, cityName, formattedPrice, areaName, registrationYear: makeYear, additionalFuel, deliveryCityName } = car;
  const { openModal } = useModalContext();

  const fuelDisplay = additionalFuel ? `${fuelType} + 1` : fuelType;
  const deliveryDisplay = deliveryCityName ? ` | Delivered in ${deliveryCityName}` : '';

  return (
    <article className="car-grid-cell">
      <ImageCarousel images={imageUrls} altText={carName} />

      <div className="car-grid-cell__content">
        <h3 className="car-grid-cell__title">{makeYear} {carName}</h3>
        <p className="car-grid-cell__meta">{`${kilometersDriven} km | ${fuelDisplay} | ${areaName ? areaName + ',' : ''} ${cityName}${deliveryDisplay}`}</p>
        <p className="car-grid-cell__price">{formattedPrice}</p>
        <button type="button" className="car-grid-cell__cta" onClick={openModal}>
          Get Seller Details
        </button>
      </div>
    </article>
  );
}

export default CarCard;