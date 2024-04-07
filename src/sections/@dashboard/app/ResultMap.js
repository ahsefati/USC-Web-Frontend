import { useState, useEffect, useRef } from 'react';
import { Map, TileLayer, Marker, Popup, Rectangle, Polyline  } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import L from 'leaflet';
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

const ResultMap = ({ latCenter, lonCenter, pointsTest, formData, setFormData, userStats, showMedianUsers, showGeneralHeatmap}) => {
  const [ourMap, setOurMap] = useState()
  const [rectangleBounds, setRectangleBounds] = useState(null);
  const mapRef = useRef()

  useEffect(()=>{
    const map = mapRef.current.leafletElement;
    setOurMap(map)
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    
    L.drawLocal.draw.toolbar.buttons.rectangle = "Draw"; // Change the text of the button
    
    const drawControl = new L.Control.Draw({
      draw: {
        rectangle: true,
        polygon: false,
        circle: false,
        marker: false,
        circlemarker: false,
        polyline: false
      }
    });
    map.addControl(drawControl);
    
    const ClearDrawingsControl = L.Control.extend({
      onAdd: (map) => {
        const button = L.DomUtil.create('button', 'leaflet-control');
        button.innerHTML = '&#x274C;';
        button.style.cursor = 'pointer'; 
        button.style.backgroundColor = 'white';
        button.style.border = '2px solid lightgray';
        button.style.borderRadius = '2px';
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
    map.addControl(new ClearDrawingsControl({ position: 'topleft' }));
    
    map.on(L.Draw.Event.CREATED, (event) => {
      const layer = event.layer;
      const bounds = layer.getBounds();
      setRectangleBounds(bounds);
      const minLat = bounds.getSouth();
      const maxLat = bounds.getNorth();
      const minLon = bounds.getWest();
      const maxLon = bounds.getEast();   
      setFormData({
        ...formData,
        "min_lat": minLat,
        "min_lon": minLon,
        "max_lat": maxLat,
        "max_lon": maxLon,
        "endpoint": "/points/inaboxwithfilter"
      })
      drawnItems.addLayer(layer);
      setRectangleBounds(layer.getBounds());
    });
  },[])

  useEffect(()=>{
    if (ourMap){
      ourMap.setView([latCenter, lonCenter]);
    }
  }, [latCenter, lonCenter, formData])

  // Function to group points by username
  const groupPointsByUser = (points) => {
    const groupedPoints = {};
    points.forEach((point) => {
      if (!groupedPoints[point.username]) {
        groupedPoints[point.username] = [];
      }
      groupedPoints[point.username].push(point);
    });
    return groupedPoints;
  };

  const groupedPoints = groupPointsByUser(pointsTest);  

  return (
    <Map ref={mapRef} id="map" style={{ height: '750px' }} center={[latCenter, lonCenter]} zoom={16} >
      <TileLayer
          url="https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {rectangleBounds && <Rectangle bounds={rectangleBounds} />}
      {pointsTest.length > 0 && !showMedianUsers && pointsTest.length < 5000 &&
        pointsTest.map((point) => (
          <Marker
            key={point.point_id}
            position={[point.longitude, point.latitude]}
            icon={point.metadata === 'Occupied Taxi' ? greenIcon : blueIcon}
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
        ))}
      
      {userStats.length > 0 && showMedianUsers &&
        userStats.map((user) => {
          return (
            <Marker
              key={user.username}
              position={[user.medianlongitude, user.medianlatitude]}
              icon={blueIcon}
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
          points={pointsTest.map((point)=>[point.longitude, point.latitude])} 
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
