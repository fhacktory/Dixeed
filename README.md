# Dixeed
Who has never dreamed of an __IRL MMO Rocket League__ game?! Well, we did it! We built some cute little robots that fight each other for the ball to win the game.

![BB8's picture](http://soncadeauoriginal.com/wp-content/uploads/2015/10/bb8-star-wars.jpg)

Even better than BB8! \**cough*\*

The matches are streamed on __Twitch.tv__ and the people control the robots from a web interface. Everyone can send a command to the robot but it may not be yours that will actually be executed. You'd better be __spamming__ your mouse/keyboard to earn it!

## Play it!
![Just do it](http://i.imgur.com/KVaFuwy.gif)

Access [http://192.168.1.136:9000/#/](http://192.168.1.136:9000/#/) in your browser and get on it!


## The magic behind the veil
It just works!

![it is magic meme](http://www.reactiongifs.com/r/mgc.gif)

The project is composed of 2 web servers. One is running directly on the robot and the other one is running on a local machine. The latter receives requests from an AngularJS 1.x client with the users' commands. Once it chose the command to run on the robot, it actually contacts the server on it. This server uses the NodeJS ev3 API.

The server chooses the red team commands from the pool selected by the team members using a rand algorithm. Regarding the blue team, the command is chosen with a "democratic" algorithm. The command having the most vote will be the one sent to the robot.
