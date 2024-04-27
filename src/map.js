let map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: 2,
    maxZoom: 3
}).setView([344.83, 344.83], 2)

let bounds = [[0, 0], [689.66, 689.66]]
map.setMaxBounds(bounds)
map.options.maxBoundsViscosity = 1.0

let image = L.imageOverlay('map.png', bounds)
image.addTo(map)

map.on('click', function(e) {
    let lat = e.latlng.lat.toFixed(6);
    let lng = e.latlng.lng.toFixed(6);
    let popupContent = "Koordinaten: " + lat + ", " + lng;
    L.marker(e.latlng).addTo(map).bindPopup(popupContent).openPopup();
})

const defaultIcon = L.icon({
    iconUrl: 'public/images/default-marker.png',
    iconSize: [21, 39],
    iconAnchor: [10, 19],
    popupAnchor: [1, -20]
})

const textIcon = L.divIcon({
    className: 'text-icon',
    html: '<div>Das ist ein Beispieltext</div>'
})

// Thaugrien Marker
L.marker([448.660803, 160.750000], { icon: defaultIcon }).addTo(map)
    .bindPopup('Grenbrock')
L.marker([439.125000, 208.250000], { icon: defaultIcon }).addTo(map)
    .bindPopup('Dünsberg')
L.marker([393.750000, 203.000000], { icon: defaultIcon }).addTo(map)
    .bindPopup('Tarporbach')
L.marker([361.750000, 142.000000], { icon: defaultIcon }).addTo(map)
    .bindPopup('irgendwas')
L.marker([482.500000, 217.250000], { icon: defaultIcon }).addTo(map)
    .bindPopup('Dünsberg')

// Escrigria Marker
L.marker([507.750000, 180.500000], { icon: defaultIcon }).addTo(map)
    .bindPopup('Schachendorf')

// L.control.scale().addTo(map);

let getDistance = function (pointA, pointB) {
    let xA = pointA[0]
    let yA = pointA[1]
    let xB = pointB[0]
    let yB = pointB[1]

    let distance = Math.sqrt(Math.pow((xB - xA), 2) + Math.pow((yB - yA), 2))
    return distance
}
