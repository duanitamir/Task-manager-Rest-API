const {calculateTip, celsiusToFahrenheit, fahrenheitToCelsius, add} = require('../src/math');

test('Tip Calculator', () => {
   const total = calculateTip(10, .3);
    expect(total).toBe(13)

});

test('Should calculate total with default tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5)

})
test('Should calculate Cel to Fer.',() => {
    const temp = celsiusToFahrenheit(0);
    expect(temp).toBe(32)
})

test('Should calculate Fer to Cels', () => {
    const temp = fahrenheitToCelsius(32);
    expect(temp).toBe(0)
})

/*test('Async test demo', (done) => {
    setTimeout(() =>{
        expect(1).toBe(1);
        done()
    }, 2000)
});*/

test('Add', (done) => {
    const sum = add(2,3).then((sum)=>{
        expect(sum).toBe(5);
        done()
    });
});

test('Should Add Async/Await', async ()=>{
    const sum = await add(12,13);
        expect(sum).toBe(25);

});