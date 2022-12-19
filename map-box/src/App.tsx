import "./App.css";
import {
  GlobalStateConfig,
  MaterialUIConfig,
  RouterConfig,
  ServerStateConfig,
} from "./config";

function App() {
  return (
    <GlobalStateConfig>
      <MaterialUIConfig>
        <ServerStateConfig>
          <RouterConfig />
        </ServerStateConfig>
      </MaterialUIConfig>
    </GlobalStateConfig>
  );
}

export default App;
