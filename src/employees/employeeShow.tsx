import {
    Show,
    SimpleShowLayout,
    TextField,
    NumberField,
    BooleanField,
    TopToolbar,
    ListButton,
    EditButton
} from "react-admin";

const EmployeeShowActions = () => (
    <TopToolbar>
        <ListButton />
        <EditButton />
    </TopToolbar>
);

export const EmployeeShow = () => (
    <Show actions={<EmployeeShowActions />}>
        <SimpleShowLayout>
            <TextField source="firstname" label="Prénom" />
            <TextField source="lastname" label="Nom" />
            <TextField source="email" label="Email" />
            <TextField source="department" label="Département" />

            <NumberField source="salary" label="Salaire" />

            <BooleanField source="active" label="Actif" />
        </SimpleShowLayout>
    </Show>
);