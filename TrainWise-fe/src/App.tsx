import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import TrainingPlansPage from './pages/TrainingPlansPage';
import ProgressPage from './pages/ProgressPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import AIAssistant from './pages/AIAssistant';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/training-plans"
              element={
                <ProtectedRoute>
                  <TrainingPlansPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/progress"
              element={
                <ProtectedRoute>
                  <ProgressPage />
                </ProtectedRoute>
              }
            />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
          </Routes>
        </MainLayout>
      </Router>
    </Provider>
  );
}

export default App;
