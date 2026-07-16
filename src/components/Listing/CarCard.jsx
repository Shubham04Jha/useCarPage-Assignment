import { useSelector } from 'react-redux';
import ImageCarousel from '../ui/ImageCarousel';
import { useModalContext } from '../../hooks/useModalContext';

function CarCard({ car }) {
  const { imageUrls: images, carName, KilometersDriven:km, fuelType: fuel, cityName, formattedPrice: price, areaName, registrationYear: makeYear, additionalFuel, deliveryCity } = car;
  const { openModal } = useModalContext();

  const selectedCityId = useSelector((state) => state.listing.filters.cityId);
  const selectedCityName = useSelector((state) => {
    const cityObj = state.cities.byId[selectedCityId];
    return cityObj ? cityObj.CityName : null;
  });

  const fuelDisplay = additionalFuel ? `${fuel} + 1` : fuel;
  const deliveryDisplay = (selectedCityId && deliveryCity === selectedCityId && selectedCityName)
    ? ` | Delivered in ${selectedCityName}`
    : '';

  return (
    <article className="car-grid-cell">
      <ImageCarousel images={images} altText={carName} />

      <div className="car-grid-cell__content">
        <h3 className="car-grid-cell__title">{makeYear} {carName}</h3>
        <p className="car-grid-cell__meta">{`${km} km | ${fuelDisplay} | ${areaName}, ${cityName}${deliveryDisplay}`}</p>
        <p className="car-grid-cell__price">{price}</p>
        <button type="button" className="car-grid-cell__cta" onClick={openModal}>
          Get Seller Details
        </button>
      </div>
    </article>
  );
}

export default CarCard;