import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './componets/Login';
import Register from './componets/Register';
import Reset from './componets/Reset';
import Dashboard from './componets/Dashboard';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/reset' element={<Reset/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
