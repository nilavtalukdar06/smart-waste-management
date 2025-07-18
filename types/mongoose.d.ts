import { Connection } from "mongoose";

declare global {
  var mongoose: {
    connection: null | Connection;
    promise: null | Promise<Connection>;
  };
}

export {};
