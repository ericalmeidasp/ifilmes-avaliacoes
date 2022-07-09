import { User } from "App/Models";

declare module '@ioc:Adonis/Core/Request' {
    interface RequestContract {
      user: User
    }
  }
  