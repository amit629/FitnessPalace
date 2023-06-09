let express=require('express')
let cors=require('cors')
// let axios=require('axios')
// let token=require('../token.js')
// let GymData=require('./dataObj')

const GymRouter=require('./routes/NearByGym/gymroutes')
const authRouter=require('./routes/authRoutes/auth')
const AdminRouter=require('./routes/ProductRoutes/AdminRoutes')
const productRouter= require('./routes/ProductRoutes/ProductRoutes')
const adminworkRouter=require('./routes/WorkOut/superAdminWorkout')
const workRouter=require('./routes/WorkOut/Workout')
let app=express();
let mongoose=require('mongoose')


mongoose.set('strictQuery','true')
// mongoose.connect('mongodb+srv://db:123@cluster0.9zlxjis.mongodb.net/?retryWrites=true&w=majority')
mongoose.connect('mongodb://127.0.0.1:27017/FitnessPalace?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2',
    {useNewUrlParser: true, 
    useUnifiedTopology: true
    }).then(()=>{
        console.log("mongoose DB connected")
    }).catch(err=>{
        console.log("mongoose DB didnot connect");
        console.log(err);
    })




app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(GymRouter)
app.use(authRouter)
app.use(AdminRouter)
app.use(productRouter)
app.use(adminworkRouter)
app.use(workRouter)
app.get('/',(req,res)=>{
    res.send("<a href='/getNearByData'>hello cutie</a>")
})


app.listen(4000,()=>{
    console.log('server running on 4000')
})