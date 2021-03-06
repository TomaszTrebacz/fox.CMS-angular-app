import { decrypt, encrypt } from '../utils';

export function RefreshToken(): any {
  return (target: any, key: string) => {
    const tokenKey = 'refreshtoken';

    Object.defineProperty(target, key, {
      get: () => {
        const refreshtoken = localStorage.getItem(tokenKey);

        if (refreshtoken) {
          return JSON.parse(decrypt(refreshtoken));
        }

        return null;
      },
      set: (token: string) => {
        localStorage.setItem(tokenKey, encrypt(token));
      },
    });
  };
}
