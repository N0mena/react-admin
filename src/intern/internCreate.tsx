import {
    Create,
    ListButton,
    required,
    email,
    SelectInput,
    SimpleForm,
    TextInput,
    TopToolbar,
    NumberInput,
    BooleanInput,
    useGetList,
} from "react-admin";
import { useWatch } from "react-hook-form";

const ManagerInput = () => {
    const department = useWatch({ name: "department" });

    const { data: managers } = useGetList("employees", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: "lastname", order: "ASC" },
        filter: {
            ...(department ? { department } : {}),
            active: true,
        },
    });

    const choices = (managers ?? []).map((emp) => ({
        id: emp.id,
        name: `${emp.firstname} ${emp.lastname}`,
    }));

    return (
        <SelectInput
            source="managerId"
            label="Manager"
            choices={choices}
            validate={required()}
            disabled={!department}
            helperText={
                !department
                    ? "Sélectionnez d'abord un département"
                    : undefined
            }
        />
    );
};

const RemunerationInput = () => {
    const isRemunerate = useWatch({ name: "isRemunerate" });

    if (!isRemunerate) return null;

    return (
        <NumberInput
            source="remuneration"
            label="Rémunération (€)"
            validate={required()}
        />
    );
};

const InternCreateActions = () => (
    <TopToolbar>
        <ListButton />
    </TopToolbar>
);

export const InternCreate = () => (
    <Create actions={<InternCreateActions />}>
        <SimpleForm>
            <TextInput
                source="firstname"
                label="Prénom"
                validate={required()}
            />
            <TextInput
                source="lastname"
                label="Nom"
                validate={required()}
            />
            <TextInput
                source="email"
                label="Email"
                type="email"
                validate={[required(), email()]}
                fullWidth
            />
            <SelectInput
                source="department"
                label="Département"
                choices={[
                    { id: "Informatique", name: "Informatique" },
                    { id: "Marketing", name: "Marketing" },
                    { id: "RH", name: "RH" },
                    { id: "Finance", name: "Finance" },
                ]}
                validate={required()}
            />
            <ManagerInput />
            <BooleanInput
                source="isRemunerate"
                label="Rémunéré"
                defaultValue={false}
            />
            <RemunerationInput />
        </SimpleForm>
    </Create>
);