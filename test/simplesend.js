var should = require('chai').should(),
    expect = require('chai').expect,
    request = require('supertest'),
    sqsurl = 'https://sqs.us-east-1.amazonaws.com/079577709174/test',
    SQSLogger = require('../SQSLogger');

describe ('When you try to create a SQSLogger instance', function () {
    it ('if you don\'t set a config should throw an error', function (done) {
        expect(SQSLogger).to.throw(Error);
        done();
    });
    it ('if you set a config should not throw any errors', function (done) {
        var fn = function fn(){
            var logger = new SQSLogger({QueueUrl:sqsurl});
        };
        expect(fn).to.not.throw(Error);
        done();
    });
});
describe ('When you try to send a message with SQSLogger instance', function () {
    var logger;
    before(function before(done){
        logger = new SQSLogger({QueueUrl:sqsurl});
        return done();
    });
    it ('if you pass an empty string in the message should throw an error', function (done) {
        var fn = function fn(){
            logger.sendMessage('');
        };
        expect(fn).to.throw(Error);
        done();
    });
    it ('if you pass no params in the message should throw an error', function (done) {    
        var fn = function fn(){
            logger.sendMessage();
        };
        expect(fn).to.throw(Error);
        done();
    });
    it ('if you pass an non-empty string in the message should receive a well formed object', function (done) {
        logger.sendMessage('Mocha Test',function callback(err, data){
            expect(err).to.be.a('null');
            data.ResponseMetadata.should.exist.and.be.a('object');
            data.ResponseMetadata.RequestId.should.be.a('string').and.exists;
            data.MD5OfMessageBody.should.exist.and.be.a('string');
            data.MessageId.should.exist.and.be.a('string');
            done();

        });
    });
    it ('if you use a wrong QueueUrl in the config should emit the error event', function (done) {
        var l = new SQSLogger({QueueUrl:'http://www.quantium.com.mx'});
        l.on('error',function error(err){
            done();
        });
        l.sendMessage('Mocha Test');
    });
});
