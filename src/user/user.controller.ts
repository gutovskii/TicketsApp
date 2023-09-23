import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserExistsPipe } from './pipes/user-exists.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @JwtAuthGuard()
  findUser(@Param('id', UserExistsPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Get(':id/created-events')
  @JwtAuthGuard()
  findUserCreatedEvents(@Param('id', UserExistsPipe) id: number) {
    return this.userService.findUserCreatedEvents(id);
  }

  @Get(':id/registered-events')
  @JwtAuthGuard()
  findUserRegisteredEvents(@Param('id', UserExistsPipe) id: number) {
    return this.userService.findUserRegisteredEvents(id);
  }
}
