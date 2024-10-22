import React from "react";
import axios from "axios";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const init = async () => {
      const data = await axios.get("http://localhost:8080/api/hello");
      console.log(data.data);
      setData(data.data);
    };
    init();
  }, []);

  React.useEffect(() => {
    const init = async () => {
      const jsonSend = {
        name: "nuevo",
        price: 20,
        description: "Este es un nuevo producto",
      };
      const data = await axios.post("http://localhost:8080/api/bbdd", jsonSend);
      console.log(data.data);

      const allData = await axios.get("http://localhost:8080/api/bbdd");
      console.log(allData.data);

      try {
        // const getOne = await axios.get("http://localhost:8080/api/bbdd/1000");
        // console.log(getOne.data);
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  return (
    <>
      {!data ? (
        <div>Haciendo peticion...</div>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </>
  );
}

export default App;
