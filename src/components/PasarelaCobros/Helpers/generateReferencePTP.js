export function generateReferencePTP(suffix) {
  const isProduction = process.env.NODE_ENV === 'production';

  return !isProduction ? `T_${suffix}` : suffix;
}
