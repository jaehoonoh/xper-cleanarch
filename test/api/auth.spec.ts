import {app} from '../../src/layer/app';

const request = require('supertest');

function login(username: string, incorrectPassword: string) {
    let requestLogin = request(app)
        .post('/login')
        .send({username: username, password: incorrectPassword});
    return requestLogin;
}

describe('Authentication', function() {
    it('a user should not be loggied in when there is no user account', function() {
        let username = 'NOT_REGISTERED_USER';

        request(app)
            .post('/login')
            .send({username: username, password: 'pw'})
            .expect(404,
                { message: 'Not Registered : ' + username })
            .end(function (err,res) { if ( err ) throw err; });
    });

    it('a user can login when the user has an account', function() {
        let username = 'registeredUser';
        let password = 'pw';

        register_new_User_With(username, password);

        let requestLogin;
        requestLogin = request(app)
            .post('/login')
            .send({username: username, password: password});

        requestLogin.expect(200, { message: 'Succeed' })
            .end(function (err,res) { if ( err ) throw err; });
    });

    let BAD_REQUEST = 400;
    let incorrectPasswordMessage = 'Incorrect Password';
    let username = 'registeredUser';
    let password = 'pw';


    it('login should fail for incorrect password', function() {
        // Arrange
        register_new_User_With(username, password);

        // Act
        let requestLogin = login(username, "IncorrectPassword");

        // Assert
        requestLogin.expect(BAD_REQUEST, {message: incorrectPasswordMessage})
            .end(function (err, res) {
                if (err) throw err;
            });
    });

    // 의도가 한 눈에 안 들어온다. .... 팀 동료, 미래의 내가, 나중에 코드를 해독을 해야 한다.
    function register_new_User_With(username: string, password: string) {
        request(app)
            .post('/users')
            .send({username: username, password: password, confirmPassword: password})
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
            });
    }
});
