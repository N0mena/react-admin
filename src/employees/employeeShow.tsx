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
import { InternsByManager } from "./internByManager";
import { DepartmentStats } from "./departementStats";

const EmployeeShowActions = () => (
    <TopToolbar>
        <ListButton />
        <EditButton />
    </TopToolbar>
);

export const EmployeeShow = () => (
    <Show actions={<EmployeeShowActions />}>
        <SimpleShowLayout>
            <TextField source="firstname" label="First name" />
            <TextField source="lastname" label="Last name" />
            <TextField source="email" label="Email" />
            <TextField source="department" label="Department" />

            <NumberField source="salary" label="Salary" />

            <BooleanField source="active" label="Active" />
        </SimpleShowLayout>
        <InternsByManager/>
        <DepartmentStats/>
    </Show>
);