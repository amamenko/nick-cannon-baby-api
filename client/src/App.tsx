import { useCallback, useEffect, useState } from "react";
import NickCannonBabyApiLogo from "./assets/images/NickCannonBabyApiLogo.png";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import prettyHtml from "json-pretty-html";
import { FaGithub } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
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
            baby mamas.
            <br />
            <br />
            <a
              href="https://nick-cannon-baby-api.readme.io"
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
          <p className={`paragraph ${showMore ? "" : "hidden"}`}>
            Nick Cannon is an entertainer, actor, rapper, and comedian known for
            films such as Drumline (2002) and television shows such as All That
            and Wild 'n Out.
          </p>
          <p className={`paragraph ${showMore ? "" : "hidden"}`}>
            Cannon's many children with multiple women (often referred to as his
            "baby mamas") have become a{" "}
            <a
              href="https://knowyourmeme.com/memes/nick-cannon-kids"
              rel="noreferrer noopener"
              target="_blank"
              className="pink_link"
            >
              meme
            </a>{" "}
            referring to jokes about both his reproduction habits and his
            children's unique names.
          </p>
          <p className={`paragraph ${showMore ? "" : "hidden"}`}>
            Cannon's first children arrived in 2011 with his then-wife Mariah
            Carey - a pair of twin girls. Memes began to proliferate almost a
            decade later, when his total baby count grew from four to 11 in just
            two years.
          </p>
          <p className={`paragraph ${showMore ? "" : "hidden"}`}>
            An early example of a joke referring to his children's names is a
            tweet posted after his daughter Powerful Queen was born on December
            25th, 2020. Twitter user DopeBrwnGuy tweeted, "Nick Cannon could’ve
            named his kid Special Beam Cannon and now I’m pissed off he didn’t."
          </p>
          <p className={`paragraph ${showMore ? "" : "hidden"}`}>
            Another early example can be dated to April 11th, 2021 - this time
            targeting Nick Cannon's reproduction habits - Twitter user
            KennyB2324 tweeted a GIF of Thanos, captioning it, "Nick Cannon
            collecting kids like Infinity Stones…"
          </p>
          <p className={`paragraph ${showMore ? "" : "hidden"}`}>
            The total Nick Cannon baby count stands at 12 as of{" "}
            {new Date().getFullYear()}.
          </p>
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
                color={"#FFF"}
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
            <MdRefresh color="#000" size="25" />
            <span>Load a new Nick Cannon baby</span>
          </button>
        </div>
        <h4>Multiple Results</h4>
        <p>Retrieve a specific number of random Nick Cannon baby results.</p>
        <pre>
          <code className="request get">
            <a href={`${currentURL}/babies/random?results=5`}>
              {currentURL}/babies/random?results=5
            </a>
          </code>
        </pre>
        <h4>Specify gestation date</h4>
        <p>
          Retrieve a random Nick Cannon baby from a date falling between its
          approximate conception and birth.
        </p>
        <pre>
          <code className="request get">
            <a href={`${currentURL}/babies/random?date=05/01/2022&results=5`}>
              {currentURL}/babies/random?date=05/01/2022&results=5
            </a>
          </code>
        </pre>
        <h4>Specify mother</h4>
        <p>Retrieve a random Nick Cannon baby from a specific mother.</p>
        <pre>
          <code className="request get">
            <a href={`${currentURL}/babies/random?mother=mariah%20carey`}>
              {currentURL}/babies/random?mother=mariah%20carey
            </a>
          </code>
        </pre>
        <h4>Specify gender</h4>
        <p>Retrieve a random Nick Cannon baby of a specific gender.</p>
        <pre>
          <code className="request get">
            <a href={`${currentURL}/babies/random?gender=male`}>
              {currentURL}/babies/random?gender=male
            </a>
          </code>
        </pre>
        <h3>Ordered Baby</h3>
        <p>
          Retrieve a specific Nick Cannon baby by his or her index in the
          chronological order of all results.
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
          Retrieve all Nick Cannon babies between a first index and a second
          index, inclusive, in the chronological order of all results.
        </p>
        <pre>
          <code className="request get">
            <a href={`${currentURL}/babies/ordered/3-7`}>
              {currentURL}/babies/ordered/3-7
            </a>
          </code>
        </pre>
        <h3>All Mothers</h3>
        <p>Retrieve all names of Nick Cannon's baby mamas.</p>
        <pre>
          <code className="request get">
            <a href={`${currentURL}/babies/mothers`}>
              {currentURL}/babies/mothers
            </a>
          </code>
        </pre>
        <h3>All Names</h3>
        <p>Retrieve all names of Nick Cannon's children.</p>
        <pre>
          <code className="request get">
            <a href={`${currentURL}/babies/names`}>{currentURL}/babies/names</a>
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
            color="#7292ac"
            title="Support Avi on Ko-fi"
            kofiID="E1E3CFTNF"
          />
          <p className="other_projects">
            Check out Avi's other project:
            <br />{" "}
            <a
              href="https://owen-wilson-wow-api.onrender.com/"
              rel="noopener noreferrer"
              className="pink_link"
            >
              The Owen Wilson Wow API
            </a>
          </p>
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
