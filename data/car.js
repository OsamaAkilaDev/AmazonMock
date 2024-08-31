class Car {
    #brand;
    #model;
    speed;
    isTrunkOpen;

    constructor(brand, model) {
        this.#brand = brand;
        this.#model = model;
        this.speed = 0;
        this.isTrunkOpen = false;
    }
    
    displayInfo() {
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk: ${this.isTrunkOpen ? 'Open' : 'Closed'}`);
    }
    
    go() {
        if (!this.isTrunkOpen)
            this.#limitSpeed(this.speed + 5); 
    }

    brake() {
        this.#limitSpeed(this.speed - 5);
    }

    openTrunk() {
        this.isTrunkOpen = true;
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }

    #limitSpeed(speed) {
        if (speed >= 0 && speed <= 200) {
            this.speed = speed;
        }
    }
}

class RaceCar extends Car{
    acceleration;

    constructor(brand, model, acceleration) {
        super(brand, model);
        this.acceleration = acceleration;
    }

    go() {
        if (!this.isTrunkOpen)
            this.#limitSpeed(this.speed + this.acceleration); 
    }
    
    #limitSpeed(speed) {
        if (speed >= 0 && speed <= 300) {
            this.speed = speed;
        }
    }

    openTrunk() {}
    closeTrunk() {}
}

export const car1 = new Car('Toyota', 'Corolla');
export const car2 = new Car('Tesla', 'Model 3');

export const car3 = new RaceCar('McLaren', 'F1', 20)