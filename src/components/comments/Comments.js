import { useCallback, useEffect, useState } from "react";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import CommentsList from "./CommentsList";
import LoadingSpinner from "../UI/LoadingSpinner";

const Comments = (props) => {
  const { quoteId } = props;
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {
    sendRequest: fetchComments,
    status,
    data: commentsData,
  } = useHttp(getAllComments);
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  useEffect(() => {
    fetchComments(quoteId);
  }, [fetchComments, quoteId]);

  const addCommentHandler = useCallback(() => {
    fetchComments(quoteId);
  }, [fetchComments, quoteId]);

  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && (!commentsData || commentsData.length === 0)) {
    comments = <p className="centered">No comments added yet</p>;
  }

  if (status === "completed" && commentsData.length > 0) {
    console.log(commentsData);
    comments = <CommentsList comments={commentsData} />;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm onAddComment={addCommentHandler} quoteId={quoteId} />
      )}
      {comments}
    </section>
  );
};

export default Comments;
