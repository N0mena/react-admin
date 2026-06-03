import {
    Edit,
    ListButton,
    required,
    email,
    SelectInput,
    SimpleForm,
    TextInput,
    TopToolbar,
    NumberInput,
    BooleanInput,
    useRecordContext,
    useGetList,
} from "react-admin";
import { useWatch } from "react-hook-form";

const InternTitle = () => {
    const record = useRecordContext();
    if (!record) return null;
    return (
        <span>
            Modifier : {record.firstname} {record.lastname}
        </span>
    );
};

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

const InternEditActions = () => (
    <TopToolbar>
        <ListButton />
    </TopToolbar>
);

export const InternEdit = () => (
    <Edit
        title={<InternTitle />}
        redirect="list"
        actions={<InternEditActions />}
    >
        <SimpleForm>
            <TextInput
                source="firstname"
                label="Prénom"
                validate={required()}
                fullWidth
            />
            <TextInput
                source="lastname"
                label="Nom"
                validate={required()}
                fullWidth
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
                fullWidth
            />
            <ManagerInput />
            <BooleanInput source="isRemunerate" label="Rémunéré" />
            <RemunerationInput />
        </SimpleForm>
    </Edit>
);