import Router from "./Router";
import Context from "./Providers/Context";
// Check this for documentation ==> https://sonner.emilkowal.ski/
import { Toaster as Sonner } from "sonner";

function App() {
  return (
    <Context>
      <Router />

      <Sonner richColors theme="light" expand />
    </Context>
  );
}

export default App;
