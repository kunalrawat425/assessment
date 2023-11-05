// import React, { useState } from 'react';
// import { Button, Modal, TextField } from '@mui/material';

// const FormModal = ({ open:string, onClose:string }) => {
//   const [formData, setFormData] = useState({
//     // Initialize form fields here
//     name: '',
//     email: '',
//     // Add more fields as needed
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here, for example, send data to an API or perform other actions
//     console.log(formData); // Replace this with your submit logic
//     onClose(); // Close the modal after submission
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: 20 }}>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             name="name"
//             label="Name"
//             value={formData.name}
//             onChange={handleInputChange}
//             margin="normal"
//             variant="outlined"
//             fullWidth
//           />
//           <TextField
//             name="email"
//             label="Email"
//             value={formData.email}
//             onChange={handleInputChange}
//             margin="normal"
//             variant="outlined"
//             fullWidth
//           />
//           {/* Add more fields as needed */}
//           <Button type="submit" variant="contained" color="primary">
//             Submit
//           </Button>
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default FormModal;
