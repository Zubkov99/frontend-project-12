start-frontend:
	make -C frontend start

start-backend:
	 npx start-server

start:
	make start-backend & make start-frontend

lint-frontend:
	make -C frontend lint

lint:
	npx eslint --ext js,jsx --no-eslintrc --config .eslintrc.yml . --fix
