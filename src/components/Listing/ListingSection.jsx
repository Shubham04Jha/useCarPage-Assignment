import ListingToolbar from './ListingToolBar';
import CarsGrid from './CarGrid';

function ListingSection({ onLoadMore, hasMore }) {
  return (
    <section className="listing-section">
      <ListingToolbar />
      <CarsGrid onLoadMore={onLoadMore} hasMore={hasMore} />
    </section>
  );
}

export default ListingSection;