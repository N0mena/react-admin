import { Button } from "@mui/material";
import {
  useRecordContext,
  useUpdate,
  useNotify,
  useRefresh,
} from "react-admin";

export const QuickStatusToggle = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();

  const [update, { isPending }] = useUpdate();

  if (!record) return null;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    update(
      "employees",
      {
        id: record.id,
        data: {
          ...record,
          active: !record.active,
        },
        previousData: record,
      },
      {
        onSuccess: () => {
          notify(
            record.active ? "Employee deactivated" : "Employee activated",
            { type: "success" },
          );
          refresh();
        },
        onError: () => {
          notify("Update error", { type: "error" });
        },
      },
    );
  };

  return (
    <Button
      variant="contained"
      color={record.active ? "error" : "success"}
      disabled={isPending}
      onClick={handleToggle}
      size="small"
    >
      {record.active ? "Deactivate" : "Activate"}
    </Button>
  );
};
