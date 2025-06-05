import ReactDOM from "react-dom";
import App from "./App";
import PrimaryColorProvider from "./PrimaryColorProvider";
import ThemeProvider from "./ThemeProvider";

ReactDOM.render(
  <PrimaryColorProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </PrimaryColorProvider>
  , document.getElementById("root")
);