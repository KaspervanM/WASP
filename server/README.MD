# WASP server

## Sample cURL requests

### GET

#### List tasks

`curl -X GET http://localhost:3000/task`

#### One task

`curl -X GET http://localhost:3000/task/123e4567-e89b-12d3-a456-426614174000`

### POST

`curl -X POST -H "Content-Type: application/json" -d @samplereq.json http://localhost:3000/task` (add ` in front of @ if using PS)

### PUT

`curl -X PUT -H "Content-Type: application/json" -d @samplereq.json http://localhost:3000/task` (add ` in front of @ if using PS)

### DELETE

`curl -X DELETE http://localhost:3000/task/123e4567-e89b-12d3-a456-426614174000`
