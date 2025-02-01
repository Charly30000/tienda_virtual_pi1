import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const PrivacyPolicyPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />

      <main className="relative bg-slate-100">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="px-10 py-2">
          <div className="bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
              <section id="aviso-legal">
                <h4 className="text-xl font-semibold mb-3">
                  Aviso legal y política de privacidad
                </h4>
                <p>
                  En cumplimiento con el deber de información recogido en el
                  artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de
                  la Sociedad de la Información y del Comercio Electrónico, los
                  datos aquí consignados corresponden al titular de esta Web.
                </p>
                <p>
                  <strong>AMAZING COOP</strong> es una empresa dedicada a la
                  comercialización de productos a través de su tienda virtual,
                  ofreciendo a sus clientes una experiencia de compra segura y
                  eficiente.
                </p>
              </section>

              <section id="condiciones-uso" className="mt-6">
                <h4 className="text-xl font-semibold mb-3">
                  Condiciones de uso
                </h4>
                <p>
                  El acceso a este sitio Web implica la aceptación de estas
                  condiciones de uso sin reservas que regulan el acceso y la
                  utilización del mismo con el fin de poner a disposición de los
                  usuarios información sobre nuestros productos y servicios.
                </p>
                <p>
                  Se prohíbe expresamente la utilización de los contenidos de
                  este sitio Web para su uso comercial o para su distribución,
                  transformación o comunicación sin previa autorización.
                </p>
                <p>
                  <strong>AMAZING COOP</strong> no responderá de ninguna
                  consecuencia, daño o perjuicio que pudieran derivarse de la
                  utilización de la información proporcionada en esta
                  plataforma.
                </p>
              </section>

              <section id="proteccion-datos" className="mt-6">
                <h4 className="text-xl font-semibold mb-3">
                  Política de Protección de Datos
                </h4>
                <p>
                  De conformidad con la Ley Orgánica 15/1999, de 13 de
                  diciembre, de Protección de Datos de Carácter Personal, usted
                  consiente que sus datos personales sean incorporados a un
                  fichero titularidad de <strong>AMAZING COOP</strong> con la
                  finalidad de gestionar su experiencia de compra y ofrecerle
                  nuestros servicios de forma eficiente.
                </p>
                <p>
                  Puede ejercer los derechos de acceso, rectificación,
                  cancelación y oposición en cualquier momento, mediante escrito
                  dirigido a <strong>AMAZING COOP</strong>.
                </p>
              </section>

              <section id="medidas-seguridad" className="mt-6">
                <h4 className="text-xl font-semibold mb-3">
                  Medidas de seguridad
                </h4>
                <p>
                  De conformidad con la legislación vigente, el responsable de
                  este sitio ha adoptado las medidas de seguridad necesarias
                  para garantizar la confidencialidad y protección de los datos
                  personales de los usuarios.
                </p>
              </section>

              <section id="proteccion-menores" className="mt-6">
                <h4 className="text-xl font-semibold mb-3">
                  Política de protección de menores
                </h4>
                <p>
                  Los usuarios que faciliten datos a través de esta Web deben
                  ser mayores de 14 años. Queda prohibido el acceso y uso del
                  portal a menores de dicha edad sin el consentimiento de sus
                  tutores legales.
                </p>
                <p>
                  <strong>AMAZING COOP</strong> recuerda a los responsables
                  legales de menores que es su obligación supervisar el acceso
                  de los mismos a esta plataforma.
                </p>
              </section>

              <section id="propiedad-industrial" className="mt-6">
                <h4 className="text-xl font-semibold mb-3">
                  Propiedad industrial
                </h4>
                <p>
                  Todos los derechos de Propiedad Industrial e Intelectual de
                  los elementos contenidos en esta Web, incluyendo marcas,
                  diseños gráficos, textos e imágenes, pertenecen a
                  <strong> AMAZING COOP</strong>.
                </p>
                <p>
                  El acceso a la Web no implica ningún tipo de renuncia,
                  transmisión, licencia o cesión de estos derechos, salvo
                  autorización expresa por parte de{" "}
                  <strong>AMAZING COOP</strong>.
                </p>
              </section>

              <section id="enlaces-web" className="mt-6">
                <h4 className="text-xl font-semibold mb-3">
                  Enlaces a otras Webs
                </h4>
                <p>
                  Los enlaces que aparecen en esta Web son un servicio a los
                  usuarios. Estas páginas no son operadas ni controladas por
                  <strong> AMAZING COOP</strong>, por lo que no nos hacemos
                  responsables de su contenido.
                </p>
              </section>

              <section id="cookies" className="mt-6">
                <h4 className="text-xl font-semibold mb-3">Cookies</h4>
                <p>
                  Este sitio web puede utilizar cookies necesarias para mejorar
                  la experiencia de navegación y prestar los servicios ofrecidos
                  a los usuarios.
                </p>
                <p>
                  El usuario puede configurar su navegador para bloquear las
                  cookies o eliminarlas en cualquier momento. Sin embargo, esto
                  puede afectar el correcto funcionamiento de la web.
                </p>
              </section>

              <section id="legislacion-competencia" className="mt-6">
                <h4 className="text-xl font-semibold mb-3">
                  Legislación aplicable y competencia jurisdiccional
                </h4>
                <p>
                  Todos los litigios o reclamaciones surgidas de la utilización
                  de esta web se regirán por la legislación española y se
                  someterán a la jurisdicción de los Juzgados y Tribunales
                  correspondientes.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
