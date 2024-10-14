declare module "@worthaboutapig/amqplib" {
  export type CloseHandler = () => void;
  export type ErrorHandler = (error: Error) => void;
  export type IMessage = { content: string };

  export interface CommonChannelConnection {
    close(): Promise<void>;
    on(event: string, handler: CloseHandler | ErrorHandler): void;
    removeListener(name: string, handler: CloseHandler | ErrorHandler): void;
    valid: boolean;
  }

  export interface IChannel extends CommonChannelConnection {
    assertExchange(name: string, type: string, options?: { durable?: boolean }): Promise<void>;
    assertQueue(name: string, options?: { durable?: boolean; exclusive?: boolean }): Promise<void>;
    consume(name: string, handler: (message: IMessage) => Promise<void>, options: { noAck: boolean }): Promise<void>;
    sendToQueue(name: string, data: unknown, options?: { persistent: true }): boolean;
  }

  export interface IConnection extends CommonChannelConnection {
    createChannel(): Promise<IChannel>;
  }

  export function connect(url: string, connOptions: unknown): Promise<IConnection>;
}
