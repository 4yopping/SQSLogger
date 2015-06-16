var should = require('chai').should(),
    expect = require('chai').expect,
    request = require('supertest'),
    sqsurl = 'https://sqs.us-east-1.amazonaws.com/079577709174/test',
    SQSLogger = require('../SQSLogger');

describe ('When you try to send a message with SQSLogger instance', function describeWhenYouTry() {
    var logger;
    before(function before(done){
        logger = new SQSLogger({QueueUrl:sqsurl});
        return done();
    });
    it ('if you pass an object with a toString function defined as a param in the sendMessage function should return a response object', function ifPassObjectItRespond(done) {
            var object = function(){
                this.message = "Hello Object";
                this.init = function(){
                  return this.message;
                }

                this.toString = function toString(){
                  return this.message + ' toString';
                }
            }

            logger.sendMessage(object,function callback(err, data){
                expect(err).to.be.a('null');
                data.ResponseMetadata.should.exist.and.be.a('object');
                data.ResponseMetadata.RequestId.should.be.a('string').and.exists;
                data.MD5OfMessageBody.should.exist.and.be.a('string');
                data.MessageId.should.exist.and.be.a('string');
                done();
            });
    });
});
