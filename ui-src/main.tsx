import ReactDOM from "react-dom";
import App from "./App";
import ThemeConfigProvider from "./ThemeConfigProvider";
import ThemeProvider from "./ThemeProvider";

ReactDOM.render(
  <ThemeConfigProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ThemeConfigProvider>
  , document.getElementById("root")
);