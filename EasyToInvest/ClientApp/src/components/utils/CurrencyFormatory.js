export default function (language, currency) {
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  });
}
