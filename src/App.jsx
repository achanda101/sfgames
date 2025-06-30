import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from './components/Header';
import GameCardsGrid from "./games/gameCards";
import InclusionGame from "./games/inclusionGame";
import FinancialGame from "./games/financialGame";
import Login from "./Login";
import Admin from "./Admin";
import PrivateRoutes from './utils/PrivateRoutes'
import { AuthProvider } from './utils/AuthContext'
import './App.css'

const MainLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="container mx-auto mt-4 w-full max-w-none">
      <Header currentRoute={location.pathname} />
      {children}
    </div>
  );
};


function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={
          <MainLayout>
            < GameCardsGrid />
          </MainLayout>
        } />
        <Route path="/inclusion" element={
          <MainLayout>
            < InclusionGame />
          </MainLayout>
        } />
        <Route path="/financial" element={
          <MainLayout>
            <FinancialGame />
          </MainLayout>
        } />
        <Route path="/workplace" element={
          <MainLayout>
            <h1>Work Etiquette Game</h1>
          </MainLayout>
        } />
        <Route path="/posh" element={
          <MainLayout>
            <h1>PoSH Game</h1>
          </MainLayout>
        } />
      </Routes>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={
            <MainLayout>
              < Login />
            </MainLayout>
          } />
          <Route element={<PrivateRoutes />}>
            <Route path="/admin" element={
              <MainLayout>
                < Admin />
              </MainLayout>
            } />
          </Route>
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </Router>
  )
}

export default App;
