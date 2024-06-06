import Router from "./components/Router/Router";
import StoreProvider from "./store/store";

function App() {
  //testing to see if state is available
  return (
    //Making the store parially global
    <StoreProvider>
      <Router/>
    </StoreProvider>
  );
}

export default App;
