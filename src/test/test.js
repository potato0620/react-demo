// 'use strict';

const obj = Object.defineProperty({}, 'name', {
	value: 'xin',
	writable: false,
});

console.log(obj.name);
// obj.name = 'edit';
console.log(obj.name);
