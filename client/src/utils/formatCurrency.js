/**
 * Reusable Indian Currency (INR) Formatter
 * Complies with RBI / Indian numbering system (e.g. ₹1,25,000.00)
 */
const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const inrCompactFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/**
 * Format a numeric amount to INR currency string (e.g. ₹1,25,480.00)
 * @param {number|string} amount 
 * @returns {string}
 */
export const formatINR = (amount) => {
  const num = Number(amount);
  if (isNaN(num)) return '₹0.00';
  return inrFormatter.format(num);
};

/**
 * Format integer/rounded INR (e.g. ₹1,25,480)
 * @param {number|string} amount 
 * @returns {string}
 */
export const formatINRCompact = (amount) => {
  const num = Number(amount);
  if (isNaN(num)) return '₹0';
  return inrCompactFormatter.format(num);
};

/**
 * Format large Indian quantities with suffixes (Lakhs / Crores)
 * @param {number} num 
 * @returns {string}
 */
export const formatIndianNumber = (num) => {
  const n = Number(num);
  if (isNaN(n)) return '0';
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`;
  return formatINR(n);
};

export default formatINR;

