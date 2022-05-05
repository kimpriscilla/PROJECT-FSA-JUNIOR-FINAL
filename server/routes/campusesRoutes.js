const express = require("express");
const router = express.Router();
const {
  models: { Campuses, Students },
} = require("../db/server");

router.get("/campuses", async (req, res, next) => {
  try {
    res.send(await Campuses.findAll());
  } catch (error) {
    next(error);
  }
});

router.get("/campuses/:id", async (req, res, next) => {
  try {
    const campus = await Campuses.findOne({
      include: Students,
      where: { id: req.params.id },
    });
    res.send(campus);
  } catch (error) {
    next(error);
  }
});

router.delete("/campuses/:id", async (req, res, next) => {
  try {
    const deleteCampus = await Campuses.findByPk(req.params.id);
    await deleteCampus.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.post("/campuses", async (req, res, next) => {
  try {
    res.send(await Campuses.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put("/campuses/:id", async (req, res, next) => {
  try {
    const campus = await Campuses.findByPk(req.params.id);
    res.send(await campus.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
