import { Footer, Header, Main } from "@/layout";
import { AppContextProvider } from "./context";

function App() {
  return (
    <div className="w-dvw h-dvh overflow-hidden flex flex-col bg-slate-100">
      <Header />
      <AppContextProvider>
        <Main />
      </AppContextProvider>
      <Footer />
    </div>
  );
}

export default App;
