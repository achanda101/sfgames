import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from './components/Header';
import GameCardsGrid from "./games/gameCards";
import InclusionGame from "./games/inclusionGame";
import FinancialGame from "./games/financialGame";
import WorkplaceGame from "./games/workplaceGame";
import PoshGame from "./games/poshGame";
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
      <MainLayout>
        <Routes>
          <Route path="/" element={
            < GameCardsGrid />
          } />
          <Route path="/inclusion" element={
            < InclusionGame />
          } />
          <Route path="/financial" element={

            <FinancialGame />

          } />
          <Route path="/workplace" element={

            <WorkplaceGame />

          } />
          <Route path="/posh" element={

            <PoshGame />

          } />
        </Routes>
      </MainLayout>
      <ToastContainer />
    </Router>
  )
}

export default App;
