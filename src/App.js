import PatternProvider from './PatternContext';
import PatternMaker from './components/PatternMaker';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <PatternProvider>
        <PatternMaker />
    </PatternProvider>
  );
}

export default App;
