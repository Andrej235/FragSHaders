import ReactDOM from "react-dom/client";
import "./index.scss";
import { StrictMode } from "react";
import { FadeOutScreen } from "./FadeoutScreen/FadeoutScreen";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <FadeOutScreen />
  </StrictMode>
);
