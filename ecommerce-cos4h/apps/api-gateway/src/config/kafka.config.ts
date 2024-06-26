import { config as dotevConfig } from "dotenv";

dotevConfig({ path: ".env" });

export const kafkaConfig = () => ({
  broker: process.env.KAFKA_BROKER ?? "localhost:29092",
  services: {
    order: {
      clientId: "order",
      groupId: "order",
      name: "order-kafka-client",
    },
    product: {
      clientId: "product",
      groupId: "product",
      name: "product-kafka-client",
    },
    user: {
      clientId: "user",
      groupId: "user",
      name: "user-kafka-client",
    },
    file: {
      clientId: "file",
      groupId: "file",
      name: "file-kafka-client",
    },
    gateway: {
      clientId: "gateway",
    },
  },
});
