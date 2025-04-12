FROM klakegg/hugo:ext-alpine

WORKDIR /site
VOLUME /site

CMD ["server", "-D", "--bind", "0.0.0.0"]
