import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '../redux';
import SideBar from '../components/SideBar/SideBar';
import ListingSection from '../components/Listing/ListingSection';
import { ModalProvider } from '../context/ModalContext';
import DetailsModal from '../components/ui/DetailsModal';
import { useUsedCarsPage } from '../hooks/useUsedCarsPage';

function UsedCarsPage() {
  const pageData = useUsedCarsPage();
  return (
    <Layout>
      <h1 className="page-title">
        {pageData.totalCars} <span className="page-title__sub">Used Cars in {pageData.cityName || 'India'}</span>
      </h1>
      <div className='used-cars-page-inner-layout'>
        <SideBar />
        <ListingSection />
      </div>
    </Layout>
  );
}

function Layout({ children }) {
  return <div
    className='used-cars-page-layout'
  >
    {children}
  </div>
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

export default function UsedCarsPageWithProvider(props) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store} >
        <ModalProvider>
          <UsedCarsPage {...props} />
          <DetailsModal />
        </ModalProvider>
      </Provider>
    </QueryClientProvider>
  )
}