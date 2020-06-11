function getCommentList() {
    const commentListString = localStorage.getItem("CommentList");
    let commentList = [];

    if (commentListString) {
        commentList = JSON.parse(commentListString);
    }
    return toCommentList;
}

function saveComment(comment) {                   //save call from comment.js
    const toCommentList = getToCommentList();

    commentList.push(comment);
    localStorage.setItem("commentList", JSON.stringify(commentList));
}

function deleteComment(id) {                   //delete call from comment.js
    console.log(id);
    const commentList = getCommentList();

    const updatedComment = commentList.filter( comment => comment.id !=id);
    localStorage.setItem("commentList", JSON.stringify(updatedComment));
}

export default {
    saveComment,
    getCommentList,
    deleteComment
}