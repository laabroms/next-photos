import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";

type PurchaseReceiptEmailProps = {
  photo: {
    name: string;
    imageUrl: string;
    description: string;
  };
  order: { id: string; createdAt: Date; pricePaidInCents: number };
  downloadVerificationId: string;
};

PurchaseReceiptEmail.PreviewProps = {
  photo: {
    name: "photo name",
    description: "Some description",
    imageUrl: "/photos/eb8fa976-6be1-43eb-b826-86e4bd370809-vanessa.png",
  },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 10000,
  },
  downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseReceiptEmailProps;

export default function PurchaseReceiptEmail({
  photo,
  order,
}: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>Download {photo.name} and view receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <OrderInformation order={order} photo={photo} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
