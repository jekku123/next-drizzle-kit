echo "Starting the docker containers.."
docker compose up --build -d
echo "Containers started!\n"

echo "Waiting for the database to start..\n"
sleep 5

echo "Generating migrations.."
npm run generate
echo "Drizzle schema generated!\n"

echo "Migrating migrations to the database.."
npm run migrate
echo "Migrations migrated!\n"

echo "************************************"
echo "* All good! App is up and running! *"
echo "*   -> http://localhost:3000/ <-   *"
echo "************************************"
