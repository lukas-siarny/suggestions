import Suggestions from "./suggestions";
import Theme from "./Theme";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./suggestions/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Theme>
        <div className="App">
          <Suggestions />
        </div>
      </Theme>
    </Router>
  );
}

export default App;
