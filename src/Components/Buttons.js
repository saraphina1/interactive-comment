import replyIcon from "../assets/iconReply.svg";
import editIcon from "../assets/iconEdit.svg";
import deleteIcon from "../assets/iconDelete.svg";

export default function Buttons(props) {
    return (
        <div className="comment-buttons">
            {props.isYou ? (
                <div className="you-button">
                    <div
                        className="comment-delete"
                        onClick={() => props.deleteComment(props.data.id)}
                    >
                        <img src={deleteIcon} alt=""></img>
                        <span>Delete</span>
                    </div>
                    <div onClick={props.toggleEdit} className="edit-button">
                        <img src={editIcon} alt=""></img>
                        <span>Edit</span>
                    </div>
                </div>
            ) : (
                <div className="blue-button" onClick={props.openCommentEditor}>
                    <img src={replyIcon} alt=""></img>
                    <span>Reply</span>
                </div>
            )}
        </div>
    );
}
