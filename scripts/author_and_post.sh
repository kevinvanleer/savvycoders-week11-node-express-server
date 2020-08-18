#!/bin/bash -x
HOST=localhost:8675
authorId=$(curl -s -X POST -H 'Content-Type: application/json' http://$HOST/authors -d '{"name": "Kevin Van Leer", "email": "kevin.vanleer@gmail.com"}' | jq .id)

curl -s -X POST -H 'Content-Type: application/json' http://$HOST/posts -d "{\"author_id\": ${authorId}, \"article_content\": \"Whatever your post is\", \"title\": \"The Blog Title\"}" > /dev/null
curl -s http://$HOST/posts | jq
curl -s http://$HOST/authors | jq
