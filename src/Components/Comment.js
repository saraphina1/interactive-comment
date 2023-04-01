import Rate from "./Rate.js";
import CommentTop from "./CommentTop.js";
import CommentContent from "./CommentContent.js";
import { useState } from "react";
import UserComment from "./UserComment.js";
import CommentUpdate from "./CommentUpdate.js";

export default function Comment(props) {
    const data = props.data;
    const hasReplies = data["replies"] && data.replies.length > 0;
    const isYou = data.user.username === props.currentUser.username;
    const [showReplyEditor, setShowReplyEditor] = useState(false);
    const isReply = data["replyingTo"] ? true : false;
    const [isEditing, setIsEditing] = useState(false);

    const replies = () => {
        if (data["replies"] && data.replies.length !== 0) {
            return data.replies.map((reply) => {
                return (
                    <Comment
                        key={reply.id}
                        parentId={data.id}
                        data={reply}
                        currentUser={props.currentUser}
                        deleteComment={() => props.deleteComment(reply.id)}
                        rateChange={props.rateChange}
                        addReply={props.addReply}
                        handleEdit={props.handleEdit}
                    ></Comment>
                );
            });
        }
    };

    function openCommentEditor() {
        setShowReplyEditor((prev) => !prev);
    }

    function addComment(content, parentName) {
        if (isReply) {
            props.addReply(props.parentId, content);
        }
        props.addReply(data.id, content);
        setShowReplyEditor(false);
    }

    function toggleEdit() {
        setIsEditing((prev) => !prev);
    }

    const replyElements = replies();

    return (
        <div className="comment-section">
            {/* comment */}

            <div className="comment-container">
                <Rate data={data} rateChange={props.rateChange} id={data.id} />
                <div className="comment-content">
                    <CommentTop
                        data={data}
                        isYou={isYou}
                        openCommentEditor={openCommentEditor}
                        toggleEdit={toggleEdit}
                        deleteComment={props.deleteComment}
                    />
                    {isEditing ? (
                        <CommentUpdate
                            data={data}
                            toggleEdit={toggleEdit}
                            handleEdit={props.handleEdit}
                            id={data.id}
                        />
                    ) : (
                        <CommentContent data={data} isReply={isReply} />
                    )}
                </div>
            </div>

            {/* reply editor */}

            {showReplyEditor && (
                <UserComment
                    currentUser={props.currentUser}
                    addComment={addComment}
                    isReply={isReply}
                    parentName={data.user.username}
                />
            )}

            {/* replies */}

            <div className="replies">
                {hasReplies && <div className="replies-divider"></div>}
                <div className="reply-container">{replyElements}</div>
            </div>
        </div>
    );
}