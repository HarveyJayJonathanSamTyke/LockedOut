const request = require('supertest');
const express = require('express');


const app = express();
const server = 'http://localhost:3000';




describe('Route integration', () =>{
  // since we are using an api router
    describe ('GET', () => {
      it('responds with 200 status and json content', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /json/)
          .expect(200)
      });
    });

    describe('/', () => {
      describe ('GET /', () => {
        it('responds with 200 status and json content', () => {
          return request(app)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(404)
        });
      });
    });

    // describe('POST /addEntry', () => {
    //   it('responds with 200 status and application/json content type', () => {
    //     return request(app)
    //       .post('/addEntry')
    //       .expect('Content-Type', /json/)
    //       .expect(200)
    //       //  /text\/html/)
  
    //   })
    // });

    // describe('POST /addEntry', () => {
    //   it('responds with 200 status and application/json content type', () => {
    //     return request(server)
    //       .post('/addEntry')
    //       .expect('Content-Type', /text\/html/)
    //       .expect(200)
    //       //  /text\/html/)
  
    //   })
    // });

  // describe('POST /api', () => {
  //   describe('given a url/username/userID,password', () => {
  //     test('should respond with 200 status code', () => {
  //       const async response = await request(app).post('/addEntry').send({
  //         urlEntry: 'netflix.com',
  //         userName: 'blahblah',
  //         userID: 'tyke',
  //         passwordEntry: 'zooooo',
  //       })
  //       .expect(response.statusCode).toBe(200)
  //     })
  //   })
  // })
  
  
  // describe('/getAllEntries')
  
  
  // describe('/updateEntry')
  
  
  // describe('/deleteEntry')
  
  
  
});

// describe('/login')


// describe('/signup')
