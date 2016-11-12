build:
	node build.js

deploy:
	git push && git push live

clean:
	rm -rf public

serve:
	pm2 start --name blog-server server.js

halt:
	pm2 stop blog-server

dev: serve
	node build --watch
