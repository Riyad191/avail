import * as React from "react";
import {
  TextField,
  Box,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";

const FormComponent = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          // margin: "10px 0",
          // border: "solid #DCDCDC 1px",
          // width: "80%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "9px 0",
          justifyContent: "space-between",
          // boxShadow:
          // "inset 0px 2px 8px 2px rgb(236, 236, 236),  inset 0px -11px 8px -10px rgb(236, 236, 236)",
          borderRadius: 2,
        }}
      >
        <Box>
          <TextField
            sx={{ width: 260, mr: 3, bgcolor: "#FFF" }}
            id="outlined-basic"
            label="Outlined"
            placeholder="Search"
            variant="outlined"
            size="small"
          />
          <TextField
            sx={{ width: 260, mr: 3, bgcolor: "#FFF" }}
            id="outlined-basic"
            label="Outlined"
            placeholder="Search"
            variant="outlined"
            size="small"
          />
          <TextField
            sx={{ width: 260, mr: 3, bgcolor: "#FFF" }}
            id="outlined-basic"
            label="Outlined"
            placeholder="Search"
            variant="outlined"
            size="small"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormControl
            sx={{ minWidth: 120, ml: 4, bgcolor: "#FFF" }}
            size="small"
          >
            <InputLabel id="demo-select-small">Age</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default FormComponent;
