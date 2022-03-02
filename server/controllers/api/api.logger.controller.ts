import express from "express";
import { getAllLogs } from "../logger.controller";

export const getAllLogsApi = async (req: express.Request, res: express.Response, next: any) => {

  try {
    const response = await getAllLogs()
    res.json(response)
  } catch (error) {
    next(error)
  }
}