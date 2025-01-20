import React from "react";
import AppRoutes from "./routes/routes";
import { useAuth } from "./hooks/useAuth";

function App() {
  const auth = useAuth();

  React.useEffect(() => {
    auth.initUserInstance();
  }, []);

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
