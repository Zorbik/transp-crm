import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Container from "react-bootstrap/Container";
import { Appbar } from "./Appbar";

export const Layout = () => {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Appbar />
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Container>
    </Container>
  );
};
