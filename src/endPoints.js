const express = require('express');
const TodoData = require('./dataModel');

let routes = express();

routes.post('/v1/tasks',async(req,res)=>{
    try{
        console.log(req.body.task)
        if(req.body.task != undefined){
            let task = req.body.task;
            let ids = [];
            for(let i = 0; i < task.length; i++){
                let res = await TodoData.create(task[i]);
                ids.push({Id:res._id})
            }
            console.log(ids)
            return res.status(200).json({
                massage:"All data created successfully",
                taskIds:ids
            })
        }

        let postData = req.body;
        let dataDB = await TodoData.create(postData);
        console.log(dataDB._id)
        return res.status(200).json({
            massage:"Your data stored successfully in database",
            id:dataDB._id

        })

    }
    catch(e){
        return res.status(404).json({
            massage:"Sorry , Unable to store your data. Please try after some time"

        })
    }
})
routes.get('/v1/tasks',async(req,res)=>{
    try{
        let dataDB = await TodoData.find();
        return res.status(200).json({
            massage:"All data stored in database",
            TodoData:dataDB

        })

    }
    catch(e){
        return res.status(404).json({
            massage:"Sorry , Unable to get data. Please try after some time"

        })
    }
})
routes.get('/v1/tasks/:id',async(req,res)=>{
    try{
        let id = req.params.id
        let dataDB = await TodoData.find({_id:id});
        if(dataDB.length === 0){
            return res.status(404).json({
                massage:"Sorry , There is no task at that id"
    
            })
        }
        return res.status(200).json({
            massage:"Successfully get the data",
            TodoData:dataDB

        })

    }
    catch(e){
        return res.status(404).json({
            massage:"Sorry , There is no task at that id"

        })
    }
})
routes.delete('/v1/tasks/:id',async(req,res)=>{
    try{
        let id = req.params.id
        let dataDB = await TodoData.deleteOne({_id:id});
        if(dataDB.acknowledged){
            return res.status(204).json({
                Info:"Successfully deleted the data"
                
            })
        }
        

    }
    catch(e){
        return res.status(404).json({
            massage:"Sorry , There is no task at that id"

        })
    }
})
routes.delete('/v1/tasks',async(req,res)=>{
    try{
        let tasksIds = req.body.tasks;
        for(let i = 0; i < tasksIds.length; i++){
            let id = tasksIds[i].Id
            let dataDB = await TodoData.deleteOne({_id:id});
        }
        return res.status(204).json({
            Info:"Successfully deleted the data"      
        })
    }
    catch(e){
        return res.status(404).json({
            massage:"Sorry , There is no task at that id"

        })
    }
})
routes.put('/v1/tasks/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        let upTodata = req.body;
        let dataDB = await TodoData.updateOne({_id:id},upTodata);
        console.log(dataDB.acknowledged)
        if(dataDB.acknowledged){
            return res.status(204).json({
                Info:"Successfully updated the data"
                
            })
    
        }
        
    }
    catch(e){
        return res.status(404).json({
            massage:"Sorry , There is no task at that id"

        })
    }
})

module.exports = routes;

