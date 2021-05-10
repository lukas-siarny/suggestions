import Suggestions from "./suggestions";
import Theme from "./Theme";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Theme>
        <div className="App">
          <Suggestions />
        </div>
      </Theme>
    </Router>
  );
}

export default App;
