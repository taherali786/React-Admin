// import logo from './logo.svg';
import './App.css';

import Menu from './components/includes/Menu';
import Footer from './components/includes/Footer';
import Header from './components/includes/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterOutlet from './components/routerOutlet';
import { ProgressBar } from 'primereact/progressbar';

function App() {
  return (
      <Router>
       {/* <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar> */}
        <div class="wrapper">
          <Header/>
          <Menu />
          <RouterOutlet />
          <Footer />
        </div>
      </Router>
  );
}

export default App;
