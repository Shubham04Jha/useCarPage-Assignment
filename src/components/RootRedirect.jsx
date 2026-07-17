import { Navigate, useLocation } from 'react-router-dom';

function RootRedirect() {
  const { search } = useLocation();

  return <Navigate to={`/used-cars${search}`} replace />;
}

export default RootRedirect;
