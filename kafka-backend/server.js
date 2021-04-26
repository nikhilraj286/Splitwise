var connection = new require('./kafka/connection');
require('./db/Mongo')
const userAuth = require('./services/userAuth')
const jwtAuth = require('./services/jwtAuth')
const group = require('./services/group')
const user = require('./services/user')
const expense = require('./services/expense')
const transaction = require('./services/transaction')


function handleTopicRequest(topic_name, fname) {
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('Kafka Server is running ');
    consumer.on('message', function (message) {
        console.log('Message received for ' + topic_name);
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });

    });
}

handleTopicRequest("userAuth", userAuth);
handleTopicRequest("JWTauth", jwtAuth)
handleTopicRequest("group", group)
handleTopicRequest("user", user)
handleTopicRequest("expense", expense)
handleTopicRequest("transaction", transaction)