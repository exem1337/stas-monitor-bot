import "./App.scss";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import MyDB from "./views/MyDB";
import MainPage from "./views/MainPage";

const App = () => {
  const routes = useRoutes([
    { path: '/', element: <MainPage /> },
    { path: '/:id', element: <MyDB/> }
  ])

  return routes;
}

const AppWrapper = () => {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);


  return (
    <Router>
      <div className='flex-grow-1'>
        <div className="app-wrapper ">
          <App />
        </div>
      </div>
    </Router>
  );
}

export default AppWrapper;
