import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* TODO: Přidat další routy pro tréninkové plány a sledování pokroku */}
          </Routes>
        </MainLayout>
      </Router>
    </Provider>
  );
}

export default App;
