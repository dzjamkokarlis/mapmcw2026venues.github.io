/* =========================================================================
   FESTIVAL MAP — DATA-DRIVEN VERSION
   ---------------------------------------------------------------------
   All venue names, coordinates, photos, banners, logos and text now
   live in a Google Sheet, NOT in this file. This file only needs to be
   touched once, to paste in the two links below. After that, anyone
   can add/edit venues or festivals just by editing the spreadsheet.

   See SETUP-GUIDE.md for exactly how to set up the sheet.
   ========================================================================= */

const FESTIVALS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRGCDsfhVfMyk5U3FUesY6toydaDxLjR5CgsNI_q8wkWj-JGCFA_H0bfSz6WLmP8zo61Wzco03MQX4E/pub?gid=993030145&single=true&output=csv";
const VENUES_CSV_URL    = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRGCDsfhVfMyk5U3FUesY6toydaDxLjR5CgsNI_q8wkWj-JGCFA_H0bfSz6WLmP8zo61Wzco03MQX4E/pub?gid=992720456&single=true&output=csv";

/* Optional. Leave as-is to keep the site's original look untouched.
   Only fill this in if you've set up the "Design" tab described in
   SETUP-GUIDE.md, Part 3, and want to control colors/fonts from the sheet. */
const DESIGN_CSV_URL = "";

/* ========================================================================= */
/* Nothing below this line needs to be edited to update map content.         */
/* ========================================================================= */

const placeholderImage = "https://via.placeholder.com/400x250?text=Venue+Image";

function copyToClipboard(text) {
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(text).then(() => alert("Image address copied"));
}

/* Friendly style presets so the spreadsheet never needs raw CSS/font names.
   Leave the "Style" column blank in the Festivals sheet for a plain default. */
const STYLE_PRESETS = {
  elegant:     { fontClass: "font-style-elegant",     blurMode: false },
  traditional: { fontClass: "font-style-traditional", blurMode: false },
  modern:      { fontClass: "font-style-modern",      blurMode: true  }
};
function resolveStyle(styleName) {
  const key = (styleName || "").trim().toLowerCase();
  return STYLE_PRESETS[key] || { fontClass: "font-style-default", blurMode: false };
}

/* Friendly names for the optional "Design" tab, mapped to real CSS values.
   Matches the presets shown in theme-editor.html. */
const RADIUS_PRESETS = { sharp: "2px", soft: "6px", round: "14px" };
const OVERLAY_PRESETS = { light: "0.15", medium: "0.4", dark: "0.65" };
const FONT_PRESETS = {
  classic: "Arial, sans-serif",
  modern: '"Open Sans", Arial, sans-serif',
  rounded: "Verdana, Geneva, sans-serif"
};

function applyDesignSettings(rows) {
  const settings = {};
  rows.forEach(row => {
    const key = (row["Setting"] || "").trim();
    const val = (row["Value"] || "").trim();
    if (key) settings[key] = val;
  });

  const root = document.documentElement.style;
  if (settings["Accent Color"]) root.setProperty("--accent-color", settings["Accent Color"]);
  if (settings["List Background Color"]) root.setProperty("--list-bg", settings["List Background Color"]);

  const radiusKey = (settings["Corner Roundness"] || "").toLowerCase();
  if (RADIUS_PRESETS[radiusKey]) root.setProperty("--radius-base", RADIUS_PRESETS[radiusKey]);

  const overlayKey = (settings["Banner Overlay"] || "").toLowerCase();
  if (OVERLAY_PRESETS[overlayKey]) root.setProperty("--overlay-opacity", OVERLAY_PRESETS[overlayKey]);

  const fontKey = (settings["List Font"] || "").toLowerCase();
  if (FONT_PRESETS[fontKey]) root.setProperty("--list-font", FONT_PRESETS[fontKey]);
}

/* ========================= LOAD DATA FROM GOOGLE SHEETS ========================= */
function fetchCSV(url) {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: results => resolve(results.data),
      error: reject
    });
  });
}

async function loadData() {
  const list = document.getElementById("list");
  list.innerHTML = '<div class="status-msg">Loading venues&hellip;</div>';

  if (FESTIVALS_CSV_URL.startsWith("PASTE_") || VENUES_CSV_URL.startsWith("PASTE_")) {
    list.innerHTML = '<div class="status-msg status-error">The Google Sheet links haven\u2019t been set up yet in script.js. See SETUP-GUIDE.md.</div>';
    return;
  }

  try {
    const fetches = [fetchCSV(FESTIVALS_CSV_URL), fetchCSV(VENUES_CSV_URL)];
    if (DESIGN_CSV_URL) fetches.push(fetchCSV(DESIGN_CSV_URL));

    const [festivalRows, venueRows, designRows] = await Promise.all(fetches);

    if (designRows) applyDesignSettings(designRows);

    const festivalData = {};
    const order = [];

    festivalRows.forEach(row => {
      const key = (row["Key"] || "").trim();
      if (!key) return;
      order.push(key);
      festivalData[key] = {
        name: row["Display Name"] || key,
        subtitle: row["Subtitle"] || "",
        image: (row["Banner Image URL"] || "").trim(),
        logo: (row["Logo URL"] || "").trim(),
        style: resolveStyle(row["Style"]),
        locations: [],
        extraLocations: []
      };
    });

    venueRows.forEach(row => {
      const key = (row["Festival Key"] || "").trim();
      const fest = festivalData[key];
      if (!fest) return; // row's Festival Key doesn't match any row in the Festivals tab — skip it

      const lat = parseFloat(row["Latitude"]);
      const lng = parseFloat(row["Longitude"]);
      if (isNaN(lat) || isNaN(lng)) return; // skip rows with missing/broken coordinates rather than crash

      const loc = {
        name: (row["Venue Name"] || "Untitled venue").trim(),
        lat, lng,
        image: (row["Image URL"] || "").trim() || placeholderImage
      };

      const isFringe = (row["Fringe"] || "").trim().toLowerCase() === "yes";
      (isFringe ? fest.extraLocations : fest.locations).push(loc);
    });

    if (!order.length) {
      list.innerHTML = '<div class="status-msg status-error">No festivals found. Check the Festivals tab has a value in the "Key" column.</div>';
      return;
    }

    initMap(festivalData, order);

  } catch (err) {
    console.error(err);
    list.innerHTML = '<div class="status-msg status-error">Couldn\u2019t load venue data. Make sure the Google Sheet is published to the web and the links in script.js are correct.</div>';
  }
}

