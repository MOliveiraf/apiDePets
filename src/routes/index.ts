import express from "express";
import petRouter from "../routes/petRouter";
import adotanteRouter from "../routes/adotanteRouter";

const router = (app: express.Application) => { // Alterado para express.Application
    app.use("/pets", petRouter);    
    app.use("/adotantes", adotanteRouter);    
};

export default router;
