import CalculatePricing from "./components/CalculatePricing";
import CreatePricing from "./components/CreatePricing";
import UpdatePricing from "./components/UpdatePricing";
import ViewPricing from "./components/ViewPricing";

function App() {
  return (
    <div className="App">
      <h1>Pricing Module</h1>
      <CreatePricing />
      <UpdatePricing />
      <ViewPricing />
      <CalculatePricing />
    </div>
  );
}

export default App;
