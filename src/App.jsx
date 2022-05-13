import Main from './components/Main';
import data from './data/data';
import './App.css'
import './tachyons.min.css'

function App() {

  return (
    <div className="tc bg-green ma0 pa4 min-vh-100">
      <Main details={data}/>
    </div>
  )
}

export default App
