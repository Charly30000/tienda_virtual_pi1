import { ExampleClickButtonPage } from "./components/ExampleClickButtonPage";
import { ExampleLoadPage } from "./components/ExampleLoadPage";
import { ExampleUpdateProduct } from "./components/ExampleUpdateProduct";
import { ExampleUploadImage } from "./components/ExampleUploadImage";

export const TestPage = () => {
  return <div>
    <ExampleLoadPage/>
    <ExampleClickButtonPage/>
    <ExampleUploadImage/>
    <ExampleUpdateProduct/>
  </div>;
};
