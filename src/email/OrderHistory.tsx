import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";
import React from "react";

type OrderHistoryEmailProps = {
  orders: {
    id: string;
    pricePaidInCents: number;
    createdAt: Date;
    photo: {
      name: string;
      imageUrl: string;
      description: string;
    };
  }[];
};

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 10000,
      photo: {
        name: "photo name",
        description: "Some description",
        imageUrl: "/photos/eb8fa976-6be1-43eb-b826-86e4bd370809-vanessa.png",
      },
    },
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 2000,
      photo: {
        name: "photo name 2",
        description: "Some other desc",
        imageUrl: "/photos/eb8fa976-6be1-43eb-b826-86e4bd370809-vanessa.png",
      },
    },
  ],
} satisfies OrderHistoryEmailProps;

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History & Downloads</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Order History</Heading>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <OrderInformation order={order} photo={order.photo} />
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
