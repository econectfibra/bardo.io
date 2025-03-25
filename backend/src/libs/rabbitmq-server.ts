/* eslint-disable no-useless-constructor */
import { Connection, Channel, connect, Message } from "amqplib";
import { logger } from "../utils/logger";
import { sleepRandomTime } from "../utils/sleepRandomTime";

export default class RabbitmqServer {
  private conn: any = null;
  private channel: any = null;

  // eslint-disable-next-line prettier/prettier
  constructor(private uri: string) { }

  async start(): Promise<void> {
    try {
      this.conn = await connect(this.uri);
      this.channel = await this.conn.createChannel();
      await this.channel.assertQueue("waba360", { durable: true });
      await this.channel.assertQueue("messenger", { durable: true });
    } catch (err) {
      logger.error("Error starting RabbitMQ:", err);
      throw err;
    }
  }

  // async createExchange(name: string): Promise<void> {
  //   // const ex = this.channel.assertExchange(name, type, { durable: true });
  //   // console.log("Ex", ex);
  //   // await this.channel.bindQueue(name, name, name);
  // }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async publishInQueue(queue: string, message: string) {
    if (!this.channel) throw new Error("Channel not initialized");
    await this.channel.assertQueue(queue, { durable: true });
    return this.channel.sendToQueue(queue, Buffer.from(message), {
      persistent: true
    });
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    message: string
  ): Promise<boolean> {
    if (!this.channel) throw new Error("Channel not initialized");
    return this.channel.publish(exchange, routingKey, Buffer.from(message), {
      persistent: true
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async consumeWhatsapp(
    queue: string,
    callback: (message: Message) => Promise<void>
  ) {
    if (!this.channel) throw new Error("Channel not initialized");
    this.channel.prefetch(10, false);
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, async (message: any) => {
      try {
        if (!message) return;
        await callback(message);
        // delay para processamento da mensagem
        await sleepRandomTime({
          minMilliseconds: Number(process.env.MIN_SLEEP_INTERVAL || 500),
          maxMilliseconds: Number(process.env.MAX_SLEEP_INTERVAL || 2000)
        });
        this.channel?.ack(message);
        return;
      } catch (error) {
        this.channel?.nack(message);
        logger.error("consumeWhatsapp", error);
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async consume(queue: string, callback: (message: Message) => void) {
    if (!this.channel) throw new Error("Channel not initialized");
    return this.channel.consume(queue, (message: any) => {
      try {
        if (!message) return;
        callback(message);
        this.channel?.ack(message);
        return;
      } catch (error) {
        logger.error(error);
      }
    });
  }
}
