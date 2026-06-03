import {
    Show,
    SimpleShowLayout,
    TextField,
    NumberField,
    BooleanField,
    ReferenceField,
    EmailField,
} from "react-admin";
import { ManagerCard } from "./managerCard";


export const InternShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="firstname" label="First name" />
            <TextField source="lastname" label="Last name" />
            <EmailField source="email" label="Email" />
            <TextField source="department" label="Department" />
            <BooleanField source="isRemunerate" label="Remunerated" />
            <NumberField
                source="remuneration"
                label="Remunerated"
                options={{ style: "currency", currency: "EUR" }}
            />
            <ReferenceField
                source="managerId"
                reference="employees"
                label="Manager"
                link="show"
            >
                <TextField source="firstname" />{" "}
                <TextField source="lastname" />
            </ReferenceField>
        </SimpleShowLayout>
        <ManagerCard />
    </Show>
);