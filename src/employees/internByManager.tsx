import { Typography, Card, CardContent } from "@mui/material";
import { useRecordContext, useGetList, Link } from "react-admin";

export const InternsByManager = () => {
    const record = useRecordContext();

    const { data, isPending, error, total } = useGetList("interns", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: "lastname", order: "ASC" },
        filter: { managerId: record?.id },
    });

    if (!record) return null;
    if (isPending) return <p>Chargement des stagiaires...</p>;
    if (error) return <p>Erreur de chargement des stagiaires</p>;

    return (
        <Card style={{ margin: "16px 0" }}>
            <CardContent>
                <Typography variant="h6">
                    Stagiaires encadrés ({total ?? 0})
                </Typography>
                {!data || data.length === 0 ? (
                    <Typography>Aucun stagiaire pour ce manager.</Typography>
                ) : (
                    <ul>
                        {data.map((intern) => (
                            <li key={intern.id}>
                                <Link to={`/interns/${intern.id}/show`}>
                                    {intern.firstname} {intern.lastname}
                                </Link>{" "}
                                — {intern.department} —{" "}
                                {intern.isRemunerate
                                    ? `${intern.remuneration} €`
                                    : "Non rémunéré"}
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
};