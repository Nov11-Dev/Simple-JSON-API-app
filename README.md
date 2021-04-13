# Instruction for running
1) Installing lastest version of node and npm (install npm)
2) To confirm, type 2 lines below into cmd:
    npm -v
    node -v
3) Install node-fetch
    npm install node-fetch
4) To start
    node index.js

5) ROUTE 1:
    localhost:3000/api/ping

6) ROUTE 2 (Correct querry + parameters):
    localhost:3000/api/posts/tech
    localhost:3000/api/posts/tech,history
    localhost:3000/api/posts/tech/likes
    localhost:3000/api/posts/tech/likes/desc
    localhost:3000/api/posts/tech,history/likes/desc
    localhost:3000/api/posts/tech,history/id/desc
