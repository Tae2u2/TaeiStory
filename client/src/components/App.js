import { useState } from "react";
import LoginForm from "./LoginForm";
import Navigation from "./Navigation";
import AppRouter from "./Router";

function App() {
  return (
    <div className="App">
      <Navigation />
      <AppRouter />
    </div>
  );
}

export default App;
