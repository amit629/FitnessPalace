let express=require('express')
let Router=express.Router();
let axios=require('axios')
let token=require('../../tokens')
const redata=require('../../dataObj')
// let GymData=require('./dataObj')

Router.get('/gymTest',(req,res)=>{
    res.json({
        response:"hello"
    })
})
Router.post('/getNearByData',async(req,res)=>{
    let {latitude,longitude}=req.body;
    const creds={
		grant_type:"",
		client_id:"",
		client_secret:""	
	}
    // console.log(req.body)
    
    // const api=axios.post(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${long}&radius=1500&type=gym&key=${token}`)
    let response=await axios.post(`https://outpost.mapmyindia.com/api/security/oauth/token?grant_type=${creds.grant_type}&client_id=${creds.client_id}&client_secret=${creds.client_secret}`,{
        headers:{
            mode:'no-cors'
        }
    })  
    let token=response.data.access_token
    let token_type=response.data.token_type;
    let mapResponse=await axios.get(`https://atlas.mapmyindia.com/api/places/nearby/json?keywords=gym&refLocation=${latitude},${longitude}`,{
        headers:{
            'Authorization': `${token_type} ${token}`
        }
    })
    console.log(mapResponse.data);  
    // console.log(latitude,longitude);
    res.json({
        "res":"hello baby"
    })
})
Router.post('/getNearbyGymData',async(req,res)=>{
    // console.log(req.body)
    let {latitude,longitude,rad}=req.body;
    
    
    let response=await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=${rad}&type=gym&key=${token.tkn}`)
    let dataSend=response.data.results;
    dataSend=dataSend.filter((ele)=>{
        let nm=ele.name.toLowerCase();
        return nm.includes('gym') || nm.includes('fitness'); 
    })
    if(dataSend)
    {
        response.data.results=dataSend;
    }    
    // res.json(redata.data)
    console.log(response.data)
    res.json(response.data)
})
Router.post('/getNearbyGymData/moreData',async(req,res)=>{
    // console.log(req.body)
    let {next_token}=req.body;
    
    
    let response=await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${token.tkn}&pagetoken=${next_token}`)
    let dataSend=response.data.results;
    dataSend=dataSend.filter((ele)=>{
        let nm=ele.name.toLowerCase();
        return nm.includes('gym') || nm.includes('fitness'); 
    })
    if(dataSend)
    {
        response.data.results=dataSend;
    }   
    console.log(response.data)
    res.json(response.data)
})

Router.post('/getGymDetails',async(req,res)=>{
    
    let {place_id}=req.body;
    
    let resp=await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?&place_id=${place_id}&key=${token.tkn}`)
    console.log(resp.data)
    // let gData=GymData.gymDet
    res.json(resp.data.result)
})

async function funny(gymPhotos)
{
    return new Promise(async(resolve,reject)=>{
        // let list=[]
        
            const photoRef=gymPhotos.photo_reference;
            console.log(process.env.REACT_APP_TOKEN)
            let response=await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=${400}&maxheight=${400}&photo_reference=${photoRef}&key=${token.tkn}`).then(r=>r.blob())
    
            let imgUrl=URL.createObjectURL(response)
            
            // list.push(imgUrl)
            // console.log(list,imgUrl)
        
        resolve(imgUrl)
    })
}
Router.post('/getGymImages',async(req,res)=>{

        let gymPhotos=req.body;
        console.log(gymPhotos)
        let data=await funny(gymPhotos)

        console.log(data)
        
        // console.log(list)
        // console.log(imageSource)
       

    
    // console.log(imageLinks)
    res.json(data);
})

module.exports=Router