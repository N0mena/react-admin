import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    NumberInput,
    BooleanInput,
    required,
    minValue
} from "react-admin";


export const EmployeeEdit = () => (
    <Edit >
        <SimpleForm>
            <TextInput source="firstname" label="Prénom" validate={[required()]} />

            <TextInput source="lastname" label="Nom" validate={[required()]} />

            <TextInput source="email" label="Email" validate={[required()]} />

            <SelectInput
                source="department"
                label="Département"
                choices={[
                    { id: "Informatique", name: "Informatique" },
                    { id: "Marketing", name: "Marketing" },
                    { id: "RH", name: "RH" },
                    { id: "Finance", name: "Finance" }
                ]}
                validate={[required()]}
            />

            <NumberInput
                source="salary"
                label="Salaire"
                validate={[required(), minValue(1500)]}
            />

            <BooleanInput source="active" label="Actif" />
        </SimpleForm>
    </Edit>
);