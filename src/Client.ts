import { ClientConfig } from "./repository/interface/ClientConfig";

export class Client {
  constructor(public readonly options: ClientConfig) {}
}
