#!/bin/bash
set -ex

# Start server
bundle install
gem environment

# Start client
cd client
npm install
rake db:create
rake db:migrate
rake db:seed

bundle exec rails s -p 4000 -b '0.0.0.0' & disown
npm start & disown

while true; do sleep 1000; done

exec "$@"
