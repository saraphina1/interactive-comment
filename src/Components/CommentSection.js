import { useState } from "react";
import data from "../data.json";
import Comment from "./Comment";
import UserComment from "./UserComment";
import DeleteModal from "./DeleteModal";

function CommentSection() {
    const [comments, setComments] = useState(() => data.comments);
    const [currentUser] = useState(data.currentUser);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteCommentId, setDeleteCommentId] = useState();

    function deleteCommentFromArray(id) {
        setShowDeleteModal(false);
        setComments((prevComments) => {
            let oldArray = prevComments;

            oldArray = oldArray.filter((comment) => comment.id !== id);
            oldArray.forEach((comment, index) => {
                oldArray[index].replies = comment.replies.filter(
                    (reply) => reply.id !== id
                );
            });

            return oldArray;
        });
    }

    function handleDelete(id) {
        setDeleteCommentId(id);
        setShowDeleteModal(true);
    }

    function handleRateChange(id, newValue) {
        setComments((prevComments) => {
            let oldArray = prevComments;

            oldArray = oldArray.map((comment) =>
                comment.id === id ? { ...comment, score: newValue } : comment
            );

            oldArray.forEach((comment, index) => {
                oldArray[index].replies = comment.replies.map((comment) =>
                    comment.id === id ? { ...comment, score: newValue } : comment
                );
            });

            return oldArray;
        });
    }

    function addComment(comment) {
        setComments((prevComments) => {
            return [...prevComments, comment];
        });
    }

    function addReply(id, newComment) {
        setComments((prevComments) => {
            let oldArray = [];
            oldArray = prevComments.map((comment) => {
                return comment.id === id
                    ? { ...comment, replies: [...comment.replies, newComment] }
                    : comment;
            });
            return oldArray;
        });
    }

    function handleEdit(id, newContent) {
        setComments((prevComments) => {
            let oldArray = prevComments;

            oldArray = oldArray.map((comment) =>
                comment.id === id ? { ...comment, content: newContent } : comment
            );

            oldArray.forEach((comment, index) => {
                oldArray[index].replies = comment.replies.map((comment) =>
                    comment.id === id ? { ...comment, content: newContent } : comment
                );
            });

            return oldArray;
        });
    }

    const dataElements = comments.map((element) => {
        return (
            <Comment
                key={element.id}
                data={element}
                currentUser={currentUser}
                deleteComment={handleDelete}
                rateChange={handleRateChange}
                addReply={addReply}
                handleEdit={handleEdit}
            />
        );
    });

    return (
        <div>
            {dataElements}
            {showDeleteModal && (
                <DeleteModal
                    cancelModal={() => setShowDeleteModal(false)}
                    deleteComment={() => deleteCommentFromArray(deleteCommentId)}
                />
                
            )}
            <UserComment currentUser={currentUser} addComment={addComment} />
        </div>
    );
}
export default CommentSection;





