import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import Header from './components/Header';
import GameCardsGrid from "./games/gameCards";
import InclusionGame from "./games/inclusionGame";
import FinancialGame from "./games/financialGame";
// import Login from "./Login";
// import Admin from "./Admin";
// import PrivateRoutes from './utils/PrivateRoutes'
// import { AuthProvider } from './utils/AuthContext'
import './App.css'

// const MainLayout = ({ children }) => {
//   const location = useLocation();

//   return (
//     <div className="container mx-auto mt-4 w-full max-w-none">
//       <Header currentRoute={location.pathname} />
//       {children}
//     </div>
//   );
// };


function App() {
  return (
    <Router>
      {/* <AuthProvider> */}
      {/* <MainLayout> */}
      <Routes>
        <Route path="/" element={
          < GameCardsGrid />
        } />
        <Route path="/inclusion" element={

          <h1>Inclusion & Diversity Quiz</h1>

        } />
        <Route path="/financial" element={

          <FinancialGame />

        } />
        <Route path="/workplace" element={

          <h1>Work Etiquette Game</h1>

        } />
        <Route path="/posh" element={

          <h1>PoSH Game</h1>

        } />
        {/* <Route path="/login" element={

              < Login />

            } />
            <Route element={<PrivateRoutes />}>
              <Route path="/admin" element={

                < Admin />

              } />
            </Route> */}
      </Routes>
      {/* </MainLayout> */}
      {/* </AuthProvider> */}
      {/* <ToastContainer /> */}
    </Router>
  )
}

export default App;
