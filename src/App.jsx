import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from './components/Header';
import GameCardsGrid from "./games/gameCards";
import InclusionGame from "./games/inclusionGame";
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
        <Route path="/financial" element={<h1>Financial Literacy Game</h1>} />
        <Route path="/workplace" element={<h1>Work Etiquette Game</h1>} />
        <Route path="/posh" element={<h1>PoSH Game</h1>} />
      </Routes>
    </Router>
  )
}

export default App;
