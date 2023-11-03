import "./App.scss";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DBListItem from "./components/DBListItem";
import { EDBStatuses } from "./enums/dbStatuses.enum";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import MyDB from "./views/MyDB";
import MainPage from "./views/MainPage";
import Header from "./components/header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const routes = useRoutes([
    { path: '/', element: <MainPage /> },
    { path: '/:id', element: <MyDB /> }
  ])
  return routes;
}

const AppWrapper = () => {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
		console.log(tg)
  }, []);


  return (
    <Router>
      <div className='flex-grow-1'>
        <div className="app-wrapper ">
            <Header/>
          <App />
        </div>
      </div>
    </Router>
  );
}

export default AppWrapper;
