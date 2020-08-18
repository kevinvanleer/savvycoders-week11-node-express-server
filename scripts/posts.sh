#!/bin/bash

curl -s -X POST -H 'Content-Type: application/json' https://kvl-savvycoders-week11.herokuapp.com/posts -d '{"article_content": "Whatever your post is", "title": "The Blog Title"}' > /dev/null
curl -s https://kvl-savvycoders-week11.herokuapp.com/posts | jq
