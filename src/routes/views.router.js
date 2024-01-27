import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", {})
})

router.get("/actividad-1", (req, res) => {
  res.render("actividad-1", {})
})

router.get("/actividad-2", (req, res) => {
  res.render("actividad-2", {})
})

export default router