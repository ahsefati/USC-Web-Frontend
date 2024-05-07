import { useState, useEffect, useRef } from 'react';
import { Map, TileLayer, Marker, Popup, Rectangle, Polyline  } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import L, { polygon } from 'leaflet';
import 'leaflet-draw';

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const yellowIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const removeAllControls = (map) => {
  map._controlCorners.bottomleft.innerHTML = ''
};


const ResultMap = ({ latCenter, lonCenter, pointsTest, formData, setFormData, userStats, showPoints, showMedianUsers, showGeneralHeatmap, showTrajectoryLines, showCommonPlaces, outlierSpeedThreshold, generalStats}) => {
  const [ourMap, setOurMap] = useState()
  const [rectangleBounds, setRectangleBounds] = useState(null)
  const mapRef = useRef()

  const [trajectoryLayers, setTrajectoryLayers] = useState([])
  const [trajectoryMarkers, setTrajectoryMarkers] = useState([])

  useEffect(()=>{
    const map = mapRef.current.leafletElement
    setOurMap(map)
    
    if (map) {
      removeAllControls(map)
    }

    // Add FIT button
    const FitZoomControl = L.Control.extend({
      onAdd: (map) => {
        const button = L.DomUtil.create('button', 'leaflet-control')
        button.innerHTML = 'Fit'
        button.style.cursor = 'pointer'
        button.style.backgroundColor = 'white'
        button.style.border = '2px solid lightgray'
        button.style.borderRadius = '2px'
        button.onclick = () => {
          const bounds = L.latLngBounds(L.latLng(generalStats?.minlatitude, generalStats?.minlongitude), L.latLng(generalStats?.maxlatitude, generalStats?.maxlongitude));
          map.fitBounds(bounds)
        }
        return button
      }
    })
    const fitControl = new FitZoomControl({ position: 'bottomleft' })
    
    const drawnItems = new L.FeatureGroup()
    map.addLayer(drawnItems)
    
    L.drawLocal.draw.toolbar.buttons.rectangle = "Rect"
    L.drawLocal.draw.toolbar.buttons.polygon = "Poly"
    // L.drawLocal.draw.toolbar.buttons.circlemarker = "Circle"
    
    const drawControl = new L.Control.Draw({
      draw: {
        rectangle: true,
        polygon: true,
        circle: false,
        marker: false,
        circlemarker: false,
        polyline: false
      },
      position:'bottomleft',  
    })
    
    const ClearDrawingsControl = L.Control.extend({
      onAdd: (map) => {
        const button = L.DomUtil.create('button', 'leaflet-control');
        button.innerHTML = '&#x274C;'
        button.style.cursor = 'pointer'
        button.style.backgroundColor = 'white'
        button.style.border = '2px solid lightgray'
        button.style.borderRadius = '2px'
        button.onclick = () => {
          setFormData({
            ...formData,
            "min_lat": -90,
            "min_lon": -180,
            "max_lat": 90,
            "max_lon": 180,
            "endpoint": ''
          })
          map.eachLayer((layer) => {
            if (layer instanceof L.Polygon || layer instanceof L.Rectangle || layer instanceof L.Circle || layer instanceof L.CircleMarker) {
              map.removeLayer(layer);
            }
          });
        }
        return button;
      }
    });
    const clearControl = new ClearDrawingsControl({ position: 'bottomleft' })
    
    // Add all the defined controls
    map.addControl(clearControl);
    map.addControl(drawControl)
    map.addControl(fitControl)
    
    map.on(L.Draw.Event.CREATED, (event) => {
      const layer = event.layer
      const type = event.layerType;
      if (type==="rectangle") {
        const bounds = layer.getBounds()
        setRectangleBounds(bounds)
        const minLat = bounds.getSouth()
        const maxLat = bounds.getNorth()
        const minLon = bounds.getWest()
        const maxLon = bounds.getEast()
        setFormData({
          ...formData,
          "min_lat": minLat,
          "min_lon": minLon,
          "max_lat": maxLat,
          "max_lon": maxLon,
          "endpoint": "/points/inaboxwithfilter"
        })
        drawnItems.addLayer(layer)
        setRectangleBounds(layer.getBounds())
      } else if (type==="polygon"){
        const polygon = layer.toGeoJSON(); // Convert drawn polygon to GeoJSON
        event.layer.options.remove = false;
        drawnItems.addLayer(layer);
        setFormData({
          ...formData,
          "polygon_geo": polygon.geometry,
          "endpoint": "/points/inaboxwithfilter"
        })
      }
    });

  },[generalStats])

  useEffect(()=>{
    if (ourMap){
      addTrajectoryLines()
      ourMap.setView([latCenter, lonCenter])
    }
  }, [latCenter, lonCenter, formData, ourMap])

  // TRAJECTORY LINES:
    // We need to have different colors for trajectory lines for each user!
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
    // Function to group points by username
  const groupPointsByUser = (points) => {
    const groupedPoints = {}
    points.forEach((point) => {
      if (!groupedPoints[point.username]) {
        groupedPoints[point.username] = []
      }
      groupedPoints[point.username].push(point)
    });
    return groupedPoints
  };

    // Function to sort points based on the datetime for each user
    // Afterward, it creates trajectories
    // And then, it adds it to the map
  const createTrajectoriesAndAddToMap = (groupedPoints) => {
    Object.values(groupedPoints).forEach((userPoints, index) => {
      const color = getRandomColor();
    
      for (let i = 0; i < userPoints.length - 1; i++) {
        const startPoint = userPoints[i];
        const endPoint = userPoints[i + 1];
        
        // Calculate trajectory line coordinates
        const trajectoryLine = [
          [startPoint.latitude, startPoint.longitude], // Start point coordinates
          [endPoint.latitude, endPoint.longitude]      // End point coordinates
        ];
    
        const polyline = L.polyline(trajectoryLine, { color, weight: 5 }).addTo(ourMap); // Increase weight for bolder lines
        trajectoryLayers.push(polyline)
        // Add directional arrow to the end of the line
        if (i === 0) {
          addArrowhead(polyline, endPoint.latitude, endPoint.longitude, color, 'rectangle'); // First arrowhead as rectangle
        } else if (i === userPoints.length - 2) {
          addArrowhead(polyline, endPoint.latitude, endPoint.longitude, color, 'circle'); // Last arrowhead as circle
        } else {
          addArrowhead(polyline, endPoint.latitude, endPoint.longitude, color, 'arrow'); // Other arrowheads as arrows
        }
      }
    });
    
  }

    // Function to add an arrowhead to the end of a polyline
  const addArrowhead = (polyline, lat, lng, color, type) => {
    let iconHtml;
    let iconSize;
    let iconAnchor;

    // Define different shapes for arrowheads
    if (type === 'rectangle') {
      iconHtml = '<div style="width: 30px; height: 20px; background-color: ' + color + ';"></div>';
      iconSize = [15, 10];
      iconAnchor = [7.5, 5];
    } else if (type === 'circle') {
      iconHtml = '<svg width="20" height="20"><circle cx="10" cy="10" r="10" fill="' + color + '"/></svg>';
      iconSize = [10, 10];
      iconAnchor = [5, 5];
    } else {
      // Default arrowhead shape
      const angle = Math.atan2(lat - polyline.getLatLngs()[polyline.getLatLngs().length - 2].lat, lng - polyline.getLatLngs()[polyline.getLatLngs().length - 2].lng) * 180 / Math.PI;
      iconHtml = '<div style="width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 15px solid ' + color + '; transform: rotate(' + angle + 'deg);"></div>';
      iconSize = [10, 10];
      iconAnchor = [5, 5];
    }

    // Create marker with custom icon
    const trajectoryMarker = L.marker([lat, lng], {
      icon: L.divIcon({
        className: 'arrowhead-icon',
        html: iconHtml,
        iconSize: iconSize,
        iconAnchor: iconAnchor,
      })
    }).addTo(ourMap);

    trajectoryMarkers.push(trajectoryMarker)

  }
    
  const addTrajectoryLines = () => {
    if (pointsTest.length > 0 && ourMap && showTrajectoryLines) {
      const groupedPoints = groupPointsByUser(pointsTest)
      createTrajectoriesAndAddToMap(groupedPoints)
    }
  }

  useEffect(()=>{
    if (showTrajectoryLines){
      addTrajectoryLines()
    }else{
      removeTrajectoryLines()
    }
  }, [showTrajectoryLines])

  const removeTrajectoryLines = () => {    
    trajectoryLayers.forEach(trajectoryLayer => {
      ourMap.removeLayer(trajectoryLayer);
    });
    setTrajectoryLayers([])

    trajectoryMarkers.forEach(trajectoryMarker => {
      ourMap.removeLayer(trajectoryMarker);
    });
    setTrajectoryMarkers([])
  }

  return (
    <Map ref={mapRef} id="map" style={{ height: '750px' }} center={[latCenter, lonCenter]} zoom={16} >
      <TileLayer
          url="https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {rectangleBounds && <Rectangle bounds={rectangleBounds} />}
      
      {pointsTest?.length > 0 && showPoints && pointsTest?.length < 5000 &&
        pointsTest.map((point) => (
          <Marker
            key={point.point_id}
            position={[point.latitude, point.longitude]}
            icon={point.metadata === 'Occupied Taxi' ? yellowIcon : blueIcon}
          >
            <Popup>
              <strong>Username:</strong> {point.username}
              <br />
              <strong>Date:</strong> {point.datetime}
              <br />
              <strong>Lon:</strong> {point.longitude}
              <br />
              <strong>Lat:</strong> {point.latitude}
              <br />
              <strong>Metadata:</strong> {point.metadata}
            </Popup>
          </Marker>
        ))
      }

      {pointsTest?.length > 0 && showCommonPlaces &&
        pointsTest.filter(point=>point?.speed===0).map((point) => (
          <Marker
            key={point.point_id}
            position={[point.latitude, point.longitude]}
            icon={greenIcon}
          >
            <Popup>
              <strong>Username:</strong> {point.username}
              <br />
              <strong>Date:</strong> {point.datetime}
              <br />
              <strong>Lon:</strong> {point.longitude}
              <br />
              <strong>Lat:</strong> {point.latitude}
              <br />
              <strong>Metadata:</strong> {point.metadata}
            </Popup>
          </Marker>
        ))
      }

      {pointsTest?.length > 0 && outlierSpeedThreshold &&
        pointsTest.filter(point=>point?.speed>=parseInt(outlierSpeedThreshold)).map((point) => (
          <Marker
            key={point.point_id}
            position={[point.latitude, point.longitude]}
            icon={greenIcon}
          >
            <Popup>
              <strong>Username:</strong> {point.username}
              <br />
              <strong>Date:</strong> {point.datetime}
              <br />
              <strong>Lon:</strong> {point.longitude}
              <br />
              <strong>Lat:</strong> {point.latitude}
              <br />
              <strong>Metadata:</strong> {point.metadata}
            </Popup>
          </Marker>
        ))
      }
      
      {userStats.length > 0 && showMedianUsers &&
        userStats.map((user) => {
          return (
            <Marker
              key={user.username}
              position={[user.medianlatitude, user.medianlongitude]}
              icon={redIcon}
            >
              <Popup>
                <strong>Username:</strong> {user.username}
                <br />
                <strong>Min Date:</strong> {user.mintime}
                <br />
                <strong>Max Date:</strong> {user.maxtime}
                <br />
                <strong>#Points:</strong> {user.pointscount}
              </Popup>
            </Marker>
          )
        }
        )}

      {showGeneralHeatmap &&
        <HeatmapLayer 
          fitBoundsOnUpdate 
          fitBoundsOnLoad  
          points={pointsTest.map((point)=>[point.latitude, point.longitude])} 
          longitudeExtractor={m => m[1]}
          latitudeExtractor={m => m[0]}
          intensityExtractor={m => parseFloat(m[2]) || 1}

        />
      }

      {/* Trajectory Lines
      {Object.entries(groupedPoints).map(([username, userPoints]) => (
        <Polyline
          key={username}
          positions={userPoints.map((point) => [point.longitude, point.latitude])}
          color="blue"
          weight={5}
          opacity={0.7}
        >
          <Popup>
            <strong>Username:</strong> {username}
          </Popup>
        </Polyline>
      ))} */}


    </Map>
  );
};

export default ResultMap;
