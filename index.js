const express = require ('express');
var jwt = require('jsonwebtoken');
const app = express();

//root url
app.get("/",(req,res)=>{

 res.json({msg:"Hi Harsha!!"})
})

app.post("/login",(req,res)=>{

 //Assuming the this is the returned data from the database
    var data = {id:1,user:"Harsha",email:"senaratneh@gmail.com"}

    jwt.sign( {user:data},"securekey", (err,token)=>{
      if(err){
          res.json({error:err})
      }
      else{
          res.json({token:token})
      }

    } )
})

//verifying tokan headers
function verifiedToken(req,res,next){
 
    if (typeof(req.headers['authorization']) !='undefined' ){
        var headrToken = req.headers['authorization'].split('')[1];
        if(headrToken !=='undefined'){
            req.token = headrToken; //appends the token to the request
            next();
        }
        else{
            res.json({msg:"Unauthorized Request"})
        }
     }
     else{
         res.json({msg:"Unauthorized Request"})
     }
      
}



app.post("/dashboard", verifiedToken, (req,res)=>{


    
        if(err){
         res.json({msg:"Access Denied"})
        }
        else{
            res.json({msg:"Welcome to Dashboard",data:data})
        }
    })
 
  
})
   
 


//app is listing to the port 4000
app.listen(4000,()=>{
 console.log("we are live on 4000")   
})