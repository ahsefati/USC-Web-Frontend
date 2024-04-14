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

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const removeAllControls = (map) => {
  map._controlCorners.bottomleft.innerHTML = ''
};


const ResultMap = ({ latCenter, lonCenter, pointsTest, formData, setFormData, userStats, showPoints, showMedianUsers, showGeneralHeatmap, generalStats}) => {
  const [ourMap, setOurMap] = useState()
  const [rectangleBounds, setRectangleBounds] = useState(null)
  const mapRef = useRef()

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
      ourMap.setView([latCenter, lonCenter])
    }
  }, [latCenter, lonCenter, formData])

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

  const handleZoomLevelChange = () => {
    if (ourMap) {
      ourMap.setZoom(11)
    }
  };



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
