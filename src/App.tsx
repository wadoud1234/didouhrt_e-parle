import Router from "./Router";
import Context from "./Providers/Context";
// Check this for documentation ==> https://sonner.emilkowal.ski/
import { Toaster as Sonner } from "sonner";
import AuthProvider from "./Providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Context>
        <Router />
        <Sonner richColors theme="light" expand />
      </Context>
    </AuthProvider>
  );
}

export default App;
