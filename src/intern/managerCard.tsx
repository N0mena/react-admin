import { Typography, Card, CardContent } from "@mui/material";
import { useRecordContext, useGetOne } from "react-admin";

export const ManagerCard = () => {
    const record = useRecordContext();

    const {
        data: manager,
        isPending,
        error,
    } = useGetOne(
        "employees",
        { id: record?.managerId },
        { enabled: !!record?.managerId }
    );

    if (!record) return null;

    if (isPending) return <p>Loading manager ...</p>;

    if (error)
        return <p>Loading error manager</p>;

    if (!manager) return <p>Manager not found.</p>;

    return (
        <Card style={{ margin: "16px 0" }}>
            <CardContent>
                <Typography variant="h6">Manager</Typography>
                <Typography>
                    <strong>Name :</strong> {manager.firstname} {manager.lastname}
                </Typography>
                <Typography>
                    <strong>Department :</strong> {manager.department}
                </Typography>
                <Typography>
                    <strong>Email :</strong>{" "}
                    <a href={`mailto:${manager.email}`}>{manager.email}</a>
                </Typography>
                <Typography>
                    <strong>Statut :</strong>{" "}
                    {manager.active ? "Actif" : "Inactif"}
                </Typography>
            </CardContent>
        </Card>
    );
};