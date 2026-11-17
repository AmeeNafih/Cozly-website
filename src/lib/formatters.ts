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
 * Checks if a pincode or state indicates delivery within Kerala, Tamil Nadu, or Karnataka
 * Kerala pincodes: 670xxx - 695xxx
 * Tamil Nadu pincodes: 600xxx - 643xxx
 * Karnataka pincodes: 560xxx - 591xxx
 */
export function checkDeliveryCoverage(pincode: string, city: string = ''): {
  isCovered: boolean;
  stateDetected?: 'Kerala' | 'Tamil Nadu' | 'Karnataka' | 'Other';
  message: string;
} {
  const cleanPin = pincode.trim().replace(/\D/g, '');
  const cleanCity = city.toLowerCase().trim();

  // Kerala check
  if (
    (cleanPin.length === 6 && cleanPin.startsWith('67') || cleanPin.startsWith('68') || cleanPin.startsWith('69')) ||
    cleanCity.includes('kochi') || cleanCity.includes('ernakulam') || cleanCity.includes('kottayam') ||
    cleanCity.includes('trivandrum') || cleanCity.includes('thiruvananthapuram') || cleanCity.includes('calicut') ||
    cleanCity.includes('kozhikode') || cleanCity.includes('thrissur') || cleanCity.includes('erattupetta') ||
    cleanCity.includes('pala') || cleanCity.includes('kannur') || cleanCity.includes('kollam')
  ) {
    return {
      isCovered: true,
      stateDetected: 'Kerala',
      message: 'Direct Factory Delivery Available within Kerala (7–12 Business Days)',
    };
  }

  // Karnataka check
  if (
    (cleanPin.length === 6 && (cleanPin.startsWith('56') || cleanPin.startsWith('57') || cleanPin.startsWith('58') || cleanPin.startsWith('59'))) ||
    cleanCity.includes('bangalore') || cleanCity.includes('bengaluru') || cleanCity.includes('mysore') ||
    cleanCity.includes('mysuru') || cleanCity.includes('mangalore') || cleanCity.includes('mangaluru') ||
    cleanCity.includes('hubli') || cleanCity.includes('dharwad')
  ) {
    return {
      isCovered: true,
      stateDetected: 'Karnataka',
      message: 'Direct Delivery Available to Karnataka / Bangalore with White-Glove Installation',
    };
  }

  // Tamil Nadu check
  if (
    (cleanPin.length === 6 && (cleanPin.startsWith('60') || cleanPin.startsWith('61') || cleanPin.startsWith('62') || cleanPin.startsWith('63') || cleanPin.startsWith('64'))) ||
    cleanCity.includes('chennai') || cleanCity.includes('coimbatore') || cleanCity.includes('madurai') ||
    cleanCity.includes('salem') || cleanCity.includes('tirupur') || cleanCity.includes('trichy')
  ) {
    return {
      isCovered: true,
      stateDetected: 'Tamil Nadu',
      message: 'Direct Delivery Available to Tamil Nadu (Safe Multi-Layer Packaging)',
    };
  }

  return {
    isCovered: false,
    stateDetected: 'Other',
    message: 'Your location is outside our primary 3-state delivery zone (Kerala, Tamil Nadu, Karnataka). We still deliver all-India via specialized logistics! Please confirm transit details with our team on WhatsApp.',
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
  const coverage = checkDeliveryCoverage(customer.pincode, customer.city);

  let message = `🛋️ *NEW ORDER FROM COZLY.IN*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `👤 *CUSTOMER DETAILS:*\n`;
  message += `• *Name:* ${customer.name || 'Not provided'}\n`;
  message += `• *Phone:* ${customer.phone || 'Not provided'}\n`;
  message += `• *Delivery City & Pincode:* ${customer.city || ''} - ${customer.pincode || ''}\n`;
  if (coverage.stateDetected) {
    message += `• *Region:* ${coverage.stateDetected} (${coverage.isCovered ? 'Direct Coverage Zone' : 'Special Route Inquiry'})\n`;
  }
  if (customer.notes && customer.notes.trim()) {
    message += `• *Special Notes:* ${customer.notes.trim()}\n`;
  }

  message += `\n📦 *ORDERED ITEMS (${items.length}):*\n`;

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

  message += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *ESTIMATED TOTAL:* *${formatINR(totalAmount)}*\n`;
  if (!coverage.isCovered) {
    message += `⚠️ *(Customer noted delivery outside primary coverage zone - confirming logistics)*\n`;
  } else {
    message += `✅ *(Delivery within ${coverage.stateDetected} coverage zone)*\n`;
  }
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Sent from cozly.in • Handcrafted in Erattupetta, Kottayam`;

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
  let text = `Hello COZLY Team! 👋\n\n`;
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
