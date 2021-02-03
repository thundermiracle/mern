import React from "react";

import { Container } from "react-bootstrap";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./views/HomeView";
import ProductView from "./views/ProductView";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeView} exact />
          <Route path="/product/:id" component={ProductView} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
