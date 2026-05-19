import { useEffect, useMemo, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Box, Button, CircularProgress, Container, Stack, Typography } from '@mui/material';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const resources = [
  { label: 'POST', value: 'posts' },
  { label: 'USERS', value: 'users' },
  { label: 'COMMENTS', value: 'comments' },
];

const columnMap = {
  posts: [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'userId', headerName: 'User ID', width: 100 },
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 220 },
    { field: 'body', headerName: 'Body', flex: 1.4, minWidth: 280 },
  ],
  users: [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'phone', headerName: 'Phone', width: 190 },
    { field: 'website', headerName: 'Website', width: 160 },
    { field: 'companyName', headerName: 'Company', width: 220 },
    { field: 'addressText', headerName: 'Address', flex: 1, minWidth: 280 },
  ],
  comments: [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'postId', headerName: 'Post ID', width: 100 },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 240 },
    { field: 'email', headerName: 'Email', width: 240 },
    { field: 'body', headerName: 'Body', flex: 1.4, minWidth: 320 },
  ],
};

function formatRows(resource, rows) {
  if (resource !== 'users') {
    return rows;
  }

  return rows.map((row) => ({
    ...row,
    companyName: row.company?.name ?? '',
    addressText: [
      row.address?.zipcode,
      row.address?.city,
      row.address?.street,
      row.address?.suite,
    ]
      .filter(Boolean)
      .join(', '),
  }));
}

function App() {
  const [title, setTitle] = useState('posts');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const changeTitle = (nextTitle) => () => {
    setTitle(nextTitle);
  };

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError('');

    fetch(`${API_BASE_URL}/${title}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return response.json();
      })
      .then((json) => {
        setRows(formatRows(title, json));
      })
      .catch((fetchError) => {
        if (fetchError.name !== 'AbortError') {
          setError('Failed to load data. Please try again later.');
          setRows([]);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [title]);

  const columns = useMemo(() => columnMap[title], [title]);
  const pageTitle = title.toUpperCase();

  return (
    <Container maxWidth="xl" className="app-shell">
      <Stack className="toolbar" direction="row" spacing={2} justifyContent="center">
        {resources.map((resource) => (
          <Button
            key={resource.value}
            variant={title === resource.value ? 'contained' : 'outlined'}
            onClick={changeTitle(resource.value)}
          >
            {resource.label}
          </Button>
        ))}
      </Stack>

      <Box className="table-header">
        <Typography component="h1" variant="h4">
          {pageTitle}
        </Typography>
        {loading && <CircularProgress size={24} />}
      </Box>

      {error && (
        <Alert severity="error" className="error-message">
          {error}
        </Alert>
      )}

      <Box className="grid-wrapper">
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
}

export default App;
