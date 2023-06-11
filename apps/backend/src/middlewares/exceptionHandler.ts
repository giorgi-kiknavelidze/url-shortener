import { Request, Response } from "express";

export const exceptionHandler =
  (shouldLogToConsole: boolean) =>
  (err: unknown, _req: Request, res: Response, _next: () => void) => {
    if (!err) return;
    if (shouldLogToConsole) {
      if (err instanceof Error) console.log(err.message);
      else console.log(err);
    }
    res.status(500).json({ status: "error", error: "INTERNAL_SERVER_ERROR" });
  };
