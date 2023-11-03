import "./App.scss";
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./components/Main";
import MyDB from "./components/MyDb/MyDB";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
   const {onToggleButton, tg} = useTelegram();

   useEffect(() => {
      tg.ready();
   }, []);

   const ListId = [
      {
         id: 1,
         name: 'График 1',
         data: [
            {
               name: 'Название', time: Date.now() - 1000, 'Сбои': 400
            },
            {
               name: 'Название', time: Date.now()- 9000, 'Сбои': 100
            },
            {
               name: 'Название', time: Date.now() - 19000, 'Сбои': 200
            }
         ]
      },
      {
         id: 2,
         name: 'График 2',
         data: [
            {time: 'Page A', 'Сбои': 400},
            {time: 'Page B', 'Сбои': 100}
         ]
      },
      {
         id: 3,
         name: 'График 3',
         data: [
            {
               time: 'График A', 'Сбои': 400
            }
         ]
      }
   ]

   return (
      <div className="App">
         <BrowserRouter>
            <Routes>
               <Route path={"/"} element={<Main/>}/>
               {ListId.map((db, index) =>
                  <Route key={index} path={`/${db.id}`} element={<MyDB db={db}/>}/>
               )}
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
