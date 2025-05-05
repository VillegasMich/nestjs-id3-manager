import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, KafkaMessage } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka;
  private consumeTopic: string;
  private produceTopic: string;
  private broker: string;
  private clientId: string = 'my-app';

  constructor(private readonly configService: ConfigService) {
    this.consumeTopic =
      this.configService.get<string>('CONSUME_TOPIC') || 'test-topic';
    this.produceTopic =
      this.configService.get<string>('PRODUCE_TOPIC') || 'test-topic';
    this.broker = this.configService.get<string>('BROKER') || 'localhost:9092';
    this.kafka = new Kafka({
      clientId: this.clientId,
      brokers: [this.broker],
      logLevel: 0,
    });
  }

  async onModuleInit() {
    await this.consumeMessage();
  }

  async sendMessage(message: string): Promise<void> {
    const producer = this.kafka.producer();
    await producer.connect();
    await producer.send({
      topic: this.produceTopic,
      messages: [{ value: message }],
    });
    await producer.disconnect();
  }

  async consumeMessage(): Promise<void> {
    const consumer = this.kafka.consumer({ groupId: 'nest-group' });
    await consumer.connect();
    await consumer.subscribe({ topic: this.consumeTopic });
    console.log(`Listening for messages in ${this.consumeTopic} topic`);
    await consumer.run({
      eachMessage: ({ message }: { message: KafkaMessage }) => {
        const value = message.value?.toString();
        if (value) {
          try {
            const parsed = JSON.parse(value); // TODO: ADD MAPPER (TYPE)
            console.log('Received message:\n' + parsed);
          } catch {
            console.log('Raw message value:\n' + value);
          }
        }
        return Promise.resolve();
      },
    });
  }
}
