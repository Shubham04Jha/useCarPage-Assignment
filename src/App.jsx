import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import UsedCarsPage from './pages/UsedCarsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsedCarsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

