const express = require('express');
const app = express();

const fs = require('fs')

app.use(express.json());

app.get('/courses',(req,res)=>{
    fs.readFile('data.json',(err,data)=>{
        if(err){
            console.log("something went wrong")
        }
        else{
            var data = JSON.parse(data.toString())
            return res.json(data)
        }
    })
}),

app.post('/post_courses',(req,res)=>{
    var Newcourse={
        name:req.body.name,
        shortDescription:req.body.shortDescription,
    }
    let data = fs.readFileSync('data.json')
    data = data.toString();
    let Data = JSON.parse(data)
    Newcourse.id = Data.length + 1;
    Data.push(Newcourse)
    fs.writeFileSync("data.json", JSON.stringify(Data,null,2))
    return res.json(Data)
}),

app.put('/put_courses/:id',(req,res)=>{

    var id = req.params.id-1;
    var jsondata = fs.readFileSync('data.json')
    var data = JSON.parse(jsondata);
   
    data[id]["name"] = req.body.name;
    data[id]["description"] = req.body.description;

    
    fs.writeFileSync("data.json", JSON.stringify(data));
    return res.json(data)
}),

app.get('/particular_courses/:id',(req,res)=>{
    fs.readFile('data.json',(err,data)=>{
        
        var id = req.params.id;  

        var jsondata = fs.readFileSync('data.json')
        var ressponses = JSON.parse(jsondata);
        
        for(i = 0; i < ressponses.length; i++){
            
        if(err){
            console.log("something went wrong")
            
        }
        else if( (ressponses[i].id  == id)){

            return res.json(ressponses[i])
            
        }
    }
    })
}),



app.get('/particular_exercise/:id/exercise', (req,res) =>{
    fs.readFile("data.json", (err,data) => {
        var id = req.params.id;  
        var jsondata = fs.readFileSync('data.json')
        var ressponses = JSON.parse(jsondata);       
        var num_exercises = ressponses[id-1]["exercise"]
        if (err){
            console.log("something went wrong")
        }else{
            return res.json(num_exercises);
        }
    })
}),


app.put('/put_exercise/:id/exercise/:id2',(req,res)=>{
    var course_id = req.params.id;
    var exercises_id = req.params.id2;
    var jsondata = fs.readFileSync('data.json')
    var data = JSON.parse(jsondata);
    
    var num_exercises = data[course_id-1].exercise
    
    var edit_exercise = data[course_id-1][exercises_id - 1]
    edit_exercise = {
                        name :req.body.name,
                        content :req.body.content,
                        hint :req.body.hint,
                        id:exercises_id
                    }
    
    num_exercises.splice(exercises_id-1, 1, edit_exercise);
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err, data) => {
        
    });
    
    return res.send(num_exercises);

});


app.post('/post_exercise/:id/exercise',(req,res)=>{
    var id = req.params.id;
    var Newcourse={
        name:req.body.name,
        content:req.body.content,
        hint:req.body.hint,
    }
    let data = fs.readFileSync('data.json')
    let Data = JSON.parse(data)
    console.log(Data)
    let update = Data[id-1]["exercise"]
    Newcourse.courseId = id
    Newcourse.id = update.length + 1;
    update.push(Newcourse)
    
    fs.writeFileSync("data.json", JSON.stringify(Data,null,2))
    
    return res.json(update)
})
app.get("/courses/:id/exercises/:id2/submissions",(req, res) => {
    var course_id = req.params.id;
    console.log(course_id)
    var exercises_id = req.params.id2;
    var data = fs.readFileSync("sumbition.json");
    var data1 = JSON.parse(data);
    var Submission_details = data1[course_id - 1][String(course_id)][exercises_id - 1];
    return res.json(Submission_details);
})
app.post('/courses/:id/exercises/:id2/submissions', (req,res) => {
    
    var course_id = req.params.id;
    var exercises_id = req.params.id2;
    
    var data = fs.readFileSync("sumbition.json");
    var data1 = JSON.parse(data);
    var Sumbmission_post = data1[course_id - 1][String(course_id)];
    console.log(Sumbmission_post)
    
    var dic = req.body;
    dic["Ex_id"] = parseInt(exercises_id);
    dic['user_id'] = data1[course_id - 1][String(course_id)].length + 1;
    dic["cource_id"] = parseInt(course_id);
    
    Sumbmission_post.push(dic);

    fs.writeFile("sumbition.json", JSON.stringify(data1, null, 2), (err, data) => {
        console.log(res.json(Sumbmission_post))
        return res.json(Sumbmission_post);
    });
});

app.listen(3000, () => console.log('server is listening'));