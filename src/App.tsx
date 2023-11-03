import "./App.scss";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MyDB from "./components/MyDB";
import Header from "./components/header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
		console.log(tg)
  }, []);

  const ListId = [1, 2, 3, 4, 5]

  return (
    <div className="App">
      <Header/>
      <BrowserRouter>

        <Routes>
         
          {ListId.map((id, index)=>
              <Route key={index} path={`/${id}`} element={<MyDB id={id}/>}/>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
