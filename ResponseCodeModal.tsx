// ResponseCodeModal.tsx

import React from 'react';
import { Modal, Typography, Button } from '@mui/material';

interface ResponseCodeModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const ResponseCodeModal: React.FC<ResponseCodeModalProps> = ({ open, onClose, message }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <Typography variant="h5" component="div" align="center">
          {message}
        </Typography>
        <Button variant="contained" color="primary" onClick={onClose}>
          OK
        </Button>
      </div>
    </Modal>
  );
};

export default ResponseCodeModal;
