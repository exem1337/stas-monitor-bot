import "./App.scss";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import { Route, Routes } from "react-router-dom";

function App() {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
		console.log(tg)
  }, []);

  return (
    <div className="App">
      <Routes>
    
      </Routes>
    </div>
  );
}

export default App;
