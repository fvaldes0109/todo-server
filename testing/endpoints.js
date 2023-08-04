const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect
const baseUrl = "http://localhost:3000";
const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NGNjMmU2NjVjNjNkZWU4MWQ0NWRjMjUiLCJpYXQiOjE2OTExMDI4MjJ9.FOsbimNbt7ntLnZMn28o_ItcQG4eadxIiqhKX5FOLbE';
const userid = '64cc2e665c63dee81d45dc25';

chai.use(chaiHttp);
describe("TODO API", function(){
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

    it('Create new tasks', function(done) {
        tasks.forEach(task => {
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
                    expect(res.body.task.user).equal('64cc2e665c63dee81d45dc25');
                });
        });
        done();
    });
});