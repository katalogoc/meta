# Directory to store data in. This would be passed to `-v` flag.
mkdir -p /tmp/data

# Run Dgraph Zero (Dgraph master)
docker run -itd -p 5080:5080 -p 6080:6080 -p 8080:8080 -p 9080:9080 -p 8000:8000 -v /tmp/data:/dgraph --name diggy dgraph/dgraph dgraph zero

# Waiting until master is started
sleep 15

# Run Dgraph Alpha (Dgraph server)
docker exec -itd diggy dgraph alpha --lru_mb 2048 --zero localhost:5080

# Waiting until server is started
sleep 15

# Run Dgraph Ratel (Dgraph Playground UI)
docker exec -itd diggy dgraph-ratel