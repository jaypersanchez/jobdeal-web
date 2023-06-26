import JobPostingForm from "../onboarding/hire/JobPostingForm";
import Dialog from "./Dialog";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
}

export default function JobPostingDialog({ open, title, onClose }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Create a Job Posting"
      width="lg"
    >
      <JobPostingForm title={title} onSubmit={() => location.reload()} />
    </Dialog>
  );
}
