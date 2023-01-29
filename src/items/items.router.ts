import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { BaseItem, Item } from "./item.interface";

export const itemsRouter = express.Router();

//GET Items
itemsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const items: Item[] = await ItemService.findAll();
    res.status(200).send(items);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

//GET items/:id

itemsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const item: Item = await ItemService.find(id);
    if (item) res.status(200).send(item);
    res.status(404).send("No item with given id found");
  } catch (e: any) {
    res.send(500).send(e.message);
  }
});

//POST items

itemsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: BaseItem = req.body;
    const newItem = await ItemService.create(item);
    res.status(202).json(newItem);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// PUT items/:id

itemsRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const itemUpdate: Item = req.body;
    const exsistingItem: Item = await ItemService.find(id);
    if (exsistingItem) {
      const updatedItem: Item = (await ItemService.update(
        id,
        itemUpdate
      )) as Item;
      return res.status(200).json(updatedItem);
    }
    const newItem = await ItemService.create(itemUpdate);
    res.status(200).json(newItem);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

//Delete items/:id

itemsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ItemService.remove(id);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
