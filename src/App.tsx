import React from "react";
import { Footer, Header, Main } from "./layout";

function App() {
  return (
    <div className="w-dvw h-[100dvh] overflow-hidden flex flex-col bg-slate-100">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
