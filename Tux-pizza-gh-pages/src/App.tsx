import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Cart from "./pages/Cart/Cart";
import NotFound from "./pages/NotFound/NotFound";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";

function Layout() {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
    </div>
  );
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/Tux-pizza" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
