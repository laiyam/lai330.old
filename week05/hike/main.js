//import Hikes from './hike.js';
//on load grab the array and insert it into the page
/*const myHikes = new Hikes('hikes');
window.addEventListener('load', () => {
    myHikes.showHikeList();
});*/




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

//const imgBasePath = "images/";
const imgBasePath = "//laiyam.github.io/lai330/week05/hike/images/";


//on load grab the array and insert it into the page
window.addEventListener("load", () => {
    showHikeList();
});

function showHikeList(hikeId) {
    const hikeListElement = document.getElementById("hikes");
    hikeListElement.innerHTML = "";
	console.log(hikeId);
    renderHikeList(hikeId, hikeList, hikeListElement);
}

function renderHikeList(hikeId, hikes, parent) {
    hikes.forEach(hike => {
		console.log(hikeId);
		if (hikeId != null) {
			const hikeName = hike.name.replace(/\s/g,'');
			if (hikeId == hikeName) {
					parent.appendChild(renderOneHikeFull(hikeId, hike));
			}	
		} else {
			parent.appendChild(renderOneHike(hike));
		}
		
    });
}

function renderOneHike(hike) {
	
    const item = document.createElement("li");

	const hikeId = hike.name.replace(/\s/g,'');

	item.innerHTML = `<section id=${hikeId} onclick="showHikeList(this.id)">
	 <h2>${hike.name}</h2>	
		<div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>       
		<div>
			<h3>Distance</h3>
			<p>${hike.distance}</p>
		</div>
		<div>
			<h3>Difficulty</h3>
			<p>${hike.difficulty}</p>
		</div>
	</section>`;

    return item;
}
	

function renderOneHikeFull(hikeId, hike) {
	const item = document.createElement('li');
	console.log(hikeId);
	const hikeName = hike.name.replace(/\s/g,'');
	if (hikeId == hikeName) {
	item.innerHTML = `<section>
		<h2>${hike.name}</h2>
		<div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
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
		<button id="exitBtn" onclick="showHikeList()">Back</button>
	</section>`;
	
	return item;
	}
}

