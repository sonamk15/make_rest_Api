const express = require('express');
const app = express();

const fs = require('fs')

app.use(express.json());

app.get('/particular_exercise/:id',(req,res)=>{
    fs.readFile('exercise.json',(err,data)=>{
        
        var id = req.params.id;  

        var jsondata = fs.readFileSync('exercise.json')
        
        var ressponses = JSON.parse(jsondata);
        console.log(responses)
        
        for(i = 0; i < ressponses.length; i++){
            console.log(responses[i])
            
            
            
        if(err){
            console.log("something went wrong")
            
        }
        else if( (ressponses[i].id  == id)){
            for(j=0; j<responses[i][j].length;j++){
                return res.json(ressponses[i][j])
            }

            
            
        }
    }
    })
})
app.listen(3000, () => console.log('server is listening'));
