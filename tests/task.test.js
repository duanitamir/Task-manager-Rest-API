const request = require('supertest');
const Task = require('../src/models/task');
const {userOneId, userOne, setupDatabase,taskOne, taskTwo, taskThree, userTwoId, userTwo,} = require('./fixtures/db');
const app = require('../src/app');

beforeEach(setupDatabase);


test('Should create task for user', async ()=>{
    const response = await request(app)
        .post('/tasks')
        .set('Authorization' , `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my Test'
        }).expect(201);

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false)
});

test('Should request all tasks belong to this user',async () =>{
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200);
    console.log(response.body.length);

    const tasks = await response.body;
    expect(tasks.length).toBe(2)
});


test('User should not be able to delete other users Tasks', async ()=>{
    console.log('user id from test  ',userOneId);
    const response = await request(app)
        .delete(`/tasks/${taskThree._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(404);

    const task = Task.findById(taskOne._id);

});