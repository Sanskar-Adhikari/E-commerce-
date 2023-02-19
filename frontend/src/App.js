import './App.css';
import Header from "./component/Header/Header"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Footer from "./component/Footer/Footer"
import Home from "./component/Home/Home"
import LoadingScreen from "./component/LoadingComponent/LoadingScreen";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/sad' element={<LoadingScreen/>}/>
        
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
