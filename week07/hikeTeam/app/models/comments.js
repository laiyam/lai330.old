export default class Comments {
    constructor(elementId) {
      this.parentElement = document.getElementById(elementId);    
    }
  
    getAllComments() {
      return commentsList;
    }
  
    getCommentsByName(hikeName) {
      return this.getAllComments().find(comment => comment.name === hikeName);
    }
  
    //show a list of comments in the parentElement
    showCommentList() {
      //Clear the parent first and start from scratch
      this.parentElement.innerHTML = '';
      // notice that we use our getter above to grab the list instead of getting it directly...this makes it easier on us if our data source changes...
      renderCommmentList(this.parentElement, this.getAllComments());
      this.addCommentListener();
      // make sure the back button is hidden
      this.backButton.classList.add('hidden');
    }
    // show one comment with full details in the parentElement
    showOneComment(commentName) {
      const comment = this.getCommentByName(commentName);
      this.parentElement.innerHTML = '';
      this.parentElement.appendChild(createComment(comment));
      // show the back button
      this.backButton.classList.remove('hidden');
    }
    
    // Depending on how you hide/show your comment entry form you could end up with issues with your listeners. If you start getting funny behavior try using element.ontouchend = callback, instead of element.addEventListener('touchend', callback) when you attach the listener to your button. This will ensure that you only ever have one listener attached to the button at a time.
    addCommentListener() {
      // We need to loop through the children of our list and attach a listener to each, remember though that children is a nodeList...not an array. So in order to use something like a forEach we need to convert it to an array.
     const childrenArray = Array.from(this.parentElement.children);
      childrenArray.forEach(child => {
        child.addEventListener('touchend', e => {
          // why currentTarget instead of target?
          this.showOneComment(e.currentTarget.dataset.name);
        });
      });
    }
  }