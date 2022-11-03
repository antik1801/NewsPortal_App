
import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import NewsItem from './components/NewsItem';
export default class App extends Component {
  render() {
    return (
      <Router>
      <div>
       
        <NavBar />
      {/* <Spinner /> */}
        <News PageSize={5}/>
        <Routes>
        <Route exact path="/relevancy" element={<NewsItem relevancy="relevancy"/>} />
        </Routes>
      </div>
      </Router>
    )
  }
}

