var colors = require('colors'),
    AWS = require('aws-sdk'),
    EventEmitter = require('events').EventEmitter,
    inherits = require('util').inherits;

//Main function of the module
function SQSLogger(config){
    //Checking if config exist and prevent errors if don't.
    config = config || {};
    //Checking if QueueUrl exists, if doesn't an errors throws and stop the execution
    if(config.QueueUrl == null){
        var e = new Error('queueURL'.yellow + ' must be defined in the config');
        throw e;
        return e;
    } else {
        this.queueURL = config.QueueUrl;
    }
    //Setting all variables
    this.apiVersion = config.apiVersion || 'latest';
    this.region = config.region || 'us-east-1';
    this.delay = config.delaySeconds || 0;
    this.verbose = config.verbose || false;
    if(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
        AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});
    }
    this.SQS = new AWS.SQS({apiVersion: this.apiVersion,region:this.region});

    if(this.verbose) console.log('Creating Logger');
    if(this.verbose) console.log('QueuUrl'.green,this.queueURL);
    if(this.verbose) console.log('region'.green,this.region);
    if(this.verbose) console.log('delaySeconds'.green,this.delay);
    if(this.verbose) console.log('verbose'.green,this.verbose);

    //Setting the default params to use on every Message
    this.gparams = {
        MessageBody: '',
        QueueUrl: this.queueURL,
        DelaySeconds: 0
    };

    //sendMessage function
    //Send a message to the Queue
    //Accepts a message string and a funcion callback
    this.sendMessage = function sendMessage(message,callback){
        if(typeof message !== 'string' && typeof message !== 'function'){
            var e = new Error('bad message');
            throw e;
            return e;
        }
        var params = Object.create(this.gparams);
        params.MessageBody = message.toString();
        if(this.verbose) console.info('Sending Message',message);

        this.SQS.sendMessage(params, function SQSSendMessage(err, data) {
            //if there is an error emits it
            if(err) {
                if(this.verbose) console.error('There was an error'.red,err);

                return this.emit('error',err);
            }

            //if the message was sent succesfully emits the sent with the data
            if(this.verbose) console.log('Message succesfully sent'.green);

            this.emit('sent',data);
            if(callback)callback(data,this);
            return;
        }.bind(this));
    }
}
//Inerits forom the EventEmitter
inherits(SQSLogger,EventEmitter);

module.exports = SQSLogger;
