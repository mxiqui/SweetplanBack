import { Router } from "express";

const router = Router();

router.get("/", async (req,res)=>{
    console.log("Hola")
})

export default router