FROM klakegg/hugo:0.125.7-ext-alpine

WORKDIR /site
VOLUME /site

CMD ["server", "-D", "--bind", "0.0.0.0"]

