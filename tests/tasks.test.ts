const chai = require('chai');

const expect = chai.expect;
const url = `http://localhost:9000/`;
const request = require('supertest')(url);

// global array of list of things to clear at the end
let list_of_ids_to_clear = []
describe('GraphQL', () => {
    it('Creates two tasks', (done) => {
        request.post('graphql')
        .send({query: 'mutation { addTask(name: "finish koa testing", category: "discord", priority: "high") { id name start_date end_date category priority } }'})
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err);
            // assume there are a 100 users in the database
            console.log(res.body)
            const data_obj = res.body.data.addTask
            list_of_ids_to_clear.push(data_obj.id)
            list_of_ids_to_clear[0] = res.body.data.addTask.id
            // res.body.text.should.have.property('id');
            // res.body.text.should.have.property('name');
            // res.body.text.should.have.property('discord');
            // res.body.text.should.have.property('priority');
            done();
        })  
    })

    it('Updating task of interest', (done) => {
        console.log(list_of_ids_to_clear)
        request.post('graphql')
        .send({ query: ` mutation { updateTask( id: "${list_of_ids_to_clear[0]}", name: "TEST ARTIFACT", start_date: "2019-06-03" , end_date: "2019-06-04", category: "graphql", priority: "high") { name, start_date end_date, category, priority } }`})
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err);
            // assume there are a 100 users in the database
            console.log(res.body)
            done();
        })  
    })
    it('Removing task of interest', (done) => {
        request.post('graphql')
        .send({ query: ` mutation { removeTask(id: "${list_of_ids_to_clear[0]}") { id name start_date end_date category priority } }`})
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err);
            // assume there are a 100 users in the database
            console.log(res.body)
            done();
        })  
    })
    it('Getting all tasks', (done) => {
        // console.log(done)
        request.post('graphql')
        .send({ query: '{ queryAllTasks { name, id, start_date, end_date, category, priority } }'})
        .expect(200)
        .end((err,res) => {
            // res will contain array with one user
            if (err) return done(err);
            let todo_arr = res.body.data.queryAllTasks
            // console.log(todo_arr)
            // res.body.text.should.have.property('id')
            // res.body.text.should.have.property('name')
            // res.body.text.should.have.property('start_date')
            // res.body.text.should.have.property('end_date')
            done();
        })
    })
});