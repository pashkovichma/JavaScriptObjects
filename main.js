const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
};

Object.defineProperties(person, {
  firstName: { writable: false, configurable: false },
  lastName: { writable: false, configurable: false },
  age: { writable: false, configurable: false },
  email: { writable: false, configurable: false }
});

Object.defineProperty(person, 'updateInfo', {
  value: function(info) {
    if (info && typeof info === 'object') {
      for (let key in info) {
        if (person.hasOwnProperty(key) && Object.getOwnPropertyDescriptor(person, key).writable) {
          person[key] = info[key];
        }
      }
    }
  },
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(person, 'address', {
  value: {},
  writable: true,
  enumerable: false,
  configurable: false
});

person.updateInfo({ firstName: "Jane", age: 32 }); 

console.log(person); 
