import React, { useEffect, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store, fetchCities, fetchMakes, fetchCarsAsyncAction } from '../redux'
import SideBar from '../components/SideBar/SideBar';
import ListingSection from '../components/Listing/ListingSection';
import { MAX_CAR_FETCH_LIMIT } from '../constants/infiniteFetch';


function UsedCarsPage() {
  const filters = useSelector(state => state.listing.filters);
  const dispatch = useDispatch();

  const cars = useSelector(state => state.cars.data.stocks ?? []);
  const loading = useSelector(state => state.cars.loading);
  const totalCars = useSelector(state => state.cars.data.totalCount ?? 0);
  const cityId = useSelector(state => state.listing.filters.cityId);
  const cityName = useSelector(state => {
    const cityObj = state.cities.byId[cityId];
    return cityObj ? cityObj.CityName : 'India';
  });

  const [page, setPage] = useState(1);
  const hasMore = cars.length < totalCars && cars.length < MAX_CAR_FETCH_LIMIT;

  useEffect(() => {
    setPage(1);
    dispatch(fetchCarsAsyncAction(filters, 1, false));
  }, [filters, dispatch]);

  const handleLoadMore = () => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(fetchCarsAsyncAction(filters, nextPage, true));
  };

  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchMakes());
  }, []);

  return (
    <>
      <Layout>
        <h1 className="page-title">
          {totalCars} <span className="page-title__sub">Used Cars in {cityName}</span>
        </h1>
        <div className='used-cars-page-inner-layout'>
          <SideBar />
          <ListingSection onLoadMore={handleLoadMore} hasMore={hasMore} />
        </div>
      </Layout>
    </>

  )
}

function Layout({ children }) {
  return <div
    className='used-cars-page-layout'
  >
    {children}
  </div>
}

export default function UsedCarsPageWithProvider() {
  return (
    <Provider store={store} >
      <UsedCarsPage />
    </Provider>
  )
}