/* ========================= MAP ========================= */
function initMap(festivalData, festivalOrder) {
  const map = L.map("map").setView([51.68, -9.45], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  let markers = [];
  let extraMarkers = [];
  let showingExtra = false;
  let currentFestival = null;

  // Build the top festival buttons from whatever rows exist in the Festivals tab
  const buttonsContainer = document.getElementById("festival-buttons");
  buttonsContainer.innerHTML = "";
  festivalOrder.forEach((key, i) => {
    const btn = document.createElement("button");
    btn.textContent = festivalData[key].name;
    btn.dataset.festival = key;
    if (i === 0) btn.classList.add("active");
    btn.onclick = () => loadFestival(key);
    buttonsContainer.appendChild(btn);
  });

  function popupHTML(loc) {
    const link = `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`;
    return `<div class="popup">
      <strong>${loc.name}</strong><br>
      <img src="${loc.image}" data-img="${loc.image}">
      <a href="${link}" target="_blank">\uD83D\uDCCD Get directions</a>
    </div>`;
  }

  function bindPopupClick(marker) {
    marker.on("popupopen", e => {
      const img = e.popup.getElement().querySelector("img");
      if (img) img.onclick = () => copyToClipboard(img.dataset.img);
    });
  }

  function loadFestival(key) {
    currentFestival = key;
    const data = festivalData[key];
    if (!data) return;

    const headerEl = document.getElementById("list-header");
    headerEl.style.backgroundImage = data.image ? `url(${data.image})` : "none";

    const logoImg = document.getElementById("festival-logo");
    if (data.logo) {
      logoImg.src = data.logo;
      logoImg.style.display = "";
    } else {
      logoImg.removeAttribute("src");
      logoImg.style.display = "none";
    }

    headerEl.classList.toggle("literary-mode", data.style.blurMode);

    const titleEl = document.getElementById("header-title");
    titleEl.className = data.style.fontClass;
    titleEl.textContent = data.name;
    document.getElementById("header-subtitle").textContent = data.subtitle;

    markers.forEach(m => map.removeLayer(m));
    markers = [];
    extraMarkers.forEach(m => map.removeLayer(m));
    extraMarkers = [];

    showingExtra = false;
    const fringeBtn = document.getElementById("map-fringe-btn");
    fringeBtn.textContent = "+ Show More Venues";
    fringeBtn.classList.remove("active");
    fringeBtn.classList.toggle("visible", data.extraLocations.length > 0);

    document.querySelectorAll("#festival-buttons button").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.festival === key);
    });

    const list = document.getElementById("list");
    list.innerHTML = "";
    const bounds = L.latLngBounds([]);

    data.locations.forEach(loc => {
      const marker = L.marker([loc.lat, loc.lng]).addTo(map).bindPopup(popupHTML(loc));
      bindPopupClick(marker);
      markers.push(marker);
      bounds.extend([loc.lat, loc.lng]);

      const item = document.createElement("div");
      item.className = "location";
      item.textContent = loc.name;
      if (loc.name.toUpperCase().includes("BOX OFFICE")) item.classList.add("box-office");
      item.onclick = () => { map.setView([loc.lat, loc.lng], 15); marker.openPopup(); };
      list.appendChild(item);
    });

    if (bounds.isValid()) map.fitBounds(bounds, { padding: [40, 40] });
  }

  function toggleExtraVenues() {
    const data = festivalData[currentFestival];
    if (!data || !data.extraLocations.length) return;

    showingExtra = !showingExtra;
    const btn = document.getElementById("map-fringe-btn");
    const list = document.getElementById("list");

    if (showingExtra) {
      btn.textContent = "\u2212 Hide More Venues";
      btn.classList.add("active");

      const bounds = L.latLngBounds([]);
      markers.forEach(m => bounds.extend(m.getLatLng()));

      data.extraLocations.forEach(loc => {
        const marker = L.circleMarker([loc.lat, loc.lng], {
          radius: 9, fillColor: "#ff6b6b", color: "#fff", weight: 2, opacity: 1, fillOpacity: 0.8
        }).addTo(map).bindPopup(popupHTML(loc));
        bindPopupClick(marker);

        extraMarkers.push(marker);
        bounds.extend([loc.lat, loc.lng]);

        const item = document.createElement("div");
        item.className = "location fringe-venue";
        item.textContent = loc.name;
        item.onclick = () => { map.setView([loc.lat, loc.lng], 15); marker.openPopup(); };
        list.appendChild(item);
      });

      if (bounds.isValid()) map.fitBounds(bounds, { padding: [40, 40] });
    } else {
      btn.textContent = "+ Show More Venues";
      btn.classList.remove("active");
      extraMarkers.forEach(m => map.removeLayer(m));
      extraMarkers = [];
      list.querySelectorAll(".fringe-venue").forEach(item => item.remove());
    }
  }

  document.getElementById("map-fringe-btn").onclick = toggleExtraVenues;

  loadFestival(festivalOrder[0]);
}

/* ========================= INIT ========================= */
loadData();
