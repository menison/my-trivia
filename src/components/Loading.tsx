import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import "../index.css";
import React from "react";

interface LoadingProps {
  showLoading: boolean;
  onClose: () => void;
}

const Loading: React.FC<LoadingProps> = ({ showLoading, onClose }) => {
  return (
    <Dialog open={showLoading} onClose={onClose}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <div className="loader-container">
          <div className="loader"></div>
          <h3>Loading...</h3>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Loading;
