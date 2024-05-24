"use strict";
console.log('Hello Typescript');
let firstName = "Dylan"; // type string
let lastName = "My last name";
console.log(typeof firstName);
console.log("Amaro porano jaha chay");
var CardinalDirections;
(function (CardinalDirections) {
    CardinalDirections[CardinalDirections["North"] = 0] = "North";
    CardinalDirections[CardinalDirections["East"] = 1] = "East";
    CardinalDirections[CardinalDirections["South"] = 2] = "South";
    CardinalDirections[CardinalDirections["West"] = 3] = "West";
})(CardinalDirections || (CardinalDirections = {}));
;
let currentDirection = CardinalDirections.South;
console.log(currentDirection);
