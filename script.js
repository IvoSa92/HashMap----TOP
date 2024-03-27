class HashMap {
  constructor() {
    this.capacity = 16;
    this.storage = new Array(this.capacity);
    this.counter = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    if (this.counter >= this.capacity * 0.75) {
      let oldStorage = this.storage;
      this.capacity = this.capacity * 2;
      this.storage = new Array(this.capacity);
      this.counter = 0;

      oldStorage.forEach((bucket) => {
        if (bucket) {
          bucket.forEach(([oldKey, oldValue]) => {
            this.set(oldKey, oldValue);
          });
        }
      });
    }

    const index = this.hash(key);

    if (!this.storage[index]) {
      this.storage[index] = [];
    }

    for (let i = 0; i < this.storage[index].length; i++) {
      if (this.storage[index][i][0] === key) {
        this.storage[index][i][1] = value;
        return;
      }
    }

    if (index < 0 || index >= this.storage.length) {
      throw new Error("Trying to access index out of bound");
    }
    this.storage[index].push([key, value]);
    this.counter++;
  }

  get(key) {
    let index = this.hash(key);

    if (this.storage[index]) {
      return this.storage[index][0][1];
    } else {
      return null;
    }
  }
}

const map = new HashMap();
map.set("ivo", "ist verdammt cool");

console.log(map.storage);
