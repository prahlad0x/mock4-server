const express = require('express')
const { Plan } = require('../models/plan.model')
const router= express.Router()


router.get('/', async (req, res)=>{
    try {
        let plans = await Plan.find()
        return res.status(200).send({msg : "All Plans Details", isOk : true, plans : plans})
    } catch (error) {
        console.log(error)
        return res.status(401).send({msg : "Something Went wrong !" , isOk : false, error : error})
    }
})

router.post('/', async (req, res)=>{
    try {
        let plan = new Plan(req.body)
        
        await plan.save()

        return res.status(201).send({msg : "Plan Added successfully", isOk : true, plan : plan})

    } catch (error) {
        console.log(error)
        return res.status(401).send({msg : "Something Went wrong !" , isOk : false, error : error})
    }
})



router.delete('/:id', async (req,res)=>{
    try {
        let plan = Plan.findByIdAndDelete(req.params.id)
        return res.status(204).send({msg : "Plan Deleted Successfully", isOk : true, deletedPlan : plan})
    } catch (error) {
        console.log(error)
        return res.status(401).send({msg : "Something Went wrong !" , isOk : false, error : error})
    }
})

router.get('/filtered',async (req, res) =>{
    try {
        let destination = req.query.destination;
        let sort = req.query.sort
        if(sort && destination){
            let plans = await Plan.find({destination : destination}).sort({budget : (sort== "asc")? 1: 0})
            return res.status(201).send({msg : "Plan Deleted Successfully", isOk : true, plans : plans})
        }
        else if(sort){
            let plans = await Plan.find().sort({budget : (sort== "asc")? 1: 0})
            return res.status(201).send({msg : "Plan Deleted Successfully", isOk : true, plans : plans})
        }
        else{
            let plans = await Plan.find({destination : destination})
            return res.status(201).send({msg : "Plan Deleted Successfully", isOk : true, plans : plans})
        }
    } catch (error) {
        console.log(error)
        return res.status(401).send({msg : "Something Went wrong !" , isOk : false, error : error})
    }
})

module.exports = {router}