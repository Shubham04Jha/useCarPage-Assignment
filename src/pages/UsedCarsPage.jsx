import { Provider } from 'react-redux'
import { store } from '../redux'
import SideBar from '../components/SideBar/SideBar';
import ListingSection from '../components/Listing/ListingSection';
import { ModalProvider } from '../context/ModalContext';
import DetailsModal from '../components/ui/DetailsModal';
import { UsedCarsProvider } from '../context/UsedCarsContext';
import { useUsedCarsPage } from '../hooks/useUsedCarsPage';

function UsedCarsPage() {
  const pageData = useUsedCarsPage();

  return (
    <UsedCarsProvider value={pageData}>
      <Layout>
        <h1 className="page-title">
          {pageData.totalCars} <span className="page-title__sub">Used Cars in {pageData.cityName}</span>
        </h1>
        <div className='used-cars-page-inner-layout'>
          <SideBar />
          <ListingSection />
        </div>
      </Layout>
    </UsedCarsProvider>
  );
}

function Layout({ children }) {
  return <div
    className='used-cars-page-layout'
  >
    {children}
  </div>
}

export default function UsedCarsPageWithProvider(props) {
  return (
    <Provider store={store} >
      <ModalProvider>
        <UsedCarsPage {...props} />
        <DetailsModal />
      </ModalProvider>
    </Provider>
  )
}