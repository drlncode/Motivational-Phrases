# Motivational phrases generator.

<div align='center'>
    <img src='https://images2.imgbox.com/58/e5/0MgQFSov_o.png' width='100%'>
</div>

# Instalation

### 1. Clone or fork the repo:

```bash
git clone https://github.com/drlncode/Motivational-Phrases
```

### 2. Enter the project

```bash
cd Motivational-Phrases
```

### 3. Install the dependencies 

```bash
npm install or pnpm install
```

# Usage

### 1. Run the next command:

```bash
npm run dev
```

- After that, enter to: _http://localhost:3000._

# API 

- The API is a very simple API-JSON that only consists of one endpoint, which is:
```bash
https://motivational-phrases-demo.vercel.app/phrases
```

### 1. Make a request to the API.

- To make a request to the API and then consume it, do the following:

```javascript
const URL = 'https://https://motivational-phrases-demo.vercel.app/phrases';

fetch(URL)
    .then(response => response.json())
    .then(json => {
        // Whatever you're going to do to consume it.
    })
    .catch(err => console.error);
```

# Contribute

- Feel free to make any contribution to the project, whether it's adding a feature to the project or adding phrases to the json in ``app/data/phrases.json``. Everything is welcome.
