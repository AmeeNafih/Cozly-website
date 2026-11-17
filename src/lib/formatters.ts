import { CartItem, CustomerOrderDetails, Product } from '@/types';

/**
 * Formats a number into Indian Rupee format with ₹ symbol (e.g., ₹42,500)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Cleans phone number to international WhatsApp format without '+' or spaces (e.g. '919846581241')
 */
export function cleanWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `91${digits}`;
  }
  return digits;
}

/**
 * Checks delivery coverage across India
 */
export function checkDeliveryCoverage(pincode: string, city: string = ''): {
  isCovered: boolean;
  stateDetected?: string;
  message: string;
} {
  const cleanPin = pincode.trim().replace(/\D/g, '');

  if (cleanPin.length === 6) {
    return {
      isCovered: true,
      stateDetected: 'All India',
      message: 'All-India delivery available to your pincode with protective transit packaging.',
    };
  }

  return {
    isCovered: true,
    stateDetected: 'All India',
    message: 'All-India delivery available across all states and cities.',
  };
}

/**
 * Builds the URL-encoded WhatsApp order link
 */
export function generateWhatsAppOrderUrl(
  items: CartItem[],
  customer: CustomerOrderDetails,
  whatsappNumber: string = '+919846581241',
  origin: string = 'https://cozly.in'
): string {
  const cleanNumber = cleanWhatsAppNumber(whatsappNumber);
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let message = `*NEW ORDER — COZLY by Zoffaro IN*\n`;
  message += `─────────────────────────\n\n`;
  message += `CUSTOMER DETAILS:\n`;
  message += `• Name: ${customer.name || 'Not provided'}\n`;
  message += `• Phone: ${customer.phone || 'Not provided'}\n`;
  message += `• Delivery City & Pincode: ${customer.city || ''} - ${customer.pincode || ''}\n`;
  message += `• Coverage: All-India Doorstep Delivery\n`;
  if (customer.notes && customer.notes.trim()) {
    message += `• Notes: ${customer.notes.trim()}\n`;
  }

  message += `\nORDERED ITEMS (${items.length}):\n`;

  items.forEach((item, index) => {
    message += `\n*${index + 1}. ${item.name}*\n`;
    if (item.isCustomDesign && item.customDetails) {
      message += `   • *Config:* Custom Artisanal Configuration\n`;
      message += `   • *Type:* ${item.customDetails.type} (${item.customDetails.size})\n`;
      message += `   • *Frame & Wood:* ${item.customDetails.wood}\n`;
      message += `   • *Fabric & Color:* ${item.customDetails.fabric} (${item.customDetails.color})\n`;
      message += `   • *Firmness:* ${item.customDetails.firmness}\n`;
      message += `   • *Leg Style:* ${item.customDetails.legs}\n`;
    } else {
      if (item.selectedFabric) message += `   • *Fabric:* ${item.selectedFabric}\n`;
      if (item.selectedColor) message += `   • *Color:* ${item.selectedColor}\n`;
      if (item.selectedFinish) message += `   • *Wood Finish:* ${item.selectedFinish}\n`;
      if (item.selectedFirmness) message += `   • *Firmness:* ${item.selectedFirmness}\n`;
      if (item.slug) message += `   • *Product Link:* ${origin}/collection/${item.slug}\n`;
    }
    message += `   • *Quantity:* ${item.quantity} × ${formatINR(item.price)} = *${formatINR(item.price * item.quantity)}*\n`;
  });

  message += `\n─────────────────────────\n`;
  message += `TOTAL: ${formatINR(totalAmount)}\n`;
  message += `(All-India delivery with protective transit packaging)\n`;
  message += `─────────────────────────\n`;
  message += `Sent from COZLY by Zoffaro IN (cozly.in) • Crafted for every comfort.\nWorkshop: Erattupetta, Kottayam, Kerala`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds pre-filled product enquiry WhatsApp URL
 */
export function generateProductEnquiryUrl(
  product: Product,
  selectedColor?: string,
  selectedFabric?: string,
  whatsappNumber: string = '+919846581241',
  origin: string = 'https://cozly.in'
): string {
  const cleanNumber = cleanWhatsAppNumber(whatsappNumber);
  let text = `Hello COZLY by Zoffaro IN!\n\n`;
  text += `I am interested in *${product.name}* (${formatINR(product.price)}) from cozly.in.\n\n`;
  text += `🔗 *Link:* ${origin}/collection/${product.slug}\n`;
  if (selectedFabric) text += `• *Fabric Preferred:* ${selectedFabric}\n`;
  if (selectedColor) text += `• *Color:* ${selectedColor}\n`;
  text += `\nCould you please share more real workshop photos, wood customization options, and delivery timeline to my location? Thank you!`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Creates URL slug from product name
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}
