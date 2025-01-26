import { ExampleClickButtonPage } from "./components/ExampleClickButtonPage";
import { ExampleGetProductHomePage } from "./components/ExampleGetProductHomePage";
import { ExampleLoadPage } from "./components/ExampleLoadPage";
import { ExampleUpdateProduct } from "./components/ExampleUpdateProduct";
import { ExampleUploadImage } from "./components/ExampleUploadImage";

export const TestPage = () => {
  return (
    <div>
      <ExampleLoadPage />
      <div style={separator}>
        {" Separador ".padStart(60, "-").padEnd(120, "-")}
      </div>
      <ExampleClickButtonPage />
      <div style={separator}>
        {" Separador ".padStart(60, "-").padEnd(120, "-")}
      </div>
      <ExampleUploadImage />
      <div style={separator}>
        {" Separador ".padStart(60, "-").padEnd(120, "-")}
      </div>
      <ExampleUpdateProduct />
      <div style={separator}>
        {" Separador ".padStart(60, "-").padEnd(120, "-")}
      </div>
      <ExampleGetProductHomePage />
    </div>
  );
};

const separator: React.CSSProperties = {
  padding: 20,
  backgroundColor: "orange",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
};
