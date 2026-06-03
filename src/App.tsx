import { Admin } from "react-admin";
import { Layout } from "./Layout";
import jsonServerProvider from "ra-data-json-server";

const dataProvider = jsonServerProvider("http://localhost:3002");

export const App = () => <Admin dataProvider={dataProvider}></Admin>;
