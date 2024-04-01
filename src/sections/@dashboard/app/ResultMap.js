import PropTypes from 'prop-types';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Container, Typography, Card, Link, FormControl, InputLabel, Select, MenuItem, Stack, Input, Button} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'

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

ResultMap.propTypes = {
 
};

export default function ResultMap({latCenter, lonCenter, pointsTest}) {

  return (
    <>
      <Grid sx={{display:{xs:'none', lg:'block'}}}>
          <MapContainer key={`${latCenter}-${lonCenter}`} center={[latCenter, lonCenter]} zoom={16} style={{ height: '850px' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
              {pointsTest.length>0 && pointsTest.map(point => (
                  <Marker
                    key={point.point_id}
                    position={[point.longitude, point.latitude]}
                    icon={point.metadata==="Occupied Taxi"?greenIcon:blueIcon} 
                  >
                    <Popup>
                        <strong>Username:</strong> {point.username}<br/>
                        <strong>Date:</strong> {point.datetime}<br/>
                        <strong>Lon:</strong> {point.longitude}<br/>
                        <strong>Lat:</strong> {point.latitude}<br/>
                        <strong>Metadata:</strong> {point.metadata}
                    </Popup>
                  </Marker>
              ))}
          </MapContainer>
      </Grid>
      <Grid sx={{display:{xs:'block', lg:'none'}}}>
          <MapContainer key={`${latCenter}-${lonCenter}`} center={[latCenter, lonCenter]} zoom={16} style={{ height: '560px' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
              {pointsTest.length>0 && pointsTest.map(point => (
                  <Marker
                    key={point.point_id}
                    position={[point.longitude, point.latitude]}
                    icon={point.metadata==="Occupied Taxi"?greenIcon:blueIcon} 
                  >
                    <Popup>
                        <strong>Username:</strong> {point.username}<br/>
                        <strong>Date:</strong> {point.datetime}<br/>
                        <strong>Lon:</strong> {point.longitude}<br/>
                        <strong>Lat:</strong> {point.latitude}<br/>
                        <strong>Metadata:</strong> {point.metadata}
                    </Popup>
                  </Marker>
              ))}
          </MapContainer>
      </Grid>
    </>
  );
}
