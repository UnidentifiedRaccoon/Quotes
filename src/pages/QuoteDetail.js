import { Route, useHistory, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useEffect } from "react";

const QuoteDetail = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const params = useParams();
  const { quoteId } = params;
  const {
    sendRequest,
    status,
    error,
    data: loadedQuote,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const loadCommentsHandler = (event) => {
    event.preventDefault();
    history.replace(`${match.url}/comments`);
  };

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No quotes founded</p>;
  }
  return (
    <section>
      <HighlightedQuote
        text={loadedQuote.text}
        author={loadedQuote.author}
        key={loadedQuote.id}
      />
      <Route path={`${match.url}`} exact>
        <div className="centered">
          <a
            className="btn-flat"
            href={`${match.url}/comments`}
            onClick={loadCommentsHandler}
          >
            Load comments
          </a>
        </div>
      </Route>
      <Route path={`${match.url}/comments`}>
        <Comments quoteId={quoteId} />
      </Route>
    </section>
  );
};

export default QuoteDetail;
