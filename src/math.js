const calculateTip = (total, percent = .25) => total + total * percent;


const add  = (a, b) => {
    return new Promise( (resulve, reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0){
                return reject('Only positive numbers ')
            }
            resulve(a+b);
        }, 2000)
    })
};


const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
}

module.exports= {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add

}


//
// Goal: Test temperature conversion functions
//
// 1. Export both functions and load them into test suite
// 2. Create "Should convert 32 F to 0 C"
// 3. Create "Should convert 0 C to 32 F"
// 4. Run the Jest to test your work!