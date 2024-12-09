export function isValid(token: string) {
  const tokenString = token.split(' ')[1];
  console.log(tokenString === 'shiyam', 'token >>>>>');
  return tokenString === 'shiyam' ? true : false;
}

export function parseToken(token: string) {
  return token;
}

export function mapKeysToLowerCase(obj: Record<string, string>) {
  return Object.entries(obj).reduce((carry, [key, value]) => {
    carry[key.toLowerCase()] = value;
    return carry;
  }, {});
}
