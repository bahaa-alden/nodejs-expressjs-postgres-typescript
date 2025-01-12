import * as bcrypt from 'bcrypt';

/**
 * generate hash from password or string
 * @param {string} password
 * @returns {string}
 */
export function generateHash(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * validate text with hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export function validateHash(
  password: string | undefined,
  hash: string | undefined | null,
): Promise<boolean> {
  if (!password || !hash) {
    return Promise.resolve(false);
  }

  return bcrypt.compare(password, hash);
}

type NewType<TResult> = TResult;

export function getVariableName<TResult>(
  getVar: () => NewType<TResult>,
): string | undefined {
  const m = /\(\)=>(.*)/.exec(
    getVar.toString().replace(/(\r\n|\n|\r|\s)/gm, ''),
  );

  if (!m) {
    throw new Error(
      "The function does not contain a statement matching 'return variableName;'",
    );
  }

  const fullMemberName = m[1]!;

  const memberParts = fullMemberName.split('.');

  return memberParts[memberParts.length - 1];
}

export function excludeFields<T, Key extends keyof T>(
  user: T,
  keys: Key[],
): Omit<T, Key> {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}

export function excludeFieldsFromArray<T, Key extends keyof T>(
  users: T[],
  keys: Key[],
) {
  return users.map((user) => excludeFields(user, keys));
}
