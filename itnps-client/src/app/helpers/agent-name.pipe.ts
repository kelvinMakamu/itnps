import { Pipe, PipeTransform } from '@angular/core';
import { UsersService } from '../services/users.service';

@Pipe({
  name: 'agentName'
})
export class AgentNamePipe implements PipeTransform {
  
  fullName: string;

  constructor(private userService: UsersService){}

  transform(agent_id: any): string {
    this.fullName = this.userService.getUserFullName(agent_id);
    return this.fullName;
  }

}
