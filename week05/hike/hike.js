// Example of using Classes and modules to organize the code needed to render our list of hikes. Not using MVC here.

//create an array of hikes
const hikeList = [
    {
        name: "Alpine Lookout",
        imgSrc: "Alpine.jpg",
        imgAlt: "Alpine Lookout Hudson River",
        distance: "4.8 miles",
        difficulty: "Moderate",
        description:
            "The 4.8 miles trail is Over 500 feet above the Hudson River, State Line Lookout sits atop the highest point on the New Jersey Palisades. The rock of the Palisades, called diabase, was formed underground by volcanic activity 200 million years ago. Processes of erosion, including the glaciers of the Ice Ages, then uncovered the eastern edge of the buried diabase and shaped it into cliffs.",
        directions:
            "State Line Lookout has its own unnumbered exit from the Palisades Interstate Parkway in Alpine, New Jersey, about 2 miles north of Exit 2."
    },
    {
        name: "Prospect Park Trail",
        imgSrc: "Prospect Park.jpg",
        imgAlt: "Prospect Park Lake",
        distance: "1.5 miles",
        difficulty: "Easy",
        description: "Beautiful short hike through Prospect Park. Explore the Lullwater to see how nature thrives in the heart of Brooklyn. The Lullwater is a great place to see birds and other wildlife.",
        directions:
            "Prospect Park W, Parkside Ave. bet. Flatbush Ave., Ocean Ave. and Prospect Park SW"
    },
    {
        name: "Mt Timpanogos Hike",
        imgSrc: "Timpanogos.jpg",
        imgAlt: "Timpanogos Tail",
        distance: "14 miles miles",
        difficulty: "Difficult",
        description:
            "The hike is a total of 13-15 miles roundtrip with an elevation gain of approximately 4,400-4,900 feet depending on which trailhead you take. While most people tackle this trail in one long day, we decided to break it up into two.Our plan was to hike up the Timpooneke Trail to the Timpanogos Basin and spend a night camping below the peak.Then we would rise early the next day and hike to the summit for sunrise.",
        directions:
            "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
  }
];

export default {
	hikeList
}

/*
const imgBasePath = "img/";
//const imgBasePath = "//laiyam.github.io/lai330/week05/hike/images/"





export default class Hikes {
  constructor(elementId) {
    this.parentElement = document.getElementById(elementId);
    // we need a back button to return back to the list. This will build it and hide it. When we need it we just need to remove the 'hidden' class
    this.backButton = this.buildBackButton();
  }

  // why is this function necessary?  hikeList is not exported, and so it cannot be seen outside of this module. I added this in case I ever need the list of hikes outside of the module. This also sets me up nicely if my data were to move. I can just change this method to the new source and everything will still work if I only access the data through this getter.
  getAllHikes() {
    return hikeList;
  }

  // For the first stretch we will need to get just one hike.
  getHikeByName(hikeName) {
    return this.getAllHikes().find(hike => hike.name === hikeName);
  }

  //show a list of hikes in the parentElement
  showHikeList() {
    this.parentElement.innerHTML = '';

	// notice that we use our getter above to grab the list instead of getting it directly...this makes it easier on us if our data source changes...
    renderHikeList(this.parentElement, this.getAllHikes());
    this.addHikeListener();

	// make sure the back button is hidden
    this.backButton.classList.add('hidden');
    }

  // show one hike with full details in the parentElement
  showOneHike(hikeName) {
    const hike = this.getHikeByName(hikeName);
    this.parentElement.innerHTML = '';
    this.parentElement.appendChild(renderOneHikeFull(hike));
    // show the back button
    this.backButton.classList.remove('hidden');
    }

  // in order to show the details of a hike ontouchend we will need to attach a listener AFTER the list of hikes has been built. The function below does that.
  addHikeListener() {
    // We need to loop through the children of our list and attach a listener to each, remember though that children is a nodeList...not an array. So in order to use something like a forEach we need to convert it to an array.
   
    const childrenArray = Array.from(this.parentElement.children);
    childrenArray.forEach(child => {
      child.addEventListener('touchend', e => {
        // why currentTarget instead of target?
        this.showOneHike(e.currentTarget.dataset.name);
      });
    });
    }

  buildBackButton() {
    const backButton = document.createElement('button');
    backButton.innerHTML = '&lt;- All Hikes';
    backButton.addEventListener('touchend', () => {
      this.showHikeList();
    });
    backButton.classList.add('hidden');
    this.parentElement.before(backButton);
    return backButton;
}

// methods responsible for building HTML.  Why aren't these in the class?  They don't really need to be, and by moving them outside of the exported class, they cannot be called outside the module...they become private.
function renderHikeList(parent, hikes) {
    hikes.forEach(hike => {
        parent.appendChild(renderOneHikeLight(hike));
    });
}

function renderOneHikeLight(hike) {
    const item = document.createElement("li");
    item.innerHTML = ` <h2>${hike.name}</h2>
    <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
    <div>
        <div>
            <h3>Distance</h3>
            <p>${hike.distance}</p>
        </div>
        <div>
            <h3>Difficulty</h3>
            <p>${hike.difficulty}</p>
        </div>
    </div>`;
    return item;
}

function renderOneHikeFull(hike) {
  const item = document.createElement('li');
  item.innerHTML = `

<img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}">
<h2>${hike.name}</h2>
<div>
    <h3>Distance</h3>
    <p>${hike.distance}</p>
</div>
<div>
    <h3>Difficulty</h3>
    <p>${hike.difficulty}</p>
</div>
<div>
    <h3>Description</h3>
    <p>${hike.description}</p>
</div>
<div>
    <h3>How to get there</h3>
    <p>${hike.directions}</p>
</div>

    `;
  return item;
}*/