import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import UsedCarsPage from './pages/UsedCarsPage';
import NotFoundPage from './pages/NotFoundPage';
import RootRedirect from './components/RootRedirect';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/used-cars" element={<UsedCarsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

