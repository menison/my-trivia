import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import '../index.css';

interface LoadingProps{
  showLoading: boolean;
  onClose: () => void;
}

const Loading: React.FC<LoadingProps> = ({showLoading, onClose}) => {
  return (
    <Dialog open={showLoading} onClose={onClose}>
    <DialogTitle></DialogTitle>
    <DialogContent>
      <div className="loader-container">
        <div className="loader"></div>
        <h3>Loading questions...</h3>
      </div>
    </DialogContent>
  </Dialog>
  );
};

export default Loading;
