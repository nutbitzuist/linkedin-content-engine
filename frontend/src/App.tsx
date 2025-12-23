import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates';
import Create from './pages/Create';
import Calendar from './pages/Calendar';
import Drafts from './pages/Drafts';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="templates" element={<Templates />} />
        <Route path="create" element={<Create />} />
        <Route path="create/:templateId" element={<Create />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="drafts" element={<Drafts />} />
      </Route>
    </Routes>
  );
}

export default App;
