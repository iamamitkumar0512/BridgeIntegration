import { Provider } from "react-redux";
import "./App.css";
import Bridge from "./Components/Bridge";
import store from "./Utils/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserData from "./Components/UserData";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Bridge />,
  },
  {
    path: "/customerData",
    element: <UserData />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Bridge Demo</h1>
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
