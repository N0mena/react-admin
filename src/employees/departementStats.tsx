import { Typography, Card, CardContent } from "@mui/material";
import { useRecordContext, useGetList } from "react-admin";

export const DepartmentStats = () => {
    const record = useRecordContext();

    const { total, isPending, error } = useGetList("employees", {
        pagination: { page: 1, perPage: 1 },
        sort: { field: "id", order: "ASC" },
        filter: { department: record?.department, active: true },
    });

    if (!record) return null;
    if (isPending) return <p>Chargement des stats...</p>;
    if (error) return <p>Erreur de chargement des stats</p>;

    // On soustrait 1 pour ne pas compter l'employé lui-même
    const colleagues = (total ?? 1) - 1;

    return (
        <Card style={{ margin: "16px 0" }}>
            <CardContent>
                <Typography variant="h6">
                    Statistiques du département : {record.department}
                </Typography>
                <Typography>
                    Collègues actifs dans ce département : {colleagues}
                </Typography>
            </CardContent>
        </Card>
    );
};