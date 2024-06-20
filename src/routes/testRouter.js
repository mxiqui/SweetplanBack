import { Router } from "express";

const routerPrueba = Router();

routerPrueba.get("/", async (req,res)=>{
    res.send("Holaaa")
    console.log("Hola")
})

export default routerPrueba