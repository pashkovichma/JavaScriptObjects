//Task 1: Object Property Manipulation
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
};

for (let prop in person) {
  Object.defineProperty(person, prop, {
    writable: false,
  });
}

// Object.defineProperties(person, {
//   firstName: { writable: false },
//   lastName: { writable: false },
//   age: { writable: false },
//   email: { writable: false }
// });

Object.defineProperty(person, 'updateInfo', {
  value: function(newInfoObject) {
    if (newInfoObject && typeof newInfoObject === 'object') {
      for (let prop in newInfoObject) {
        if (person.hasOwnProperty(prop)) {
          const deskriptorValue = Object.getOwnPropertyDescriptor(person, prop).writable;
          Object.defineProperty(person, prop, {
            writable: true,
          });
          person[prop] = newInfoObject[prop];
          Object.defineProperty(person, prop, {
            writable: deskriptorValue,
          });
        }
      }
    }
  }
});

person.updateInfo({ firstName: "Jane", age: 32 }); 

Object.defineProperty(person, "address", {
  value: {},
  writable: true,
});

//Task 2: Object Property Enumeration and DeletionTask 2: Object Property Enumeration and Deletion
const product = {
  name: "Laptop",
  price: 1000,
  quantity: 5,
};

Object.defineProperty(product, 'price', {
  writable: false, 
  enumerable: false, 
});

Object.defineProperty(product, 'quantity', {
  writable: false, 
  enumerable: false ,
});

function getTotalPrice (product) {
  const isPriseEnumerable = Object.getOwnPropertyDescriptor(product, 'price').enumerable;
  const isQuantityEnumerable = Object.getOwnPropertyDescriptor(product, 'quantity').enumerable;
  let totalPrice;
  if (!isPriseEnumerable && !isQuantityEnumerable) {
    totalPrice = product.price * product.quantity;
  } else {
    throw new Error("Check emumerable of price or quantity properties.")
  }
  
  return totalPrice;
}

function deleteNonConfigurable (objectToModify, propertyToDelete) {
  if (Object.getOwnPropertyDescriptor(objectToModify, propertyToDelete).configurable) {
    delete objectToModify[propertyToDelete]; 
  } else {
    throw new Error(`It's impssible to delete nonconfigurable property`);
  }
}

//Task 3: Object Property Getters and Setters
let bankAccount = {
  _balance: 1000, 

  get formattedBalance() {
      return `$${this._balance}`;
  },

  set balance(newBalance) {
      if (typeof newBalance === 'number' && newBalance >= 0) {
          this._balance = newBalance;
      } else {
          throw new Error('Invalid balance');
      }
  },

  transfer: function(targetAccount, amount) {
    if (typeof amount !== 'number' || amount <= 0) {
        throw new Error('Invalid amount');
    }

    if (this._balance < amount) {
        throw new Error('Insufficient funds');
    }

    this._balance = this._balance - amount;
    targetAccount._balance = targetAccount._balance + amount;
  }
};

let bankAccount1 = {
  _balance: 1000, 

  get formattedBalance() {
      return `$${this._balance}`;
  },

  set balance(newBalance) {
      if (typeof newBalance === 'number' && newBalance >= 0) {
          this._balance = newBalance;
      } else {
          throw new Error(`Invalid balance ${newBalance}`);
      }
  },
};

//Task 4: Advanced Property Descriptors
function createImmutableObject(obj) {
  let immutableObj = {};

  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      immutableObj[key] = createImmutableObject(obj[key]);
    } else {
      Object.defineProperty(immutableObj, key, {
        value: obj[key],
        writable: false,
        configurable: false
      });
    }
  });
  return immutableObj;
}

//Task 5: Object Observation
function observeObject(obj, callback) {
  let observedObj = {};

  function createAccessor(prop) {
      Object.defineProperty(observedObj, prop, {
          get() {
              callback(prop, 'get');
              return obj[prop];
          },
          set(value) {
              callback(prop, 'set');
              obj[prop] = value;
          },
          enumerable: true,
          configurable: true
      });
  }

  // Create property accessors for each property of the object
  Object.keys(obj).forEach(prop => {
      createAccessor(prop);
  });

  return observedObj;
}

function callback(prop, action) {
  console.log(`The property name is: '${prop}'`);
  console.log(`The action is: ${action}`)
}

let observedPerson = observeObject(person, callback);

console.log(observedPerson.firstName); 

//Task 6: Object Deep Cloning
function deepCloneObject(obj, clonedObjects = {}) {
  if (obj === null || typeof obj !== 'object') {
      return obj;
  }

  if (clonedObjects[obj]) {
      return clonedObjects[obj];
  }

  let clonedObj = Array.isArray(obj) ? [] : {};

  clonedObjects[obj] = clonedObj;

  for (let key in obj) {
      clonedObj[key] = deepCloneObject(obj[key], clonedObjects);
  }

  return clonedObj;
}

//Task 7: Object Property Validation
function validateObject(obj, schema) {
  for (let key in schema) {
    // does the property exist in the object
    if (!(key in obj)) { 
      return false; 
    }
    // does the type of the property is valid
    if (typeof obj[key] !== schema[key].type) {
      return false; 
    }
    // if there is any additional validation
    if (schema[key].validate && !schema[key].validate(obj[key])) {
        return false; 
    }
  }

  return true; 
}