import { useCallback, useEffect, useState } from "react";
import NickCannonBabyApiLogo from "./assets/images/NickCannonBabyApiLogo.png";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import prettyHtml from "json-pretty-html";
import { FaGithub } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import KofiButton from "kofi-button";
import "./App.css";

const App = () => {
  const currentURL =
    process.env.REACT_APP_NODE_ENV === "production"
      ? window.location.origin
      : "http://localhost:4000";
  const [showMore, changeShowMore] = useState(false);
  const [exampleResponse, changeExampleResponse] = useState("");

  const toggleMore = () => {
    changeShowMore(!showMore);
  };

  const getExample = useCallback(async () => {
    await axios
      .get(
        process.env.REACT_APP_NODE_ENV === "production"
          ? `${currentURL}/babies/random`
          : "http://localhost:4000/babies/random"
      )
      .then((res) => res.data)
      .then((data) => {
        changeExampleResponse(prettyHtml(data));
      })
      .catch((e) => console.error(e));
  }, [currentURL]);

  useEffect(() => {
    getExample();
  }, [getExample]);

  return (
    <div className="app_wrapper">
      <div className="main_wrapper">
        <div className="main_container">
          <img
            className="api_logo"
            src={NickCannonBabyApiLogo}
            alt="Nick Cannon Baby API Logo"
          />
        </div>
        <div className="explanation_paragraphs">
          <p>
            <b>
              <a
                href={currentURL}
                className="pink_link"
                rel="noreferrer noopener"
              >
                {window.location.host}
              </a>
            </b>{" "}
            is a free JSON API for entertainer Nick Cannon's many children and
            associated baby mamas.
            <br />
            <br />
            <a
              href="https://baby.readme.io"
              rel="noreferrer noopener"
              className="pink_link"
            >
              View the full API docs
            </a>{" "}
            (powered by{" "}
            <a
              href="https://readme.com"
              rel="noreferrer noopener"
              className="pink_link"
            >
              ReadMe 🦉
            </a>
            )
            <br />
            <br />
            <span className="read_more" onClick={toggleMore}>
              Read more
            </span>
          </p>
          <p className={`paragraph ${showMore ? "" : "hidden"}`}></p>
        </div>
        <h2>Usage</h2>
        <h3>Random Baby</h3>
        <p>Retrieve a random Nick Cannon baby in JSON format.</p>
        <pre>
          <code className="request get">
            <a href={`${currentURL}/babies/random`}>
              {currentURL}/babies/random
            </a>
          </code>
        </pre>
        <p>Example JSON response:</p>
        <pre>
          <code className="request">
            {exampleResponse ? (
              <div dangerouslySetInnerHTML={{ __html: exampleResponse }} />
            ) : (
              <ClipLoader
                color={"#000"}
                loading={exampleResponse ? false : true}
                size={15}
              />
            )}
          </code>
        </pre>
        <div className="refresh-button-wrapper">
          <button
            className="new-baby-button"
            type="button"
            onClick={getExample}
          >
            Load a new baby
          </button>
        </div>
        <h4>Multiple Results</h4>
        <p>Retrieve a specific number of random baby results.</p>
        <pre>
          <code className="request get">
            <a href={`${currentURL}/babies/random?results=5`}>
              {currentURL}/babies/random?results=5
            </a>
          </code>
        </pre>
        <h4>Specify year</h4>
        <p>Retrieve a random baby from a specific year.</p>
        <pre>
          <code className="request get">
            <a href={`${currentURL}/babies/random?year=2011`}>
              {currentURL}/babies/random?year=2011
            </a>
          </code>
        </pre>
        <h4>Specify movie</h4>
        <p>Retrieve a random baby by the name of the movie it appears in.</p>
        <pre>
          <code className="request get">
            <a href={`${currentURL}/babies/random?movie=zoolander`}>
              {currentURL}/babies/random?movie=zoolander
            </a>
          </code>
        </pre>
        <h4>Sort multiple results</h4>
        <p>
          Sort multiple random results by either movie, release_date, year, or
          director. Sort direction can be either asc (ascending) or desc
          (descending).
        </p>
        <pre>
          <code className="request get">
            <a
              href={`${currentURL}/babies/random?results=10&sort=movie&direction=desc`}
            >
              {currentURL}/babies/random?results=10&sort=movie&direction=desc
            </a>
          </code>
        </pre>
        <h3>Ordered Baby</h3>
        <p>
          Retrieve a specific baby by his or her index in the chronological
          order of all results.
        </p>
        <pre>
          <code className="request get">
            <a href={`${currentURL}/babies/ordered/0`}>
              {currentURL}/babies/ordered/0
            </a>
          </code>
        </pre>
        <h4>Multiple Ordered Baby Results</h4>
        <p>
          Retrieve all baby results between a first index and a second index,
          inclusive, in the chronological order of all results.
        </p>
        <pre>
          <code className="request get">
            <a href={`${currentURL}/babies/ordered/3-7`}>
              {currentURL}/babies/ordered/3-7
            </a>
          </code>
        </pre>
        <div className="contact">
          <p>
            <b>Contact:</b> If you have a correction or a suggestion for the
            API, feel free to open up an{" "}
            <a
              href="https://github.com/amamenko/nick-cannon-baby-api/issues"
              rel="noopener noreferrer"
              className="pink_link"
            >
              issue
            </a>{" "}
            on its{" "}
            <a
              href="https://github.com/amamenko/nick-cannon-baby-api"
              rel="noopener noreferrer"
              className="pink_link"
            >
              GitHub repository
            </a>
            . If you have a comment or a question about the API, you may reach
            out to its creator on Twitter{" "}
            <a
              href="https://twitter.com/AviMamenko"
              rel="noopener noreferrer"
              className="pink_link"
            >
              @AviMamenko
            </a>{" "}
            or by filling out the contact form on{" "}
            <a
              href="https://amamenko.github.io"
              rel="noopener noreferrer"
              className="pink_link"
            >
              his website
            </a>
            .
          </p>
        </div>
        <div className="disclaimer">
          <p>
            <b>Disclaimer:</b> The Nick Cannon Baby API is not affiliated,
            associated, authorized, endorsed by, or in any way officially
            connected with Nick Cannon, or any of his subsidiaries or
            affiliates. All motion pictures, products, and brands mentioned on
            this website are the respective trademarks and copyrights of their
            owners.
          </p>
        </div>
        <p>
          The Nick Cannon Baby API was created in 2022 by{" "}
          <a
            href="https://amamenko.github.io"
            rel="noopener noreferrer"
            className="pink_link"
          >
            Avi Mamenko
          </a>
          .
        </p>
        <div className="support_container">
          <p>Loving the Nick Cannon Baby API?</p>
          <KofiButton
            color="#7d7aab"
            title="Support Avi on Ko-fi"
            kofiID="E1E3CFTNF"
          />
        </div>
        <div className="bottom_icons">
          <a
            href="https://github.com/amamenko/nick-cannon-baby-api"
            rel="noopener noreferrer"
          >
            <FaGithub color="#FFF" size="50" />
          </a>
          <a href="https://twitter.com/AviMamenko" rel="noopener noreferrer">
            <AiFillTwitterCircle color="#FFF" size="55" />{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
