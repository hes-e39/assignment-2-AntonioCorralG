import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Link, Outlet, RouterProvider, createHashRouter } from "react-router-dom";

import { TimerProvider } from "./context/TimerContext";
import TimersView from "./views/TimersView";
import DocumentationView from "./views/DocumentationView";
import AddTimer from "./views/AddTimer";

const PageIndex = () => {
  return (
    <div>
      <h1>Assignment</h1>
      <ul>
        <li>
          <Link to="/">Timers</Link>
        </li>
        <li>
          <Link to="/docs">Documentation</Link>
        </li>
        <li>
          <Link to="/add">Add Timer</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

const router = createHashRouter([
  {
    path: "/",
    element: <PageIndex />,
    children: [
      {
        index: true,
        element: <TimersView />,
      },
      {
        path: "/docs",
        element: <DocumentationView />,
      },
      {
        path: "/add",
        element: <AddTimer />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TimerProvider>
      <RouterProvider router={router} />
    </TimerProvider>
  </StrictMode>
);
