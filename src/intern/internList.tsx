import {
    List,
    Datagrid,
    TextField,
    NumberField,
    BooleanField,
    EditButton,
    DeleteButton,
    SearchInput,
    SelectInput,
    ReferenceField,
    useCreate,
    useNotify,
    useRefresh,
    useGetList,
} from "react-admin";

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField as MuiTextField,
    MenuItem,
    Alert,
    Stack,
} from "@mui/material";

import { useState } from "react";

const internFilters = [
    <SearchInput source="q" alwaysOn />,
    <SelectInput
        source="department"
        label="Department"
        choices={[
            { id: "Informatique", name: "Informatique" },
            { id: "Marketing", name: "Marketing" },
            { id: "RH", name: "RH" },
            { id: "Finance", name: "Finance" },
        ]}
    />,
    <SelectInput
        source="isRemunerate"
        label="Remunerated"
        choices={[
            { id: true, name: "Remunerated" },
            { id: false, name: "Non-Remunerated" },
        ]}
    />,
];

const QuickAddIntern = () => {
    const [open, setOpen] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [managerId, setManagerId] = useState<string>(""); 
    const [errorMsg, setErrorMsg] = useState("");

    const notify = useNotify();
    const refresh = useRefresh();
    const [create, { isPending }] = useCreate();

    const { data: employees } = useGetList("employees", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: "lastname", order: "ASC" },
        filter: { active: true },
    });

    const handleSubmit = () => {
        setErrorMsg("");

        if (!firstname || !lastname || !managerId) {
            setErrorMsg("All fields must be filled.");
            return;
        }

        create(
            "interns",
            {
                data: {
                    firstname,
                    lastname,
                    managerId: Number(managerId),
                    isRemunerate: false,
                    remuneration: 0,
                    department: "",
                    email: "",
                },
            },
            {
                onSuccess: () => {
                    notify("Intern created successfully", { type: "success" });
                    refresh();
                    setOpen(false);
                    setFirstname("");
                    setLastname("");
                    setManagerId("");
                },
                onError: () => {
                    setErrorMsg("Erreur lors de la création.");
                },
            }
        );
    };

    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)}>
                New intern
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add new intern</DialogTitle>

                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

                        <MuiTextField
                            label="First Name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            fullWidth
                        />

                        <MuiTextField
                            label="Last Name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            fullWidth
                        />

                        <MuiTextField
                            select
                            label="Manager"
                            value={managerId}
                            onChange={(e) => setManagerId(e.target.value)}
                            fullWidth
                        >
                            {(employees ?? []).map((emp: any) => (
                                <MenuItem key={emp.id} value={emp.id}>
                                    {emp.firstname} {emp.lastname}
                                </MenuItem>
                            ))}
                        </MuiTextField>
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={isPending}
                    >
                        create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export const InternList = () => (
    <List
        filters={internFilters}
        perPage={5}
        actions={
            <div >
                <QuickAddIntern />
            </div>
        }
    >
        <Datagrid rowClick="show" >
            <TextField source="firstname" label="First Name" />
            <TextField source="lastname" label="Name" />
            <TextField source="email" label="Email" />
            <TextField source="department" label="Department" />

            <NumberField
                source="remuneration"
                label="Remuneration"
                options={{ style: "currency", currency: "EUR" }}
            />

            <BooleanField source="isRemunerate" label="Remunerated" />

            <ReferenceField source="managerId" reference="employees" label="Manager">
                <TextField source="firstname" />
            </ReferenceField>

            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);