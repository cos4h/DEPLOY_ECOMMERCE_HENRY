import { Controller } from "@nestjs/common";
import { UserAppService } from "./user-app.service";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class UserAppController {
  constructor(private readonly userAppService: UserAppService) {}

  @MessagePattern("MS-USERS-GET")
  async getUsers({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<any> {
    return await this.userAppService.findAll(page, limit);
  }

  @MessagePattern("MS-USER-GET")
  async getUser(id: string): Promise<any> {
    const userDB = await this.userAppService.findOne(id);
    return JSON.stringify(userDB);
  }

  @MessagePattern("MS-USER-POST")
  async createUser(user: any): Promise<any> {
    const response = await this.userAppService.create(user);
    return JSON.stringify(response);
  }

  @MessagePattern("MS-USER-SIGNIN")
  async signIn(userLogin: any): Promise<any> {
    const response = await this.userAppService.signIn(userLogin);
    return response;
  }

  @EventPattern("MS-USER-PUT")
  async updateUser(@Payload() data: { id: string; user }): Promise<any> {
    await this.userAppService.update(data.id, data.user);
  }

  @EventPattern("MS-USER-DELETE")
  deleteUser(id: string): Promise<void> {
    return this.userAppService.delete(id);
  }
}
