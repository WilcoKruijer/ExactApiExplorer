run:
	deno run --unstable --no-check --allow-read=. --allow-write=. --allow-net=0.0.0.0,start.exactonline.nl --lock lock.json main.ts

migrate:
	deno run --unstable --allow-read=. --allow-write=. --allow-net=0.0.0.0,start.exactonline.nl,deno.land --lock lock.json main.ts --migrate=up

#  Reloads the dependencies, this is required when deps.ts is changed.
reload:
	deno run --unstable --allow-read=. --allow-write=. --allow-net=0.0.0.0,start.exactonline.nl --reload main.ts

#  Writes the dependencies to a lock file
lock:
	deno cache --unstable main.ts --lock lock.json --lock-write

fmt:
	deno fmt --ignore=out/

lint:
	deno lint --unstable

#  Testing without `--no-check` is slow since it has to check the migration files (dynamic imports)
test:
	deno test --unstable --allow-read=. --no-check

test_full:
	deno test --unstable --allow-read=. --allow-net=deno.land
