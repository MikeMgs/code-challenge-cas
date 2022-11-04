FROM ruby:3.1.2

# install dependencies
RUN apt update && apt install -y \
  build-essential libpq-dev ffmpeg \
  curl gnupg2 apt-utils default-libmysqlclient-dev git libcurl3-dev cmake \
  libssl-dev pkg-config openssl imagemagick file nodejs yarn npm

RUN mkdir /assignment
WORKDIR /assignment

# Adding gems
COPY Gemfile Gemfile

COPY . /assignment

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
