import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  context: string;
  compact?: boolean;
}

/** In-app reporting for AI-generated content (Google Play generative AI policy). */
const ReportDesignButton = ({ context, compact }: Props) => {
  const report = () => {
    const subject = encodeURIComponent("Report AI design - AIMehendi.in");
    const body = encodeURIComponent(
      `Mujhe ye design galat / offensive laga.\n\nDesign: ${context}\nPage: ${window.location.href}\n\nReason: `,
    );
    window.location.href = `mailto:contact@aimehendi.in?subject=${subject}&body=${body}`;
    toast.success("Report bhejne ke liye dhanyavaad — hum 48 ghante me review karenge.");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={report}
      aria-label="Report this design"
      className={compact ? "h-8 w-8 p-0 md:h-9 md:w-auto md:px-3" : "gap-2"}
    >
      <Flag className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />
      {!compact && "Report"}
    </Button>
  );
};

export default ReportDesignButton;
