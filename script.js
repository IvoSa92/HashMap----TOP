class HashMap {
  constructor() {
    this.capacity = 16;
    this.storage = new Array(this.capacity);
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

    this.storage[index].push([key, value]);
  }
}

const map = new HashMap();
map.set("ivo", "ist verdammt cool");

console.log(map.storage);
