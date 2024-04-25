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