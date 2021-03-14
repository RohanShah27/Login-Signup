import "./App.css";
import LoginSignUp from "./components/Login-Signup/index";
import SuccessScreen from "./components/common/SuccessScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router basename="js-test">
      <Route exact path="/" component={LoginSignUp} />
      <Route exact path="/success" component={SuccessScreen} />
    </Router>
  );
}

export default App;
