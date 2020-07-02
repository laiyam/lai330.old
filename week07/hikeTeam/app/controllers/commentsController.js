import {commentsList} from '../data/commentsList.js';
//Code here

function createComment(comment){
 const y = comment.date.getFullYear();
 const m = comment.date.getMonth() + 1;
 const d = comment.date.getDate();
 const h = comment.date.getHours();
 const n = comment.date.getMinutes();
 const item = document.createElement("div");
 item.setAttribute("class", "comments");
  item.innerHTML = ` 
          <div>
              <p>${m}/${d}/${y} ${h}:${n}</p>
              <p>${comment.content}</p>
          </div>`;
  return item;
}

/*
It renders all the comments on the page given a "parent" element
*/
class commentsController{

renderCommentList() {
  //Get the parent element on the page
  const list = Array.from(document.querySelector("#my-app ul").children);

    list.forEach(child => {
      //Get the container
      const commentsContainer = child.lastChild;
      //get the name of the hike, we want to add comments to the right hike
      const hikeName = child.firstChild.nextSibling.innerHTML;
  //Create a list element
   commentsList.forEach(comment => {
     if (comment.name === hikeName)
          commentsContainer.appendChild(createComment(comment));
      })
})
}
}

export {commentsController}