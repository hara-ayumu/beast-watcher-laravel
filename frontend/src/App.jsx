import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './features/auth/pages/Login';
import LineCallback from './features/auth/pages/LineCallback';
import Register from './features/auth/pages/Register';
import Admin from './pages/Admin';
import ProtectedRoute from './features/auth/components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/line/callback" element={<LineCallback />} />
        
        {/* 管理者専用ルート */}
        <Route 
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
