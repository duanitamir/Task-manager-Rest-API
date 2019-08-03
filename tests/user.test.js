const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const {userOneId, userOne, setupDatabase,taskOne, taskTwo, taskThree, userTwoId, userTwo,} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should sign up a new User',async () =>{

     const response = await request(app).post('/users').send({
        name:'Tamir',
        email:'tamir@gmail.com',
        password:'passssword444d'
        }).expect(201);

    // Assert that the database was changed correctly
    const user =await  User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    //Assertion about the response
    expect(response.body).toMatchObject({
        user:{
            name: 'Tamir',
            email: 'tamir@gmail.com',
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe('passssword444d')

});

test('Should log in user', async () => {
    const response = await request(app).get('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    const user = await User.findById(response.body.user._id);

    //Assert the second token in response matches users second token

    expect(response.body).toMatchObject({
        token: user.tokens[1].token
    })


})

test('Should not log in nonexistent user', async () => {
    await request(app).get('/users/login').send({
        email: 'adad@gmail.com',
        password: userOne.password
    }).expect(400)
});

test('Should get Profile for user ', async () => {
    await request(app)
        .get('/users/me').set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
});

test('Should not get Profile for unauthenticated user ', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
});

test('Should not delete unauthenticated User', async ()=> {
    await request(app)
        .delete('/users/me')
        .expect(401)
});

test('Should delete authenticated User', async ()=> {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(201);

    const user = await User.findById(userOneId);
    expect(user).toBeNull()

});

test('Should upload users Avatar image', async ()=>{
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile.jpg')
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer))
});

test('Should update the users data', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({name:"dudu"})
        .expect(201 );

    const user = await User.findById(userOneId);
    expect(user.name).toBe('dudu')
});

test('Should not update unavailable fields of users data', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            Location: "Hod hasharon"
        })
        .expect(400);

});
