/* ========================= CLIPBOARD HELPER ========================= */
function copyToClipboard(text) {
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(text);
}

/* ========================= DATA ========================= */
const placeholderImage = "https://via.placeholder.com/400x250?text=Venue+Image";

/* ===== OUTREACH LOCATIONS (CHAMBER ONLY) ===== */
const outreachLocations = [
  { name: "Two Green Shoots", lat: 51.685, lng: -9.448 },
  { name: "Wild Atlantic Glamping", lat: 51.72, lng: -9.55 },
  { name: "Bantry Market (every Friday)", lat: 51.681, lng: -9.453 },
  { name: "West Cork Arts Centre", lat: 51.6818, lng: -9.4524 },
  { name: "Philips' Green", lat: 51.6822, lng: -9.4508 },
  { name: "The Maritime Hotel", lat: 51.68014, lng: -9.45727 },
  { name: "Whiddy Island", lat: 51.693, lng: -9.498 },
  { name: "Arundels By The Pier", lat: 51.6831, lng: -9.4455 },
  { name: "Amar's Cafe & Wine Bar", lat: 51.6813, lng: -9.4516 },
  { name: "Levis Corner House", lat: 51.6811, lng: -9.4529 },
  { name: "Heir Island", lat: 51.47, lng: -9.57 },
  { name: "Sherkin Island Public Library", lat: 51.469, lng: -9.42 },
  { name: "Cork Airport", lat: 51.8413, lng: -8.4911 }
];

