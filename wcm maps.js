<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Festival Map</title>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div id="map"></div>

<div id="list-panel">
  <div id="panel-handle"></div>
  <div id="list-header">
    <div id="header-top">
      <div id="title-section">
        <h2 id="header-title" class="font-chamber">West Cork Chamber Music Festival</h2>
        <span id="header-subtitle">2026 Festival Venues</span>
      </div>
      <div id="logo-slot"><img id="festival-logo" src="" alt="Festival Logo"></div>
    </div>
    <div id="button-container">
      <div id="festival-buttons">
        <button data-festival="chamber" class="active">Chamber Festival</button>
        <button data-festival="masters">Masters of Tradition</button>
        <button data-festival="literary">Literary Festival</button>
      </div>
      <div id="secondary-buttons">
        <button id="extra-venues-btn">+ Show Fringe Venues</button>
      </div>
    </div>
  </div>
  <div id="list"></div>
</div>

<div class="map-controls">
  <button class="map-control-btn" id="fullscreen-btn" title="Toggle Fullscreen">⛶</button>
  <button class="map-control-btn" id="locate-btn" title="My Location">📍</button>
</div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="wcm maps.js"></script>
</body>
</html>