// new_code.js
// Refactored version of old_code.js using async/await and improved naming conventions

const fs = require('fs').promises;
const https = require('https');

/**
 * Fetch user data from remote API
 * @param {number} userId - The user ID to fetch
 * @returns {Promise<Object>} - User data object
 */
async function fetchUserDataAsync(userId) {
    return new Promise((resolve, reject) => {
        https.get(`https://jsonplaceholder.typicode.com/users/${userId}`, (res) => {
            let body = '';
            res.on('data', (chunk) => { body += chunk; });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    resolve({
                        id: parsed.id,
                        items: [
                            { name: `${parsed.name} A`, value: parsed.id * 3, active: true },
                            { name: `${parsed.name} B`, value: parsed.id * 2, active: false },
                            { name: `${parsed.name} C`, value: parsed.id * 5, active: true }
                        ]
                    });
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (e) => {
            reject(e);
        });
    });
}

/**
 * Process users from input file and write processed data to output file
 * @param {string} inputFilePath - Path to input JSON file
 * @param {string} outputFilePath - Path to output JSON file
 */
async function processUsersAsync(inputFilePath, outputFilePath) {
    try {
        // Read users from file
        const data = await fs.readFile(inputFilePath, 'utf8');
        const users = JSON.parse(data);
        const processedUsers = [];

        // Process each user sequentially
        for (const user of users) {
            try {
                const userData = await fetchUserDataAsync(user.id);
                // Filter active items
                const activeItems = userData.items.filter(item => item.active);
                // Transform items
                const transformedItems = activeItems.map(item => ({
                    name: item.name,
                    value: item.value * 2,
                    timestamp: Date.now()
                }));
                // Filter items with value > 10
                const finalItems = transformedItems.filter(item => item.value > 10);
                processedUsers.push({
                    id: user.id,
                    name: user.name,
                    data: finalItems
                });
            } catch (err) {
                // Skip user on error
                continue;
            }
        }
        // Write processed users to output file
        await fs.writeFile(outputFilePath, JSON.stringify(processedUsers, null, 2));
        console.log('Processing complete.');
    } catch (err) {
        console.error('Error processing users:', err);
    }
}

// Example usage
processUsersAsync('./users.json', './output.json');
