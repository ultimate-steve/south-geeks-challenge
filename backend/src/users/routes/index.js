const express = require("express");
const usersList = require("../actions/list");
const usersCreate = require("../actions/create");
const userGet = require("../actions/get");
const userUpdate = require("../actions/update");
const userDelete = require("../actions/delete");

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await usersList(req.data);
  res.status(200).send(result);
});

router.post("/", async (req, res) => {
  const result = await usersCreate(req.data);
  res.status(200).send(result);
});

router.get("/:id", async (req, res) => {
  req.data.id = req.params.id;
  const result = await userGet(req.data);
  if(result.status)
  {
    return res.status(200).send(result);
  }
  return res.status(404).send({error: result.error});
});

router.put("/:id", async (req, res) => {
  req.data.id = req.params.id;
  const result = await userUpdate(req.data);
  if(result)
  {
    return res.status(200).send(result);
  }
  return res.status(404).send({error: "User not found"});
});

router.delete("/:id", async (req, res) => {
  req.data.id = req.params.id;
  const result = await userDelete(req.data);
  if(result)
  {
    return res.status(200).send(result);
  }
  return res.status(404).send({error: "User not found"});
});

module.exports = router;
