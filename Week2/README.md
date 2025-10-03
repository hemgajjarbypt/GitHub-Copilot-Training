# Legacy User Data Processor

This script reads user data from a JSON file, fetches extra details for each user from an external API, processes the data, and writes the results to an output file.

## Features

- Reads users from a local JSON file
- Fetches additional user data from an API
- Filters and transforms items:
  - Only includes active items
  - Doubles the value of each item
  - Adds a timestamp
  - Keeps items with value greater than 10
- Writes processed data to an output file
- Handles errors gracefully

## Usage

1. Prepare a `users.json` file with user objects (each with an `id` and `name`).
2. Run the script in your terminal:

   ```bash
   node old_code.js
   ```

3. The processed data will be saved to `output.json`.

## Requirements

- Node.js

## Example

Input (`users.json`):

```json
[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" }
]
```

Output (`output.json`):

```json
[
  {
    "id": 1,
    "name": "Alice",
    "data": [
      { "name": "Alice A", "value": 6, "timestamp": 1720700000000 },
      { "name": "Alice C", "value": 10, "timestamp": 1720700000000 }
    ]
  },
  ...
]
```

## Error Handling

Any errors during reading, fetching, or writing are logged to the console.