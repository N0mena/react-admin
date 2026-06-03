import {
    List,
    Datagrid,
    TextField,
    NumberField,
    BooleanField,
    EditButton,
    DeleteButton,
    SearchInput,
    SelectInput
} from "react-admin";
import { QuickStatusToggle } from "./quickStatusToggle";

const employeeFilters = [
    <SearchInput source="q" alwaysOn />,
    <SelectInput
        source="department"
        label="Département"
        choices={[
            { id: "Informatique", name: "Informatique" },
            { id: "Marketing", name: "Marketing" },
            { id: "RH", name: "RH" },
            { id: "Finance", name: "Finance" }
        ]}
    />,
    <SelectInput
        source="active"
        label="Statut"
        choices={[
            { id: true, name: "Active" },
            { id: false, name: "Non-active" }
        ]}
    />
];

export const EmployeeList = () => (
    <List filters={employeeFilters} perPage={5}>
        <Datagrid rowClick="edit">

            <TextField source="firstname" label="First name" />
            <TextField source="lastname" label="Last name" />
            <TextField source="email" label="Email" />
            <TextField source="department" label="Department" />

            <NumberField
                source="salary"
                label="Salary"
                options={{
                    style: "currency",
                    currency: "Eur"
                }}
            />

            <BooleanField source="active" label="Active" />

            <EditButton />
            <DeleteButton />
            
        </Datagrid>
    </List>
);