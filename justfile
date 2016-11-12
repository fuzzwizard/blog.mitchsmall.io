build:
	node build.js

deploy:
	git push && git push live

clean:
	rm -rf public

daemon:
	pm2 start --name blog-server server.js

halt:
	pm2 stop blog-server

dev-daemon:
	pm2 start nodemon --name dev-blog-server -- server.js

dev-halt:
	pm2 stop dev-blog-server

dev: dev-daemon
	node build --watch
