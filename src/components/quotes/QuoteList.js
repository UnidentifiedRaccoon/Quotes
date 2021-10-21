import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";
import { useHistory, useLocation } from "react-router-dom";

const sort = (quotes, isAsc) => {
  return quotes.sort((a, b) => {
    if (isAsc) {
      return a.id > b.id ? 1 : -1;
    } else {
      return a.id < b.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const isAscending = queryParams.get("sort") === "asc";
  const sortedQuotes = sort(props.quotes, isAscending);

  const clickSortHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isAscending ? "desc" : "asc"}`,
    });
  };
  return (
    <>
      <div className={classes.sorting}>
        <button onClick={clickSortHandler}>
          Sort {isAscending ? "descending" : "ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </>
  );
};

export default QuoteList;
