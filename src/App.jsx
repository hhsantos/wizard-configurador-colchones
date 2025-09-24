import { WizardProvider } from './contexts/WizardContext'
import WizardContainer from './components/wizard/WizardContainer'
import './components/wizard/wizard.css'
import './App.css'

function App() {
  return (
    <div className="app">
      <WizardProvider>
        <WizardContainer />
      </WizardProvider>
    </div>
  )
}

export default App
