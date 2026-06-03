    import { Admin, Layout, Resource } from "react-admin";
    import jsonServerProvider from "ra-data-json-server";
    import { EmployeeList } from "./employees/employeeList";
    import { EmployeeCreate } from "./employees/employeeCreate";
    import { EmployeeShow } from "./employees/employeeShow";
    import { EmployeeEdit } from "./employees/employeeEdit";
import { InternList } from "./intern/internList";
import { InternCreate } from "./intern/internCreate";
import { InternEdit } from "./intern/internEdit";
import { InternShow } from "./intern/internShow";
import { Dashboard } from "./dashboard/dashboard";


    const dataProvider = jsonServerProvider("http://localhost:3002");

    export const App = () => (
    <Admin 
    layout={Layout} 
    dataProvider={dataProvider} 
    dashboard={Dashboard}>
        <Resource
        name="employees"
        list={EmployeeList}
        create={EmployeeCreate}
        edit={EmployeeEdit}
        show={EmployeeShow}
        />
        <Resource name="interns"
        list={InternList}
        create={InternCreate} 
        edit={InternEdit}
        show={InternShow}/>
    </Admin>
    );
