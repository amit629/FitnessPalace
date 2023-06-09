import { useEffect, useMemo, useState } from 'react';
import { GoogleMap,useLoadScript,MarkerF} from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

export default function AllGymMaps({placeData}){
    const {isLoaded}=useLoadScript({
        googleMapsApiKey:process.env.REACT_APP_MAP_API,    
    });

    if(!isLoaded)return <div>loading...</div>
    
    return(
        <>
            <Map placeData={placeData}/>
        </>
    )
}
function Map({placeData}){
    // console.log(placeData.geometry.location.lat)
    let navigate=useNavigate();
    const exampleMapStyles = [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#263c3f"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#6b9a76"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#38414e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#212a37"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9ca5b3"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#1f2835"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#f3d19c"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2f3948"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#515c6d"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        }
      ];
    const center=useMemo(()=>({lat:placeData[0].geometry.location.lat,lng:placeData[0].geometry.location.lng}),[]);
    return (
        <GoogleMap zoom={13} center={center} mapContainerClassName='sp-css-two mt-5' 
        options={{
            styles: exampleMapStyles,
        }}
        
        >
            {
                placeData.map((ele,ind)=>{
                    let pos={
                        lat:ele.geometry.location.lat,
                        lng:ele.geometry.location.lng
                    }
                    return(
                        <div style={{height:'10px',width:'10px'}}>

                            <MarkerF position={pos}  title={ele.name} key={ind*100} options={{
                                styles:{
                                    height:'100px',
                                    width:'100px'
                                }
                            }} animation={'bounce'} 
                                icon={{
                                    url: '/img/gymMarker.png',
                                }}
                            
                            onClick={()=>{navigate(`gymLocation/${ele.place_id}`)}}></MarkerF>  
                        </div>
                    );
                })
            }
        </GoogleMap>
    )
}