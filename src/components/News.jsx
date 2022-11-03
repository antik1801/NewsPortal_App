import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    console.log("Hello I am a constructor from news components!");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/everything?q=apple&from=2022-11-02&to=2022-11-02&sortBy=popularity&apiKey=94ca675382ec49569ff62157b26cf9a8&page=1&pageSize=21";
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
    });
  }
  handlePrevClick = async () => {
    console.log("Handle Previous");
    let url = `https://newsapi.org/v2/everything?q=apple&from=2022-11-02&to=2022-11-02&sortBy=popularity&apiKey=94ca675382ec49569ff62157b26cf9a8&page=${
      this.state.page - 1
    }&pageSize=21`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({ articles: parseData.articles });
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
    });
  };
  handleNextClick = async () => {
    console.log("Next");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
    } else {
      let url = `https://newsapi.org/v2/everything?q=apple&from=2022-11-02&to=2022-11-02&sortBy=popularity&apiKey=94ca675382ec49569ff62157b26cf9a8&page=${
        this.state.page + 1
      }&pageSize=21`;
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({ articles: parseData.articles });
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
      });
    }
  };
  render() {
    return (
      <>
        <div className="container my-3 mx-4">
          <h1 className="mx-3 my-3">NewsMonkey - Top Headlines</h1>
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-3 mx-3" key={element.url}>
                  <NewsItem
                    title={element.title.slice(0, 21)}
                    description={element.description.slice(0, 88)}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark mx-2"
              onClick={this.handlePrevClick}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              className="btn btn-dark mx-2"
              onClick={this.handleNextClick}
            >
              Next &rarr;{" "}
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default News;
