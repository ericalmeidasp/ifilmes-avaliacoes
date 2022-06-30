import { User } from 'App/Models'

/*
 * pontua o usuário
 */
export class PointsService {
  public static async GivePoints(user: User) {
    user.userPoints++
    await user.save()
    return
  }
}