/* ===== FESTIVAL DATA ===== */
const festivalData = {
  chamber: {
    name: "West Cork Chamber Music Festival",
    image: "https://www.westcorkmusic.ie/wp-content/uploads/2026/01/music.jpg",
    logo: "https://www.westcorkmusic.ie/wp-content/uploads/2024/04/WCCMF-Logo-2024-158-px-x-70-px-2.png",
    locations: [
      { name: "St Brendans National School Bantry", lat: 51.68151, lng: -9.45476, image: "https://www.westcorkmusic.ie/wp-content/uploads/2018/11/venue-stbrendans-school.jpg" },
      { name: "St. Brendan's Church", lat: 51.68093, lng: -9.45309, image: "https://www.westcorkmusic.ie/wp-content/uploads/2024/09/CS-Prog-2024-Uber-Menu.jpg" },
      { name: "Cork County Council, (Courthouse)", lat: 51.68113, lng: -9.45384, image: "https://www.westcorkmusic.ie/wp-content/uploads/2018/11/venue-courthouse.jpg" },
      { name: "Bantry Christian Fellowship Church", lat: 51.67990, lng: -9.45608, image: placeholderImage },
      { name: "Bantry pier", lat: 51.68069, lng: -9.46204, image: placeholderImage },
      { name: "Bantry Tourist Information Office", lat: 51.68023, lng: -9.45206, image: "https://di262mgurvkjm.cloudfront.net/01980b2b-c294-71cd-bffb-a18eee038ced/REPRO_FREE_Bantry_wclf_14.07.2025_KD__xgaplus.jpg" },
      { name: "The Brick Oven, Bantry", lat: 51.68040, lng: -9.45508, image: "https://www.westcorkmusic.ie/wp-content/uploads/2018/11/venue-the-brick-oven-1.jpg" },
      { name: "The Maritime Hotel, Bantry", lat: 51.68014, lng: -9.45727, image: "https://www.westcorkmusic.ie/wp-content/uploads/2018/11/venue-maritime-hotel-1.jpg" },
      { name: "Bantry House", lat: 51.67751, lng: -9.46438, image: "https://www.westcorkmusic.ie/wp-content/uploads/2019/03/Bantry-House-Gardens.jpg" },
      { name: "Marino Church, Bantry", lat: 51.68054, lng: -9.45178, image: "https://www.westcorkmusic.ie/wp-content/uploads/2022/08/Marino-Old-Methodist-Church.jpg" },
      { name: "West Cork Music Box Office [BOX OFFICE]", lat: 51.68051, lng: -9.44856, image: "https://www.westcorkmusic.ie/wp-content/uploads/2018/11/wcm-office-2024.jpg" }
    ]
  },

  masters: {
    name: "Masters of Tradition",
    image: "https://www.westcorkmusic.ie/wp-content/uploads/2026/01/WCM-Website-banners-3.jpg",
    logo: "https://www.westcorkmusic.ie/wp-content/uploads/2024/04/MOT-Logo-2024-158-px-x-70-px.png",
    locations: [
      { name: "St. Brendan's Church", lat: 51.68093, lng: -9.45309, image: placeholderImage },
      { name: "Bantry House", lat: 51.67751, lng: -9.46438, image: placeholderImage },
      { name: "Maritime Hotel, Bantry", lat: 51.68014, lng: -9.45727, image: placeholderImage },
      { name: "Marino Church, Bantry", lat: 51.68054, lng: -9.45178, image: placeholderImage },
      { name: "Bantry Pier", lat: 51.68069, lng: -9.46204, image: placeholderImage },
      { name: "Future Forests", lat: 51.787, lng: -9.473, image: placeholderImage },
      { name: "West Cork Music Box Office [BOX OFFICE]", lat: 51.684, lng: -9.449, image: placeholderImage }
    ]
  },

  literary: {
    name: "West Cork Literary Festival",
    image: "https://www.westcorkmusic.ie/wp-content/uploads/2024/09/DSC_7560-scaled-1200x483.jpg",
    logo: "https://www.westcorkmusic.ie/wp-content/uploads/2025/04/WCLF-Header-Logo-for-Website-158px-x-70px.png",
    locations: [
      { name: "Bantry Pier", lat: 51.68069, lng: -9.46204, image: placeholderImage },
      { name: "Abbey Strand, Bantry (Festival Swim)", lat: 51.67728, lng: -9.47165, image: placeholderImage },
      { name: "Bantry House", lat: 51.67751, lng: -9.46438, image: placeholderImage },
      { name: "Maritime Hotel, Bantry", lat: 51.68021, lng: -9.45719, image: placeholderImage },
      { name: "St Brendans National School Bantry", lat: 51.68145, lng: -9.45460, image: placeholderImage },
      { name: "National Learning Network, Bantry", lat: 51.69961, lng: -9.44203, image: placeholderImage },
      { name: "Future Forests", lat: 51.787, lng: -9.473, image: placeholderImage },
      { name: "Marino Church, Bantry", lat: 51.68055, lng: -9.45187, image: placeholderImage },
      { name: "Ma Murphy's Bar, Bantry", lat: 51.67947, lng: -9.45086, image: placeholderImage },
      { name: "Bantry Library", lat: 51.67850, lng: -9.44938, image: placeholderImage },
      { name: "St Finbarr's Boys School, Bantry", lat: 51.67694, lng: -9.44104, image: placeholderImage },
      { name: "Bantry Bookshop", lat: 51.67969, lng: -9.45205, image: placeholderImage },
      { name: "West Cork Music Box Office [BOX OFFICE]", lat: 51.684, lng: -9.449, image: placeholderImage }
    ]
  }
};

