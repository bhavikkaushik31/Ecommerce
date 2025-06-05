
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Products from './pages/Products';
import Categories from './pages/Categories';




export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<AuthForm mode="signup" />} />
        <Route path="/signin" element={<AuthForm mode="signin" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
