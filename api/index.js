const express=require('express')
const cors=require('cors') 
const bodyParser=require('body-parser');
const mongoose= require('mongoose');

const User=require("./models/UserData.js")
const Place=require('./models/Place.js')
const Booking=require("./models/booking.js")
const bcrypt=require('bcryptjs')
require('dotenv').config();
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
// const imageDownloader=require('image-downloader')
const download = require('image-downloader');
const multer=require('multer')
const fs=require('fs');
const { resolve } = require('path');




const bcryptSalt=bcrypt.genSaltSync(10);
const app=express();
const jwtSecret='njnshdviknsdnskjdnNjblcnjsl'
app.use(express.json())
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173",
}))

mongoose.connect("mongodb://127.0.0.1:27017/airhpDB",{useNewUrlParser:true})
         

function getUserDataFromToken(req){
    return new Promise((resolve,reject)=>{
        jwt.verify(req.cookies.token,jwtSecret,{},async (err,userData)=>{
            if (err) throw err 
            resolve(userData);

        })
    })
}



app.get('/test',(req,res)=>{
    res.json("Okay")
})

app.post('/register', async (req,res)=>{
    const {name,email,password}=req.body;
   
    try{
        const userDoc=await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        })
        res.json(userDoc);
        
    }catch(e){
        res.status(422).json(e)
    }
     
    })
 
app.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    const userDoc=await User.findOne({email});
    if(userDoc)
    {
        const passOk=bcrypt.compareSync(password,userDoc.password);
        if(passOk)
        {
            jwt.sign({email:userDoc.email,id:userDoc._id},jwtSecret,{},(err,token)=>{
                   if(err) throw err;
                   else
                   res.cookie('token',token).json(userDoc)
            })
            

        }else{
            res.status(422).json("Pss not okay")
        }
    }else
    res.status(422).json("Not Found");

})

app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    if(token){
           jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            if(err) throw err;
            const {name,email,_id}=await User.findById(userData.id);
            res.json({name,email,_id});
           })
    }else{
        res.json(null)
    }
})


app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})

app.post('/upload-by-link',async (req,res)=>{
    const {link}=req.body;
    const newName="photo_"+Date.now()+'image.jpg';
    // await imageDownloader.image({
    //     url:link,
    //     dest:__dirname+"/uploads",
    // }).catch((err)=>console.log(err))
    //   res.json(newName)
const options = {
  url: link,
  dest: __dirname+"/uploads/"+newName,               // will be saved to /path/to/dest/image.jpg
};

await download.image(options)
  .then(({ filename }) => {
    console.log('Saved to', filename); // saved to /path/to/dest/image.jpg
  })
  .catch((err) => console.error(err));
  res.json(newName)
})

const photosMiddleware=multer({dest:'uploads/'})
app.post('/upload',photosMiddleware.array('photos',100),async (req,res)=>{
const uploadedFiles=[];
    for(let i=0;i<req.files.length;i++)
    {
        const {path,originalname}=req.files[i];
        const parts=originalname.split('.');
        const ext=parts[parts.length-1];
        const newPath=path + "." + ext;
        fs.renameSync(path,newPath);
          uploadedFiles.push(newPath.replace('uploads\\',''));
         

    }
    console.log(uploadedFiles)
res.json(uploadedFiles)
})

app.post('/places',(req,res)=>{
    const {token}=req.cookies;
    const {title,address,
        addphoto,description,
        perks,extraInfo,checkIn,
        checkOut,maxGuests,price}=req.body;
    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
        if(err) throw err;
        const placeDoc=await Place.create({
         owner:userData.id,
         title,address,
        photos:addphoto,description,
        perks,extraInfo,checkIn,
        checkOut,maxGuests,price
         
        })
        res.json(placeDoc)
       })
       
    
})

app.get('/user-places',(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
        const {id}=userData;
        res.json(await Place.find({owner:id}))
    })

})

app.get('/places/:id',async (req,res)=>{
    const {id}=req.params;
    res.json(await Place.findById(id));
})

app.put('/places',async (req,res)=>{
    const {token}=req.cookies;
    const {id,title,address,
        addphoto,description,
        perks,extraInfo,checkIn,
        checkOut,maxGuests,price}=req.body;
       

        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            const placeDoc=await Place.findById(id);
          
           if(userData.id===placeDoc.owner.toString())
           placeDoc.set({ title,address,
            photos:addphoto,description,
            perks,extraInfo,checkIn,
            checkOut,maxGuests,price})
          await placeDoc.save();
          res.json('ok');
        })

})

app.get('/places',async (req,res)=>{
    res.json(await Place.find());
})

app.post('/bookings',async (req,res)=>{
    const userData=await getUserDataFromToken(req);
    const {place,checkIn,checkOut,numberOfGuests,name,mobile,price}=req.body;
    Booking.create({place,checkIn,checkOut,numberOfGuests,name,mobile,price,user:userData.id}).then((doc)=>{
        res.json(doc)
    
    }).catch((err)=>{
        throw err;
    })

})


app.get('/bookings',async (req,res)=>{
    const userData=await getUserDataFromToken(req);
    res.json(await Booking.find({user:userData.id }).populate('place'))
})
app.listen(3000,(req,res)=>{
    console.log("Successfully running on 3000")
})