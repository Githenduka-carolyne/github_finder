import Headerpart from "../src/Header/Headerpart"
import Profilepart from "./profile/Profilepart";
import "./assets/global.css"
function App() {
  return (
    <section className="home-section">
      <Headerpart />
      <Profilepart />
    </section>
  );
}

export default App
