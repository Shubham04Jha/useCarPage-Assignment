import ListingToolbar from './ListingToolBar';
import CarsGrid from './CarGrid';

function ListingSection() {
  return (
    <section className="listing-section">
      <ListingToolbar />
      <CarsGrid />
    </section>
  );
}

export default ListingSection;