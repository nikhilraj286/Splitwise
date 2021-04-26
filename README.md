# Splitwise Clone using MERN Stack

### Technologies used:
    #### 1. Kafka (for middleware)
    #### 2. JWT, Passport for Authentication
    #### 3. AWS for hosting ang image store
    #### 4. Mocha for backed testing
    #### 5. React testing library

## Steps for deployment

### Frontend and Backend

1. Open a seperate terminal in that folder.
2. Run npm install
3. Run npm start

### Kafka Backend

Start Zookeeper and Kafka with following Commands

- zookeeper-server-start /usr/local/etc/kafka/zookeeper.properties

- kafka-server-start /usr/local/etc/kafka/server.properties

Create Kafka Topics

- kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic userAuth
- kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic JWTauth
- kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic group
- kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic user
- kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic expense
- kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic  transaction
- kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic

1. Open a seperate terminal in that folder.
2. Run npm install
3. Run npm start

