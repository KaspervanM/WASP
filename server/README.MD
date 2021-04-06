# WASP server

## Sample cURL requests
### GET 
`curl -X GET http://localhost:3000/task/1default-task-uuid-wasp-twelvecharss`

### POST
`curl -X POST -H "Content-Type: application/json" -d @samplereq.json http://localhost:3000/task` (add ` in front of @ if using PS)

### PUT
`curl -X PUT -H "Content-Type: application/json" -d @samplereq.json http://localhost:3000/task` (add ` in front of @ if using PS)

### DELETE
`curl -X DELETE http://localhost:3000/task/1default-task-uuid-wasp-twelvecharss`