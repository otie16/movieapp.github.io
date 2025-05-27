import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";
import Search from "./components/Search";
import Result from "./components/Result";
import Detail from "./components/Detail";

// OMDb API key and base URL
const API_KEY = "6f1b164d";
const BASE_URL = "http://www.omdbapi.com/";

function App() {
  const [state, setState] = useState({
    search: "",
    results: [],
    selected: {},
  });

  const handleInput = (e) => {
    const search = e.target.value;
    setState((prevState) => ({
      ...prevState,
      search: search,
    }));
  };

  const openDetail = (id) => {
    axios
      .get(`${BASE_URL}?i=${id}&apikey=${API_KEY}`)
      .then(({ data }) => {
        setState((prevState) => ({
          ...prevState,
          selected: data,
        }));
      })
      .catch((err) => console.error(err));
  };

  const SearchResult = (e) => {
    if (e.key === "Enter") {
      axios
        .get(`${BASE_URL}?apikey=${API_KEY}&s=${state.search}`)
        .then((res) => {
          setState((prevState) => ({
            ...prevState,
            results: res.data.Search || [],
          }));
        })
        .catch((err) => console.error(err));
    }
  };

  const close = () => {
    setState((prevState) => ({
      ...prevState,
      selected: {},
    }));
  };

  return (
    <div className="main-wrapper w-100 d-flex flex-column align-items-center min-vh-100">
      {typeof state.selected.Title !== "undefined" ? (
        <Detail selected={state.selected} close={close} />
      ) : (
        <header className="w-100 text-center text-white mt-5">
          <h1>
            <b>Movie Craze</b>
          </h1>
          <p>I added GitHub Actions to this</p>
          <p>For automated deployment<p>
          <Search handleInput={handleInput} SearchResult={SearchResult} />
          <div className="container">
            <div className="row">
              {state.results.map((result, i) => (
                <div
                  key={i}
                  className="col-12 col-sm-6 col-md-3 col-lg-3 my-2"
                >
                  <Result result={result} openDetail={openDetail} />
                </div>
              ))}
            </div>
          </div>
        </header>
      )}
    </div>
  );
}

export default App;
