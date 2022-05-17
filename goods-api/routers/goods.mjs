import express from "express";
import { ensureAuthenticated } from "../ensureAthenticated.mjs";
import faker from "faker";
import { isDateValid } from "../utils.mjs";
import { compareDates } from "../utils.mjs";

export const goodsRoutes = (db) => {
  const goodsRoutes = express.Router();
  goodsRoutes.get("/", async (req, res) => {
    res.send(db.data.meetups);
  });

  goodsRoutes.post("/", ensureAuthenticated, async (req, res) => {
    //TODO: validate model data
    try {
      const response = {
        id: faker.datatype.uuid(),
        author: req.body.author,
        title: req.body.title,
        excerpt: req.body.excerpt,
        price: req.body.price,
        status: "DRAFT",
        buyers:[],
        img: req.body.img,
      };
        const meetup = db.data.meetups.push(response);
        await db.write();
        res.send(response);
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err);
    }
  });

    goodsRoutes.put("/", ensureAuthenticated, async (req, res) => {
        const index = db.data.meetups.findIndex((it) => it.id === req.body.id);
        db.data.meetups[index] = {...db.data.meetups[index], ...req.body};
        await db.write();
        res.send(db.data.meetups[index]);
    });
  goodsRoutes.put("/buyers", ensureAuthenticated, async (req, res) => {
    const index = db.data.meetups.findIndex((it) => it.id === req.body.id);
  const buyers = db.data.meetups[index].buyers
    buyers.push(req.body.buyer)
    db.data.meetups[index] = {...db.data.meetups[index]};
    await db.write();
    res.send(db.data.meetups[index]);
  });
  goodsRoutes.put("/buying", ensureAuthenticated, async (req, res) => {
    const index = db.data.meetups.findIndex((it) => it.id === req.body.id);
    db.data.meetups[index] = {...db.data.meetups[index], ...req.body,buyer:db.data.meetups[index].buyers.find(({id})=>id===req.body.userID)};
    await db.write();
    res.send(db.data.meetups[index]);
  });
  goodsRoutes.get("/:id", ensureAuthenticated, async (req, res) => {
    const meetup = db.data.meetups.find((m) => m.id === req.params.id);
    if (!meetup) {
      res.sendStatus(404);
    }
    res.send(meetup);
  });

  goodsRoutes.delete("/:id", ensureAuthenticated, async (req, res) => {
    const index = db.data.meetups.findIndex((it) => it.id === req.params.id);
    if (index >= 0) {
      db.data.meetups.splice(index, 1);
    }
    await db.write();
    res.send({});
  });
  return goodsRoutes;
};
