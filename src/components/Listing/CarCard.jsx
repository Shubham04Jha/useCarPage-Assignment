import ImageCarousel from '../ui/ImageCarousel';
import { useModalContext } from '../../hooks/useModalContext';
import { useSelector } from 'react-redux';
import { memo } from 'react';

function CarCard({ car }) {
  const { imageUrls, carName, formattedKmDriven, fuelType, cityName, formattedPrice, areaName, registrationYear: makeYear, additionalFuel, deliveryCityName } = car;
  const { openModal } = useModalContext();
  const selectedCityId = useSelector((state) => state.listing?.filters?.cityId);

  const fuelDisplay = additionalFuel ? `${fuelType} + 1` : fuelType;
  const deliveryDisplay = (selectedCityId != null && deliveryCityName) ? ` | Delivered in ${deliveryCityName}` : '';

  return (
    <article className="car-grid-cell">
      <ImageCarousel images={imageUrls} altText={carName} />

      <div className="car-grid-cell__content">
        <h3 className="car-grid-cell__title">{makeYear} {carName}</h3>
        <p className="car-grid-cell__meta">{`${formattedKmDriven} | ${fuelDisplay} | ${areaName ? areaName + ',' : ''} ${cityName}${deliveryDisplay}`}</p>
        <p className="car-grid-cell__price">{formattedPrice}</p>
        <button type="button" className="car-grid-cell__cta" onClick={openModal}>
          Get Seller Details
        </button>
      </div>
    </article>
  );
}

export default memo(CarCard);