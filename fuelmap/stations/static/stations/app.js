const defaultCenter = [41.3111, 69.2797]; // Ташкент
const map = L.map('map').setView(defaultCenter, 12);
const statusText = document.getElementById('statusText');
const nearestBtn = document.getElementById('nearestBtn');
let stations = [];
let routeLayer = null;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

function distanceInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function nearestStation(userLat, userLon) {
  return stations.reduce((best, station) => {
    const km = distanceInKm(userLat, userLon, station.latitude, station.longitude);
    if (!best || km < best.km) {
      return { station, km };
    }
    return best;
  }, null);
}

async function drawRoute(startLat, startLon, endLat, endLon) {
  if (routeLayer) {
    map.removeLayer(routeLayer);
  }

  const url = `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data.routes || !data.routes.length) {
    statusText.textContent = 'Маршрут не найден.';
    return;
  }

  routeLayer = L.geoJSON(data.routes[0].geometry, {
    style: { color: '#0ea5e9', weight: 5 },
  }).addTo(map);

  map.fitBounds(routeLayer.getBounds(), { padding: [20, 20] });
}

async function initStations() {
  const response = await fetch('/api/stations/');
  const data = await response.json();
  stations = data.stations;

  if (!stations.length) {
    statusText.textContent = 'Пока нет заправок. Добавь их в админке.';
    return;
  }

  stations.forEach((station) => {
    const marker = L.marker([station.latitude, station.longitude]).addTo(map);
    marker.bindPopup(`
      <strong>${station.name}</strong><br/>
      ⭐ Рейтинг: ${station.rating}<br/>
      🕒 Время работы: ${station.opening_hours}<br/>
      ⛽ Цена: ${station.fuel_price}<br/>
      ${station.description || ''}
    `);
  });
}

nearestBtn.addEventListener('click', () => {
  if (!stations.length) {
    statusText.textContent = 'Станции отсутствуют.';
    return;
  }

  if (!navigator.geolocation) {
    statusText.textContent = 'Браузер не поддерживает геолокацию.';
    return;
  }

  statusText.textContent = 'Ищем ближайшую заправку...';
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;
    const nearest = nearestStation(latitude, longitude);

    if (!nearest) {
      statusText.textContent = 'Не удалось найти заправку.';
      return;
    }

    statusText.textContent = `Ближайшая: ${nearest.station.name} (~${nearest.km.toFixed(2)} км)`;
    await drawRoute(latitude, longitude, nearest.station.latitude, nearest.station.longitude);
  }, () => {
    statusText.textContent = 'Доступ к геолокации отклонен.';
  });
});

initStations();
