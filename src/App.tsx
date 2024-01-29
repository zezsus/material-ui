/** @format */
import { Fragment } from "react";
import DefaultComponent from "./components/DefaultComponent";
import { routers } from "./routers/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

function App() {
  const clientQuery = new QueryClient();
  return (
    <QueryClientProvider client={clientQuery}>
      <BrowserRouter>
        <Routes>
          {routers.map((router: any) => {
            const Page = router.page;
            const LayOut = router.isShowNav ? DefaultComponent : Fragment;
            return (
              <Route
                key={router.path}
                path={router.path}
                element={
                  <LayOut>
                    <Page />
                  </LayOut>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
