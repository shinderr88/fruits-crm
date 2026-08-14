import { OrderRecord } from "@/types";
import { formatINR } from "@/lib/utils";

export function generateInvoice(order: OrderRecord) {
  const invoiceNumber = `INV-${order.id.replace("ORD-", "")}`;

  return {
    invoiceNumber,
    orderId: order.id,
    retailer: order.retailer,
    routeId: order.routeId,
    items: order.items,
    amount: order.amount,
    formattedAmount: formatINR(order.amount),
    createdAt: new Date().toISOString(),
  };
}