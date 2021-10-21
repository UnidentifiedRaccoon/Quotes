import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router-dom";
import { addQuote } from "../lib/api";
import useHttp from "../hooks/use-http";
import { useEffect } from "react";

const NewQuote = () => {
  const history = useHistory();
  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === "completed" && !status.error) {
      history.push("/quotes");
    } else {
      // Отображение сообщения об ошибке при отправке данных (можно исп useState)
    }
  }, [status, history]);
  const addNewQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };
  return (
    <section>
      <h1>NewQuote</h1>
      <QuoteForm
        onAddQuote={addNewQuoteHandler}
        isLoading={status === "pending"}
      />
    </section>
  );
};

export default NewQuote;
