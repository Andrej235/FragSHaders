import ReactDOM from "react-dom/client";
import "./index.scss";
import { StrictMode } from "react";
import { ShaderTesting } from "./Shader/ShaderTesting";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ShaderTesting />
  </StrictMode>
);
