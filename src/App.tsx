import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { EmployeeList } from "./employees/employeeList";
import { EmployeeCreate } from "./employees/employeeCreate";

const dataProvider = jsonServerProvider("http://localhost:3002");

export const App = () => <Admin dataProvider={dataProvider}>
    <Resource name="employees"  
    list={EmployeeList}
    create={EmployeeCreate}
    edit={EmployeeCreate}/>
</Admin>;