/* ========================= MAP ========================= */
const map = L.map("map").setView([51.68, -9.45], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

let markers = [];
let outreachMarkers = [];
let outreachVisible = false;
let currentFestival = null;

/* ===== ICONS ===== */
const outreachIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

/* ========================= POPUP ========================= */
function popupHTML(loc) {
  return `
    <div class="popup">
      <strong>${loc.name}</strong><br>
      <a target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}">
        📍 Get directions
      </a>
    </div>
  `;
}

/* ========================= LOAD FESTIVAL ========================= */
function loadFestival(key) {
  currentFestival = key;
  outreachVisible = false;
  
  // Clear existing markers
  markers.forEach(m => map.removeLayer(m));
  markers = [];
  outreachMarkers.forEach(m => map.removeLayer(m));
  outreachMarkers = [];

  const data = festivalData[key];

  // Update header
  document.getElementById("festival-logo").src = data.logo;
  document.getElementById("header-title").textContent = data.name;
  document.getElementById("header-subtitle").textContent = "2026 Festival Venues";
  document.getElementById("list-header").style.backgroundImage = `url(${data.image})`;

  // Clear and rebuild secondary buttons container
  const secondaryContainer = document.getElementById("secondary-buttons");
  if (secondaryContainer) {
    secondaryContainer.innerHTML = '';
  } else {
    // Create secondary buttons container if it doesn't exist
    const btnContainer = document.getElementById('button-container');
    const newSecondary = document.createElement('div');
    newSecondary.id = 'secondary-buttons';
    btnContainer.appendChild(newSecondary);
  }

  // Show outreach button only for chamber
  if (key === "chamber") {
    createOutreachButton();
  }

  // Update active state on main buttons
  document.querySelectorAll("#festival-buttons button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.festival === key);
  });

  // Populate list
  const list = document.getElementById("list");
  list.innerHTML = "";

  const bounds = L.latLngBounds([]);

  data.locations.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng])
      .addTo(map)
      .bindPopup(popupHTML(loc));

    markers.push(marker);
    bounds.extend([loc.lat, loc.lng]);

    const item = document.createElement("div");
    item.className = "location";
    item.textContent = loc.name;

    if (loc.name.toUpperCase().includes("BOX OFFICE")) {
      item.classList.add("box-office");
    }

    item.onclick = () => {
      map.setView([loc.lat, loc.lng], 15);
      marker.openPopup();
    };

    list.appendChild(item);
  });

  map.fitBounds(bounds, { padding: [40, 40] });
}

/* ========================= CREATE OUTREACH BUTTON ========================= */
function createOutreachButton() {
  const container = document.getElementById("secondary-buttons");
  const btn = document.createElement("button");
  btn.id = "outreach-btn";
  btn.textContent = "+ Show Outreach Venues";
  
  btn.onclick = () => {
    outreachVisible = !outreachVisible;

    if (outreachVisible) {
      btn.textContent = "− Hide Outreach Venues";
      btn.classList.add("active");
      
      const list = document.getElementById("list");
      
      outreachLocations.forEach(loc => {
        // Add marker
        const m = L.marker([loc.lat, loc.lng], { icon: outreachIcon })
          .addTo(map)
          .bindPopup(`<strong>${loc.name}</strong>`);
        outreachMarkers.push(m);
        
        // Add to list with fringe-venue class
        const item = document.createElement("div");
        item.className = "location fringe-venue";
        item.textContent = loc.name;
        item.onclick = () => {
          map.setView([loc.lat, loc.lng], 15);
          m.openPopup();
        };
        list.appendChild(item);
      });
      
      // Refit bounds to include new markers
      const bounds = L.latLngBounds([]);
      markers.forEach(m => bounds.extend(m.getLatLng()));
      outreachMarkers.forEach(m => bounds.extend(m.getLatLng()));
      map.fitBounds(bounds, { padding: [40, 40] });
      
    } else {
      btn.textContent = "+ Show Outreach Venues";
      btn.classList.remove("active");
      
      // Remove markers
      outreachMarkers.forEach(m => map.removeLayer(m));
      outreachMarkers = [];
      
      // Remove from list
      const items = document.querySelectorAll(".location.fringe-venue");
      items.forEach(item => item.remove());
    }
  };

  container.appendChild(btn);
}

/* ========================= EVENT LISTENERS ========================= */
document.querySelectorAll("#festival-buttons button").forEach(btn => {
  btn.onclick = () => loadFestival(btn.dataset.festival);
});

/* ========================= INIT ========================= */
loadFestival("chamber");