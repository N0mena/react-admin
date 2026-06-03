import {
    CardContent,
    Typography,
    Grid,
    Paper,
} from "@mui/material";
import {
    Title,
    useGetList,
} from "react-admin";
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const StatCard = ({
    title,
    value,
    to,
    icon,
}: {
    title: string;
    value: number | undefined;
    to: string;
    icon: React.ReactNode;
}) => {
    const navigate = useNavigate();

    return (
        <Paper
            onClick={() => navigate(to)}
            elevation={3}
            sx={{
                p: 2,
                cursor: "pointer",
                borderRadius: 3,
                transition: "0.3s",
                display: "flex",
                alignItems: "center",
                gap: 2,
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                },
            }}
        >
            <div style={{ fontSize: 32 }}>{icon}</div>

            <div>
                <Typography variant="subtitle2" color="text.secondary">
                    {title}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                    {value ?? "..."}
                </Typography>
            </div>
        </Paper>
    );
};

export const Dashboard = () => {
    const { total: totalEmployees } = useGetList("employees", {
        pagination: { page: 1, perPage: 1 },
        sort: { field: "id", order: "ASC" },
    });

    const { total: activeEmployees } = useGetList("employees", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "id", order: "ASC" },
    filter: { q: "", active: "true" },
});
    

    const { total: totalInterns } = useGetList("interns", {
        pagination: { page: 1, perPage: 1 },
        sort: { field: "id", order: "ASC" },
    });

    const { total: paidInterns } = useGetList("interns", {
        pagination: { page: 1, perPage: 1 },
        sort: { field: "id", order: "ASC" },
        filter: { isRemunerate: true },
    });

    return (
        <div style={{ padding: 24 }}>
            <Title title="Dashboard" />

            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Dashboard Overview
            </Typography>

            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard
                            title="Total Employees"
                            value={totalEmployees}
                            to="/employees"
                            icon={<PeopleIcon color="primary" />}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard
                            title="Active Employees"
                            value={activeEmployees}
                            to="/employees"
                            icon={<WorkIcon color="success" />}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard
                            title="Total Interns"
                            value={totalInterns}
                            to="/interns"
                            icon={<SchoolIcon color="warning" />}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard
                            title="Paid Interns"
                            value={paidInterns}
                            to="/interns"
                            icon={<AttachMoneyIcon color="secondary" />}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </div>
    );
};