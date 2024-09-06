class HashTable {
  constructor(size) {
    this.table = new Array(size);
    this.size = size;
  }

  // Simple hash function to compute index
  hashFunction(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  // Insert a key-value pair into the hash table
  set(key, value) {
    const index = this.hashFunction(key);
    if (!this.table[index]) {
      this.table[index] = [];
    }
    // Check for existing key and update value
    for (let i = 0; i < this.table[index].length; i++) {
      if (this.table[index][i][0] === key) {
        this.table[index][i][1] = value;
        return;
      }
    }
    // If key doesn't exist, add new key-value pair
    this.table[index].push([key, value]);
  }

  // Retrieve a value by key from the hash table
  get(key) {
    const index = this.hashFunction(key);
    if (this.table[index]) {
      for (let i = 0; i < this.table[index].length; i++) {
        if (this.table[index][i][0] === key) {
          return this.table[index][i][1];
        }
      }
    }
    return undefined;
  }

  // Remove a key-value pair from the hash table
  remove(key) {
    const index = this.hashFunction(key);
    if (this.table[index]) {
      for (let i = 0; i < this.table[index].length; i++) {
        if (this.table[index][i][0] === key) {
          this.table[index].splice(i, 1);
          return true;
        }
      }
    }
    return false;
  }
}

// Usage example
const hashTable = new HashTable(50);
hashTable.set("name", "Alice");
hashTable.set("age", 25);
hashTable.set("20", "abubakasadr");

console.log(hashTable.get("name")); // Output: Alice
console.log(hashTable.get("age"));  // Output: 25
console.log(hashTable.get("20"));  // Output: 25

hashTable.remove("age");
console.log(hashTable.get("age"));  // Output: undefined
