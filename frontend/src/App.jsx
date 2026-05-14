/**
 * App.jsx — Root routing configuration for MY Cafe
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout      from './layouts/MainLayout';
import ProtectedRoute  from './components/ProtectedRoute';

import Home         from './pages/Home';
import Menu         from './pages/Menu';
import About        from './pages/About';
import Gallery      from './pages/Gallery';
import Contact      from './pages/Contact';
import Login        from './pages/Login';
import Signup       from './pages/Signup';
import Dashboard    from './pages/Dashboard';
import AIAssistant  from './pages/AIAssistant';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/"             element={<Home />}        />
          <Route path="/menu"         element={<Menu />}        />
          <Route path="/about"        element={<About />}       />
          <Route path="/gallery"      element={<Gallery />}     />
          <Route path="/contact"      element={<Contact />}     />
          <Route path="/login"        element={<Login />}       />
          <Route path="/signup"       element={<Signup />}      />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/dashboard"    element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
