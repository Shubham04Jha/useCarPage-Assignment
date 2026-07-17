import { Navigate } from 'react-router-dom';
import { store } from '../redux';
import { getSearchStringFromState } from '../utils/persistence';

function RootRedirect() {
  // Read current filters/sort directly from the Redux store
  const state = store.getState().listing;
  const search = getSearchStringFromState(state);

  return <Navigate to={`/used-cars${search}`} replace />;
}

export default RootRedirect;
