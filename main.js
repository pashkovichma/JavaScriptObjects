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