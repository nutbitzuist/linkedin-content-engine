import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AuthGuard from './components/AuthGuard';
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates';
import Create from './pages/Create';
import Calendar from './pages/Calendar';
import Drafts from './pages/Drafts';
import Login from './pages/Login';
import Register from './pages/Register';
import Analytics from './pages/Analytics';
import IdeaGenerator from './pages/IdeaGenerator';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="templates" element={<Templates />} />
        <Route path="create" element={<Create />} />
        <Route path="create/:templateId" element={<Create />} />
        <Route path="ideas" element={<IdeaGenerator />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="drafts" element={<Drafts />} />
      </Route>
    </Routes>
  );
}

export default App;
