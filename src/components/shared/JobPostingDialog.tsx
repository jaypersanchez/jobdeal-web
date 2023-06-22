import JobPostingForm from "../onboarding/hire/JobPostingForm";
import Dialog from "./Dialog";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function JobPostingDialog({ open, onClose }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Create a Job Posting"
      width="lg"
    >
      <JobPostingForm onSubmit={onClose} />
    </Dialog>
  );
}
