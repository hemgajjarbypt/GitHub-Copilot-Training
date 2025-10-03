const fs = require('fs');
const https = require('https');

function processUsersOldStyle(filePath, outputPath) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filePath, 'utf8', function(err, data) {
            if (err) {
                reject(err);
            } else {
                let users;
                try {
                    users = JSON.parse(data);
                } catch (e) {
                    reject(e);
                    return;
                }
                let processedUsers = [];
                let index = 0;

                function processNext() {
                    if (index >= users.length) {
                        fs.writeFile(outputPath, JSON.stringify(processedUsers), function(err) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve("Done");
                            }
                        });
                        return;
                    }
                    let user = users[index];
                    fetchUserData(user.id)
                        .then(function(userData) {
                            let filteredData = [];
                            for (let i = 0; i < userData.items.length; i++) {
                                if (userData.items[i].active) {
                                    filteredData.push(userData.items[i]);
                                }
                            }
                            let transformed = filteredData.map(function(item) {
                                return {
                                    name: item.name,
                                    value: item.value * 2,
                                    timestamp: new Date().getTime()
                                };
                            });
                            let finalData = [];
                            for (let i = 0; i < transformed.length; i++) {
                                if (transformed[i].value > 10) {
                                    finalData.push(transformed[i]);
                                }
                            }
                            processedUsers.push({
                                id: user.id,
                                name: user.name,
                                data: finalData
                            });
                            index++;
                            processNext();
                        })
                        .catch(function(err) {
                            index++;
                            processNext();
                        });
                }

                processNext();
            }
        });
    });
}

function fetchUserData(userId) {
    return new Promise(function(resolve, reject) {
        https.get('https://jsonplaceholder.typicode.com/users/' + userId, function(res) {
            let body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                try {
                    let parsed = JSON.parse(body);
                    resolve({
                        id: parsed.id,
                        items: [
                            { name: parsed.name + ' A', value: parsed.id * 3, active: true },
                            { name: parsed.name + ' B', value: parsed.id * 2, active: false },
                            { name: parsed.name + ' C', value: parsed.id * 5, active: true }
                        ]
                    });
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', function(e) {
            reject(e);
        });
    });
}

// Example usage
processUsersOldStyle('./users.json', './output.json')
    .then(function(msg) {
        console.log(msg);
    })
    .catch(function(err) {
        console.error(err);
    });
