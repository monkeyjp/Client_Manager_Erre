import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Button } from "@mui/material";

export const Clients = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { store, actions } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedFilterOption, setSelectedFilterOption] = useState("");
  const navigate = useNavigate();

  const data = store.clients;

  const columns = [
    { id: "firstName", label: "First Name", minWidth: 170 },
    { id: "lastName", label: "Last Name", minWidth: 170 },
    { id: "company", label: "Company", minWidth: 170 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "actions", label: "Actions", minWidth: 100 },
  ];

  const onPageChange = (event, newPage) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const onFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    const options = [...new Set(data.map((client) => client[selectedFilter]))];
    setFilterOptions(options);
    setSelectedFilterOption("");
  };

  const search = (client) => {
    if (searchTerm) {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return `${client.firstName} ${client.lastName}`
        .toLowerCase()
        .includes(searchTermLowerCase);
    }
    return true;
  };

  const handleEdit = (id) => {
    navigate(`/editClient/${id}`);
  };

  const filteredData = data.filter(search).filter((client) => {
    if (!selectedFilterOption) {
      return true;
    }
    return client[filter] == selectedFilterOption;
  });

  const onDelete = (id) => {
    actions.deleteClientById(id);
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/addClient");
          }}
        >
          Add New Client
        </Button>
      </div>
      <Paper sx={{ overflow: "hidden" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              sx={{ marginTop: "8px" }}
              label="Search"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginBottom: "20px" }}
              id="Search"
              name="Search"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Filter"
              variant="outlined"
              fullWidth
              value={filter}
              onChange={onFilterChange}
              style={{ marginBottom: "20px", textAlign: "left" }}
              id="Filter"
              name="Filter"
            >
              <MenuItem value="">None</MenuItem>
              {columns.map((column) => (
                <MenuItem key={column.id} value={column.id}>
                  {column.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Options"
              variant="outlined"
              fullWidth
              value={selectedFilterOption}
              onChange={(e) => setSelectedFilterOption(e.target.value)}
              style={{ marginBottom: "20px", textAlign: "left" }}
              id="Options"
              name="Options"
              disabled={!filter || filterOptions.length === 0}
            >
              {filterOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <TableContainer sx={{ maxHeight: "calc(100vh - 400px)" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "actions" ? (
                              <>
                                <IconButton
                                  aria-label="edit"
                                  onClick={() => handleEdit(row.id)}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => onDelete(row.id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </>
                            ) : (
                              <div onClick={() => handleEdit(row.id)}>
                                {value}
                              </div>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </Paper>
    </>
  );
};
