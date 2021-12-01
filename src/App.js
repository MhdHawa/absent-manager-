import {BrowserRouter as Router} from 'react-router-dom';
import Routes from "./routes/Routes";
import Header from "./components/layout/header/Header";
import './App.css'

function App() {

    return (
        <Router>
            <Header/>
            <Routes/>
        </Router>
    );
}

export default App;
