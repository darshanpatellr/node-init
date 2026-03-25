class Car {
    constructor(name) {
        this.name = name;
    }

    model() {
        return `This is a ${this.name} car.`;
    }
}

class Bmw extends Car {
    model() {
        return `This is a ${this.name} car model.`;
    }
}

const bmw = new Bmw("s7");
console.log(bmw.model());