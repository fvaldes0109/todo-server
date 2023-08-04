const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect
const baseUrl = "http://localhost:3000";
const email = 'newemail@email.com';
const password = '1234567';
let jwt = '';
let userid = '';


chai.use(chaiHttp);
describe("TODO API", function(){

    it('Create new user', function(done) {
        chai.request(baseUrl)
            .post('/api/users')
            .send({
                email,
                password,
            })
            .end(function(err, res) {
                if (res.status == 200) {
                    expect(res.body).to.have.property('token');
                    expect(res.body).to.have.property('user');
                    expect(res.body.user).to.have.property('id');
                    expect(res.body.user).to.have.property('email');
                }
                else {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('msg');
                    expect(res.body.msg).equal(`Email ${email} already exists`);
                }
                done();
            });
    });

    it('Login', function(done) {
        chai.request(baseUrl)
            .post('/api/auth/login')
            .send({
                email,
                password,
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                expect(res.body).to.have.property('user');
                expect(res.body.user).to.have.property('id');
                expect(res.body.user).to.have.property('email');
                jwt = res.body.token;
                userid = res.body.user.id;
                done();
            });
    });

    it('Delete all tasks', function(done) {
        chai.request(baseUrl)
            .delete('/api/tasks')
            .set('todo-token', jwt)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('result');
                expect(res.body.result).to.have.property('acknowledged');
                expect(res.body.result).to.have.property('deletedCount');
                expect(res.body.result.acknowledged).equal(true);
                done();
            });
    });

    it('Check if empty', function(done) {
        chai.request(baseUrl)
            .get('/api/tasks')
            .set('todo-token', jwt)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('total');
                expect(res.body).to.have.property('tasks');
                expect(res.body.total).equal(0);
                expect(res.body.tasks).to.be.an('array');
                expect(res.body.tasks).to.have.lengthOf(0);
                done();
            });
    });

    let tasks = [
        {
            title: 'Task 1',
            description: 'Description of task 1',
            status: 'COMPLETED',
            priority: 'Medium',
        },
        {
            title: 'Task 2',
            description: 'Description of task 2',
            status: 'PENDING',
            priority: 'Low',
        },
        {
            title: 'Task 3',
            description: 'Description of task 3',
            status: 'PENDING',
            priority: 'High',
        },
        {
            title: 'Task 4',
            description: 'Description of task 4',
            status: 'PENDING',
            priority: 'Medium',
        },
    ];

    let toChangeID;

    tasks.forEach((task, index) => {
    it(`Create new tasks - ${index + 1}`, function(done) {
            chai.request(baseUrl)
                .post('/api/tasks')
                .set('todo-token', jwt)
                .send(task)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('task');
                    expect(res.body.task).to.have.property('id');
                    expect(res.body.task).to.have.property('title');
                    expect(res.body.task).to.have.property('description');
                    expect(res.body.task).to.have.property('status');
                    expect(res.body.task).to.have.property('priority');
                    expect(res.body.task).to.have.property('user');
                    expect(res.body.task.title).equal(task.title);
                    expect(res.body.task.description).equal(task.description);
                    expect(res.body.task.status).equal(task.status);
                    expect(res.body.task.priority).equal(task.priority);
                    expect(res.body.task.user).equal(userid);
                    if (task.title == 'Task 1') toChangeID = res.body.task.id;
                    done();
                });
        });
    });
    
    it('Get Tasks', function(done) {
        chai.request(baseUrl)
            .get('/api/tasks')
            .set('todo-token', jwt)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('total');
                expect(res.body).to.have.property('tasks');
                expect(res.body.tasks).to.be.an('array');
                expect(res.body.tasks).to.have.lengthOf(4);
                res.body.tasks.forEach(task => {
                    expect(task).to.have.property('id');
                    expect(task).to.have.property('title');
                    expect(task).to.have.property('description');
                    expect(task).to.have.property('status');
                    expect(task).to.have.property('priority');
                    expect(task).to.have.property('user');
                    expect(task.user).equal(userid);
                });
                done();
            });
    });

    it('Get Tasks - Orders(Desc)', function(done) {
        chai.request(baseUrl)
            .get('/api/tasks?order=desc')
            .set('todo-token', jwt)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('total');
                expect(res.body).to.have.property('tasks');
                expect(res.body.tasks).to.be.an('array');
                expect(res.body.tasks).to.have.lengthOf(4);
                expect(res.body.tasks[0].priority).equal('High');
                expect(res.body.tasks[1].priority).equal('Medium');
                expect(res.body.tasks[2].priority).equal('Medium');
                expect(res.body.tasks[3].priority).equal('Low');
                done();
            });
    });

    it('Get Tasks - Orders(Asc)', function(done) {
        chai.request(baseUrl)
            .get('/api/tasks?order=asc')
            .set('todo-token', jwt)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('total');
                expect(res.body).to.have.property('tasks');
                expect(res.body.tasks).to.be.an('array');
                expect(res.body.tasks).to.have.lengthOf(4);
                expect(res.body.tasks[0].priority).equal('Low');
                expect(res.body.tasks[1].priority).equal('Medium');
                expect(res.body.tasks[2].priority).equal('Medium');
                expect(res.body.tasks[3].priority).equal('High');
                done();
            });
    });


    it('Get Tasks - Status(PENDING)', function(done) {
        chai.request(baseUrl)
            .get('/api/tasks?status=PENDING')
            .set('todo-token', jwt)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('total');
                expect(res.body).to.have.property('tasks');
                expect(res.body.tasks).to.be.an('array');
                expect(res.body.tasks).to.have.lengthOf(3);
                res.body.tasks.forEach(task => {
                    expect(task.status).equal('PENDING');
                });
                done();
            });
    });

    it('Get Tasks - Status(COMPLETED)', function(done) {
        chai.request(baseUrl)
            .get('/api/tasks?status=COMPLETED')
            .set('todo-token', jwt)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('total');
                expect(res.body).to.have.property('tasks');
                expect(res.body.tasks).to.be.an('array');
                expect(res.body.tasks).to.have.lengthOf(1);
                res.body.tasks.forEach(task => {
                    expect(task.status).equal('COMPLETED');
                });
                done();
            });
    });

    let newTask = {
        title: 'Task 0',
        description: 'Description of task 0',
        status: 'PENDING',
        priority: 'High',
    }

    it('Update Task', function(done) {
        chai.request(baseUrl)
            .put(`/api/tasks/${toChangeID}`)
            .set('todo-token', jwt)
            .send(newTask)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('task');
                expect(res.body.task).to.have.property('id');
                expect(res.body.task).to.have.property('title');
                expect(res.body.task).to.have.property('description');
                expect(res.body.task).to.have.property('status');
                expect(res.body.task).to.have.property('priority');
                expect(res.body.task).to.have.property('user');
                expect(res.body.task.title).equal(newTask.title);
                expect(res.body.task.description).equal(newTask.description);
                expect(res.body.task.status).equal(newTask.status);
                expect(res.body.task.priority).equal(newTask.priority);
                expect(res.body.task.user).equal(userid);
                done();
            });
    });

    it('Delete Task', function(done) {
        chai.request(baseUrl)
            .delete(`/api/tasks/${toChangeID}`)
            .set('todo-token', jwt)
            .send(newTask)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('result');
                expect(res.body.result).to.have.property('acknowledged');
                expect(res.body.result).to.have.property('deletedCount');
                expect(res.body.result.acknowledged).equal(true);
                expect(res.body.result.deletedCount).equal(1);
                done();
            });
    });
});