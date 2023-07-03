# blog-cocina
Desde mi cocina es un blog de recetas de cocina que si funcionan.
/////////////////////////////////////////////////////////////////////////////////////////////
NOTA DE FUNCIONABILIDAD:

Aquí tienes una descripción de la funcionalidad asociada a cada ícono:

En la barra de navegación:
1.	FaHome (ícono de casa): Se utiliza para representar el enlace o botón de "Inicio". Al hacer clic en este ícono, se espera que el usuario sea redirigido a la página principal o de inicio de la aplicación.
2.	RiAddLine (ícono de signo más): Se utiliza para representar la acción de "Agregar receta". Al hacer clic en este ícono, se espera que el usuario acceda a una página o formulario donde pueda agregar una nueva receta.

En la página de inicio:
3.	IoEyeOutline (ícono de ojo): Se utiliza para representar la acción de "Ver receta completa" o "Visualizar receta". Al hacer clic en este ícono, se espera que el usuario sea redirigido a la página que muestra la receta completa o detallada.
4.	RiDeleteBinLine (ícono de contenedor de basura): Se utiliza para representar la acción de "Borrar receta". Al hacer clic en este ícono, se espera que el usuario elimine la receta correspondiente.

En la visualización de un artículo completo:
5.	BiPencil (ícono de lápiz): Se utiliza para representar la acción de "Editar receta". Al hacer clic en este ícono, se espera que el usuario acceda a una página o formulario donde pueda modificar la receta existente.
6.	FaSave (ícono de disco): Se utiliza para representar la acción de "Guardar receta" o "Guardar cambios". Al hacer clic en este ícono, se espera que el usuario guarde los cambios realizados en la receta.
7.	RiDeleteBinLine (ícono de contenedor de basura): Se utiliza para representar la acción de "Borrar receta". Al hacer clic en este ícono, se espera que el usuario elimine la receta completa.

/////////////////////////////////////////////////////////////////////////////////////////////

Memoria Explicativa Proyecto
“Desde MI Cocina”

Introducción
El presente documento tiene como objetivo proporcionar una explicación detallada de los aspectos técnicos y funcionales del proyecto de desarrollo de una aplicación web para la gestión de recetas de cocina. A continuación, se describen los diferentes elementos del proyecto, incluyendo la arquitectura, tecnologías utilizadas, funcionalidades implementadas y plan de trabajo.

Arquitectura del Sistema
El sistema está diseñado siguiendo una arquitectura de cliente-servidor. El frontend de la aplicación se construye utilizando el framework React, que permite la creación de interfaces de usuario interactivas y dinámicas. El backend está desarrollado en Node.js, utilizando el framework Express.js para la creación de una API REST que gestiona las solicitudes y respuestas del frontend. La comunicación entre el frontend y el backend se realiza a través de llamadas HTTP utilizando el protocolo REST.

La base de datos utilizada en el proyecto es MySQL, un sistema de gestión de bases de datos relacional. MySQL proporciona una solución sólida y confiable para el almacenamiento y recuperación de datos relacionados con las recetas, usuarios y otros elementos de la aplicación.

Al utilizar MySQL, se han definido una tabla en la base de datos para almacenar la información de manera estructurada. Se crea una tabla llamada "Posts" con columnas para el id_posts, título, contenido, imagen, fecha de publicación de la receta.

Tecnologías Utilizadas
El proyecto se ha desarrollado utilizando las siguientes tecnologías:
•	Frontend:
•	React: Framework de JavaScript utilizado para la construcción de la interfaz de usuario.
•	HTML5: Lenguaje de marcado utilizado para estructurar y presentar el contenido de las páginas web.
•	CSS3: Lenguaje de estilos utilizado para definir el diseño y apariencia visual de las páginas web.
•	Bootstrap:  biblioteca de componentes de interfaz de usuario que facilita la creación de interfaces atractivas y responsivas en sitios web y aplicaciones.
•	JavaScript: Lenguaje de programación utilizado para implementar la lógica y la interacción en el frontend.

•	Backend:
•	Node.js: Entorno de ejecución de JavaScript del lado del servidor.
•	Express.js: Framework web utilizado para la creación de la API REST del backend.
•	Mysql: Base de datos SQL utilizada para el almacenamiento de los datos de la aplicación.
•	Multer: es un middleware que se encarga de gestionar la carga de archivos en aplicaciones web.
•	Fs: es el modulo que permite interactuar con el sistema de archivos. Ejemplo: Leer, escribir, modificar y borrar archivos.

Funcionalidades Implementadas
	La aplicación cuenta con las siguientes funcionalidades principales:
1.	Gestión de recetas:
•	Se pueden Crear, Leer, Editar y Borrar recetas, proporcionando información como título, contenido, imagen.
2.	Interfaz de usuario intuitiva:

•	La interfaz de usuario es intuitiva, responsive, se impleto la paginación para facilitar la navegación y el uso de la aplicación.

Plan de Trabajo
Análisis de requisitos y definición de la estructura de la aplicación.
1.	Diseño de la interfaz de usuario utilizando componentes de React y Bootstrap.
2.	Implementación del backend utilizando Node.js y Express.js. 
3.	Desarrollo de  sistema CRUD (Create, Read, Update, Delete).
4.	Integración de la base de datos Mysql.
5.	Pruebas de la aplicación para ver su funcionamiento correcto y su compatibilidad con diferentes dispositivos y navegadores.


