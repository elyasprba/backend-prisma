export function hashPhoneNumber(phoneNumber: string) {
  const firstFour = phoneNumber.slice(0, 4);
  const lastFour = phoneNumber.slice(-4);
  const middleStars = '*'.repeat(phoneNumber.length - 8);

  return `${firstFour}${middleStars}${lastFour}`;
}
