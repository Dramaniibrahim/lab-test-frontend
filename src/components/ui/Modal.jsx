import { Dialog, DialogTitle, DialogContent } from '@mui/material';

export default function Modal({ open, onClose, title, children }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}