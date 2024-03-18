'use strict';

const obj = Object.defineProperty({}, 'name', {
	value: 'xin',
	writable: false,
});

// console.log(obj.name);
// obj.name = 'edit';
// console.log(obj.name);
// class Penson {
// 	static name;
// 	#test = 'dddd';
// 	age;
// 	sex;
// 	constructor(name, age, sex) {
// 		(this.name = name), (this.age = age), (this.sex = sex);
// 	}
// 	getName() {
// 		return `this person's name is ${this.name}`;
// 	}
// 	isMan() {
// 		return this.sex === '男';
// 	}
// 	get isPerson() {
// 		return 'hahah 你被骗了' + this.#test;
// 	}
// 	get xin() {
// 		return 'xin';
// 	}
// 	set isPerson(value) {}
// }

// class NewPerson extends Penson {
// 	getPerson() {
// 		return this.#test, this.age;
// 	}
// }
// const xinbor = new Penson('xin', '27', 'nv');
// const newPerson = new NewPerson();
// console.log(this.#test, 'person');
// console.log(xinor.#test);

class PowerArray extends Array {
	isEmpty() {
		return this.length === 0;
	}
	isStringArray() {
		return !!this.find((element) => {
			if (typeof element === 'string') {
				return true;
			}
		});
	}

	static get [Symbol.species]() {
		return Array;
	}
}

const arr = new PowerArray(1, 3, 4, 1, 'a');

const arr2 = arr.filter((el) => {
	return el > 1;
});

console.log(arr2 instanceof Array, arr2.entries());

console.log(arr.isEmpty(), arr.isStringArray());
