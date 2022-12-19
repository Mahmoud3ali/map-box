Hello there, Hope you're having a nice day! :)

At your root folder, you can see a `.env` file, while you might not expect that
I've committed the `.env` file to make it easier to run the project with one command instead or usually using the `.env.sample`.

So, in order to do so. You'll need to have docker installed on your machine.

In case you have any of these ports used (3000, 6060, 8080, 27017) please try to free it before running next command

After that just simply run `docker-compose up`

After this is done, you'll have 3 docker images running on your machine

1. mongodb -> the db we use
   - port 6060 is exposed for you to hook your local mongoDB compass if you want to have a look on the DB records
1. server -> node + express server we're using
   - working on port 8080
1. map-box -> client side of the application
   - you can use that on port 3000
   - or simply click here [map-box](http://localhost:3000/login)
