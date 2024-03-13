import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";
import Search from "./components/Search";
import Result from "./components/Result";
import Detail from "./components/Detail";

// http://www.omdbapi.com/?i=tt3896198&apikey=6f1b164d




function App() {
    const [state, setState] = useState({
        search:'',
        results:[],
        selected:{}
    })
    const handleInput = (e) => {
        let search = e.target.value;
        setState((prevState) => {
            return{...prevState, search:search}
        })
    }
    const openDetail = (id) => {
        axios.get('http://www.omdbapi.com/?i='+id+'&apikey=6f1b164d')
        .then(({data}) => {
            setState((prevState) => {return {...prevState, selected: data}})
        })
        .catch(err => console.log(err))
    }

    const SearchResult = (e) => {
        if(e.key === "Enter") {
            axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=6f1b164d'+"&s="+state.search)
            .then(res => {
                setState(prevState => {
                    return{...prevState, results: res.data.Search};
                })
            })
            .catch(err => console.log(err))
        }
    }
    const close = () => {
        setState((prevState) => {return {...prevState, selected: {}}})
    }
  return (
    <div className="main-wrapper w-100 d-flex flex-column align-items-center min-vh-100">
        {typeof state.selected.Title !== "undefined" ? <Detail selected={state.selected} close={close}/> : 
      <header className="w-100 text-center text-white mt-5">
        <h1><b>Movie Craze</b></h1>
        <Search handleInput={handleInput} SearchResult={SearchResult} />
        <div className="container">
            <div className="row">
                {
                    state.results.map((result, i) => (
                        <div className="col-12 col-sm-6 col-md-3 col-lg-3 my-2">
                            <Result result = {result} openDetail={openDetail}/>
                        </div>
                    ))
                }
            </div>
        </div>
      </header>
      }
    </div>
  )
}
export default App;





