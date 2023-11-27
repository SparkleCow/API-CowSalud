# CowSalud EPS (API REST)

Hola a todos, bienvenidos a CowSalud EPS

## ¿Qué tecnologías se emplearon en el proyecto? 

- JavaScript
- TypeScript
- NodeJS
- Express
- MySQL
- Visual Studio Code
- Postman

## Instalación: 

Para ejecutar el API, debes asegurarte previamente de tener NodeJS Y npm en tu sistema.

1. Descarga el proyecto: Clona el repositorio con git clone https://github.com/SparkleCow/API-CowSalud.git o descarga el repositorio en formato .rar para poder manipularlo.
2. Configurar variables de entorno: Crea un archivo .env en la raíz del proyecto y configura las variables necesarias.
3. Instalar las dependencias del proyecto: Instala todas las dependencias que se encuentran en el archivo package.json por medio de la siguiente linea de codigo en la terminal -  npm install. Esto instalara todas las dependencias que se encuentren mencionadas en   el archivo package.json.
4. Iniciar el proyecto: Ejecuta en la terminal el modo de desarrollo o producción por medio de los comandos npm run dev o npm run prod.

## Modelos de datos

1. Paciente:<br> <br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/ccb06c32-3abd-4907-a460-304e86b57d0a) <br> <br>
2. PacienteDTO ( Información del paciente que permite ser modificada ) <br> <br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/bbd28eed-8660-4b7b-bff9-9dfafd454b31) <br> <br>
2. Doctor: <br> <br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/45dbfe96-a0ae-4aef-89bb-97343057bd84) <br> <br>
4. DoctorDTO ( Información del doctor que permite ser modificada ) <br> <br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/fef8b8e7-2d98-469b-9e35-a2a671f489f6) <br> <br>
3. Cita: <br> <br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/82922e4b-e22f-4917-a00c-af1777f533a9) <br> <br>
4. CitaDTO( Envia información más detallada sobre la cita ) <br> <br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/d42ca861-8e50-42ed-980e-59f2b87a1a6e) <br> <br>


## ¿Cómo funciona? 

### Doctores: 

Se tiene un servicio CRUD que permite crear, buscar, eliminar y modificar doctores por medio de su id. Además este servicio permite listar los doctores que se encuentren actualmente trabajando con CowSaludEPS y tambien todos los doctores, tanto los activos como los que no lo estan.
Este servicio tambien permite filtrar los doctores activos por medio de una query que recibe como parametro la especialidad, de esta forma podemos obtener los doctores filtrados por su especialidad.

### Pacientes: 

Se tiene de igual manera un servicio CRUD que permite crear, buscar, eliminar y modificar a los pacientes por medio de su id (Cedula). Tambien permite obtener aquellos pacientes afiliados actualmente con CowSaludEPS y de igual forma, obtener todos los pacientes que alguna vez estuvieron afiliados y aquellos que actualmente lo estan. 

### Citas: 

El servicio de citas tiene unas dinamicas particulares. Para crear una cita es necesario emplear el modelo simple de cita (id_paciente, id_doctor, fecha), sin embargo al enviar la información al cliente, este lo hace por medio de un modelo citaDTO el cual busca información del paciente y del doctor con el fin de proporcionar más infomación al cliente sobre la cita. 

Este servicio permite obtener las citas por medio del id del paciente y por medio de la especialidad del doctor. De igual manera permite la creación de citas y brinda la posibilidad de encontrar todas las citas sin ningun tipo de filtros (Encontrar todas las citas en base de datos)

## Pacientes CRUD

<div>
<p style = 'text-align:center;'>
<img src="https://github.com/SparkleCow/API-CowSalud/assets/55297516/19e00eb8-afdb-49ff-9d6d-ffb680682547" alt="JuveYell" width="800px">
</p>
</div>

## Doctor CRUD

## Citas CRUD



