import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';

import Iconify from 'src/components/iconify';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRouter } from 'src/routes/hooks';
// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  selected,
  fname,
  genre,
  rating,
  cast,
  releaseDate,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const [openM, setOpenM] = useState(null);
  const [editID, setEditID] = useState('');
  const router = useRouter();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpen = async (Sid) => {
    setOpenM(true);
    setEditID(Sid);
    try {
      const response = await axios.get(`http://localhost:3000/api/movie?id=${id}`, { headers: {"Authorization" : `Bearer ${localStorage.getItem('accessToken')}`} });
      const {
        name: fnameForm,
        genre: genreForm,
        rating: ratingForm,
        cast: castForm,
      } = response.data.movie[0];
      setFormData({
        name: fnameForm,
        genre: genreForm,
        rating: ratingForm,
        cast: castForm,
      });
      console.log();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClose = () => {
    setOpenM(false);
  };

  const [formData, setFormData] = useState({
    name: '',
    cast: '',
    genre: '',
    rating: '',
    releaseDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (value) => {
    setFormData({
      ...formData,
      releaseDate: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/movie/?id=${editID}`, formData, { headers: {"Authorization" : `Bearer ${localStorage.getItem('accessToken')}`} });
      if (response.data.movie.id) {
        router.reload('/movies');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handelDelete = async (editIDs) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/movie/?id=${editIDs}`, formData, { headers: {"Authorization" : `Bearer ${localStorage.getItem('accessToken')}`} });
      console.log(response.data)
      if (response.data) {
        router.reload('/movies');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell>{id}</TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {fname}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{genre}</TableCell>

        <TableCell>{cast}</TableCell>

        <TableCell>{rating}</TableCell>

        <TableCell>{releaseDate}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={() => handleOpen(id)}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={()=>handelDelete(id)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <Modal open={openM} onClose={handleClose}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: 20,
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="genre"
              label="Genre"
              value={formData.genre}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="cast"
              label="Cast"
              value={formData.cast}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <Typography component="legend">Ratings</Typography>
            <br />

            <Rating
              name="rating"
              value={formData.rating}
              onChange={(event, newValue) => {
                handleInputChange(event);
              }}
            />
            <br />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  value={formData.releaseDate}
                  onChange={(newValue) => handleDateChange(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <br />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  fname: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  genre: PropTypes.string,
  rating: PropTypes.string,
  cast: PropTypes.string,
  releaseDate: PropTypes.string,
};
