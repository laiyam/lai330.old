import {hikeList} from '../data/hikesList.js';
const imgBasePath = "//byui-cit.github.io/cit261/examples/";
//const imgBasePath = "../images/";
// methods responsible for building HTML.  Why aren't these in the class?  They don't really need to be, and by moving them outside of the exported class, they cannot be called outside the module...they become private.
function renderHikeList(parent, hikes) {}
function renderOneHikeLight(hike) {
  const item = document.createElement("li");
  item.innerHTML = ` <h2>${hike.name}</h2>
  <div class="container">
  <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
  <div class="data">
          <div>
              <h3>Distance</h3>
              <p>${hike.distance}</p>
          </div>
          <div>
              <h3>Difficulty</h3>
              <p>${hike.difficulty}</p>
          </div>
  </div>
  </div>`;
  return item;
}
function renderOneHikeFull(hike) {
  const item = document.createElement("li");

  return item;
}

class hikesContrller {
  render() {
      console.log(hikeList);
      const renderSection = document.getElementById('my-app');
      const ul = document.createElement("ul");
      hikeList.forEach(hike => {
          ul.appendChild(renderOneHikeLight(hike));
      })
      renderSection.appendChild(ul);
  }
}
 

export {hikesContrller}