import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import TrainingPlansPage from './pages/TrainingPlansPage';
import ProgressPage from './pages/ProgressPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/training-plans" element={<TrainingPlansPage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </Provider>
  );
}

export default App;
