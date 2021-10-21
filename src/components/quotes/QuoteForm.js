import { useRef, useState } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [isFormFocused, setIsFormFocused] = useState(false);

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;
    if (enteredAuthor.length < 5) {
      setIsFormFocused(true);
      return;
    }

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const formFocusHandler = () => {
    setIsFormFocused(true);
  };

  const unShowPromptHandler = () => {
    setIsFormFocused(false);
  };

  return (
    <>
      <Prompt
        when={isFormFocused}
        message="If you leave this page all entered data would be lost"
      />
      <Card>
        <form
          className={classes.form}
          onFocus={formFocusHandler}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef} />
          </div>
          <div className={classes.actions}>
            <button className="btn" onClick={unShowPromptHandler}>
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
