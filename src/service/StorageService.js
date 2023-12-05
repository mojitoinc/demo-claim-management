class SecureStorage {
  key;

  constructor(key) {
    this.key = key;
  }

  setValue = (value) => {
    localStorage.setItem(this.key, value);
  };

  getValue = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.key);
    }
    return undefined;
  };

  clear = () => {
    localStorage.removeItem(this.key);
  };
}

export const StorageService = {
  token: new SecureStorage("token"),
  walletAddress: new SecureStorage("walletAddress"),
};
