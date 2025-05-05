import { Controller, Get } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Get('send-message')
  async sendMessage() {
    await this.kafkaService.sendMessage('hello from nest');
    return 'Message sent!';
  }
}
