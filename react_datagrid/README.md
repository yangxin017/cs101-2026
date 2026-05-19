# HW5 React Datagrid

This project uses React, `useEffect`, and MUI DataGrid to fetch and show JSONPlaceholder data.

## Run

```bash
npm install
npm run dev
```

## Features

- Click `POST`, `USERS`, or `COMMENTS` to change the current API resource.
- `useEffect` calls `https://jsonplaceholder.typicode.com/{resource}` whenever the selected title changes.
- API data is rendered with `DataGrid` instead of a table.
