import type { Request } from "express";

export interface TypedRequestBody<T> extends Request {
  body: T; // Define the body type here
}
