const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { Person } = require("../models/person");
const {JWTPRIVATEKEY} = require("../config/config");

router.get("/api/person", async (req, res)=>{
    try{
        const persons = await Person.find();
        res.json(persons);
    }catch(error){
        res.send({ message: "Internal Server Error" });
    }
})

router.delete("/api/person/:id",verifyToken, async (req, res)=>{
    jwt.verify(req.token,JWTPRIVATEKEY,async (err,authData)=>{
		if(err){
			res.send({
				message : 'Token is not valid' 
			})
		}
		else{
			try{
                const id = req.params.id;
                await Person.findByIdAndDelete({_id:id}).then(
                    res => res.json(res)
                )
            }catch(error){
                res.send({ message: "Internal Server Error" });
            }
		}
	})
})

router.put("/api/person/:id",verifyToken, async (req, res)=>{
    jwt.verify(req.token,JWTPRIVATEKEY,async(err,authData)=>{
		if(err){
			res.send({
				message : 'Token is not valid' 
			})
		}
		else{
			try{
                const id = req.params.id;
                console.log(id);
                await Person.findByIdAndUpdate({_id:id},{...req.body})
                res.send({ message: "Person update successfully" });
            }catch(error){
                res.send({ message: "Internal Server Error" });
            }
		}
	})
})

router.post("/api/person",verifyToken, async (req, res) => {
    jwt.verify(req.token,JWTPRIVATEKEY,async(err,authData)=>{
		if(err){
			res.send({
				message : 'Token is not valid' 
			})
		}
		else{
			try {
                await new Person({ ...req.body }).save();
                res.send({ message: "Person Saved successfully" });
            } catch (error) {
                res.send({ message: "Internal Server Error" });
            }
		}
	})
});

function verifyToken(req,res,next){
	const bearerHeader = req.headers['authorization'];
	if(typeof bearerHeader!== 'undefined'){
		const bearer = bearerHeader.split(" ");
		const token = bearer[1];
		req.token = token;
		next();
	}
	else{
		res.send({
			message : 'Token is not valid' 
		})
	}
}

module.exports = router;