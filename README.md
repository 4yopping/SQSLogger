# SQSLogger

A simple Logger using AWS SQS Service

[![Join the chat at https://gitter.im/4yopping/SQSLogger](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/4yopping/SQSLogger?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![npm version](https://badge.fury.io/js/sqs-logger.svg)](http://badge.fury.io/js/sqs-logger)
[![Build Status](https://travis-ci.org/4yopping/SQSLogger.svg)](https://travis-ci.org/4yopping/SQSLogger)
[![Inline docs](http://inch-ci.org/github/4yopping/SQSLogger.svg?branch=master)](http://inch-ci.org/github/4yopping/SQSLogger)
![Dependencies](https://david-dm.org/4yopping/SQSLogger.svg)

##Instalation

````
npm install sqs-logger --save

````

##Test

````
npm test
````

## Usage

### Setting AWS Credentials

You can use the same authentication methods of [AWS NodeJS SDK](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html)

I certainly recommend to use Credentials from Environment Variables for QA and Staging enviroments and the SDK profiles for local development. 

The environment credentials are __AWS_ACCESS_KEY_ID__ and __process.env.AWS_SECRET_ACCESS_KEY__

Furthermore, you can load a config file using the config loadFromPath function for Production environments:

`````
AWS.config.loadFromPath('./config.json')
````

Even though, if you want to hardcode your credentials (Not recommended at all) you can set them using the config update function:

````AWS.config.update({accessKeyId: 'akid', secretAccessKey: 'secret'});````

Create the SQSLogger instance
````
var SQSLogger = require('SQSLogger');
````

Put your Queue URL in the QueueUrl option and pass it to the constructor
````
var logger = new SQSLogger({QueueUrl: 'https://sqs.us-east-1.amazonaws.com/00000000000/test'});
````

### Events

Use the **sent** event to receive a response when the log was queued
````
logger.on('sent',function(data){
  dataIsTheAWSResponse(data);  
});

````
Use the **error** event if you want to catch AWS errors
````
logger.on('error',function(err){
  console.error(err);
});
````

### Send messages

Send a **message**
````
logger.sendMessage('Amazing Message');
````

### Callback

You can use a **callback** too
````
logger.sendMessage('Mocha Test',function callback(data){
  dataIsTheAWSResponse(data);
});
````


##Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.


##Licence

The MIT License (MIT)

Copyright (c) 2015 Andrés González Aragón, 4yopping and all the related trademarks

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
