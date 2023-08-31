import React,{useState,useEffect} from 'react';
import { CssBaseline,Grid} from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData } from './api';
const App = ()=> {
  const [places,setPlaces] = useState([]);
  const [coordinates,setCoordinates] = useState({});
  const [bounds,setBounds] = useState({});
  const[type,setType] = useState('restaurants');
  const[rating,setRating] = useState('')
  const[filteredPlaces,setfilteredPlaces] = useState([]);
  const[isLoading,setIsLoading] = useState(false);
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}}) =>{
      setCoordinates({lat:latitude,lng:longitude});
    })
  })
  useEffect(()=>{
    const filtered = places.filter((place)=> Number(place.rating) >rating)

    setfilteredPlaces(filtered)
  },[rating])
  useEffect(()=>{
    setIsLoading(true);
    if(bounds.sw && bounds.ne ){
      getPlacesData(type,bounds.sw,bounds.ne)  //getting real data by passing bounds
        .then((data)=>{

          console.log(data);
          setfilteredPlaces([])
          setPlaces(data?.filter((place)=> place.name && place.num_reviews > 0));
          setIsLoading(false);
        })
    }
  },[type,bounds])
    return(
        <>
           <CssBaseline />
           <Header  setCoordinates={setCoordinates}/>
           <Grid container spacing = {3} style = {{width:'100%'}}>
              <Grid item xs={12} md={4}>
                <List 
                 places = {filteredPlaces.length ? filteredPlaces: places}
                 type = {type}
                 setType={setType}
                 rating = {rating}
                 setRating = {setRating}
                 isLoading = {isLoading}
                />
              </Grid>
              <Grid item xs={12} md= {8}>
                <Map 
                  setCoordinates = {setCoordinates}
                  setBounds = {setBounds}
                  coordinates = {coordinates}
                  
                  places = {filteredPlaces.length ? filteredPlaces: places}
                />
              </Grid>

           </Grid>
        </>
    );
}
export default App;