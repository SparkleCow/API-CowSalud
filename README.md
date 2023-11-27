# CowSalud EPS (API REST) 😷

<b>DESARROLLO WEB BACK END<br>
<b>Unidad 6<br>
Docente: Norbey Danilo Muñoz

<b>Autor: Jonathan David Ramos Gallego

Hola a todos, bienvenidos a CowSalud EPS. (API REST para manejo de pacientes, doctores y sus respectivas citas)

## ¿Qué tecnologías se emplearon en el proyecto? 🤖

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
4. Crea la base de datos: Crea la base de datos y sigue el formato de tablas encontrado en el archivo database.sql en la carpeta repository.
5. Iniciar el proyecto: Ejecuta en la terminal el modo de desarrollo o producción por medio de los comandos npm run dev o npm run prod.

## Modelos de datos

1. Paciente:<br> <br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/ccb06c32-3abd-4907-a460-304e86b57d0a) <br> <br>
2. PacienteDTO ( Información del paciente que permite ser modificada ) <br> <br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/7b65382e-54f4-44d7-92b2-72f12589ff94) <br> <br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/6d278a90-2770-4d34-aa9b-dd83701cbcb3) <br> <br>

2. Doctor: <br> <br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/45dbfe96-a0ae-4aef-89bb-97343057bd84) <br> <br>
4. DoctorDTO ( Información del doctor que permite ser modificada ) <br> <br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/fef8b8e7-2d98-469b-9e35-a2a671f489f6) <br> <br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/cd8b43e3-c153-477a-8e16-f356f1e646bf) <br> <br>

3. Cita: <br> <br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/82922e4b-e22f-4917-a00c-af1777f533a9) <br> <br>
4. CitaDTO( Envia información más detallada sobre la cita ) <br> <br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/d42ca861-8e50-42ed-980e-59f2b87a1a6e) <br> <br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/bf5f71ed-7740-4b72-bf68-d88341a79634) <br> <br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/52d36da8-1217-409b-88e9-9540d9771f38) <br> <br>

4. Modelo de base de datos:<br> <br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/babe3c6a-e305-4cf7-b914-4c1b76e7f235) <br> <br>


## ¿Cómo funciona? ❔❔

### Doctores: 

Se tiene un servicio CRUD que permite crear, buscar, eliminar y modificar doctores por medio de su id. Además este servicio permite listar los doctores que se encuentren actualmente trabajando con CowSaludEPS y tambien todos los doctores tanto los activos como los que no lo estan.
Este servicio tambien permite filtrar los doctores activos por medio de una query, de esta forma podemos obtener los doctores filtrados por su especialidad.

### Pacientes: 

Se tiene de igual manera un servicio CRUD que permite crear, buscar, eliminar y modificar a los pacientes por medio de su id (Cedula). Tambien permite obtener aquellos pacientes afiliados actualmente con CowSaludEPS y de igual forma, obtener todos los pacientes que alguna vez estuvieron afiliados y aquellos que actualmente lo estan. 

### Citas: 

El servicio de citas tiene unas dinamicas particulares. Para crear una cita es necesario emplear el modelo simple de cita (id_paciente, id_doctor, fecha), sin embargo al enviar la información al cliente, este lo hace por medio de un modelo citaDTO el cual busca información del paciente y del doctor con el fin de proporcionar más infomación al cliente sobre la cita. 

Este servicio permite obtener las citas por medio del id del paciente y por medio de la especialidad del doctor. De igual manera permite la creación de citas y brinda la posibilidad de encontrar todas las citas sin ningun tipo de filtros (Encontrar todas las citas en base de datos)

Este servicio realiza algunas validaciones con el fin de asegurar la integridad de los datos, de validad que no se generen citas duplicadas, que los doctores tengan disponibilidad, etc. 

## Pruebas del API (Postman) 

### Pacientes 🙂

* Obtener todos los pacientes <br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/f0df3e17-f065-4dcb-8773-33b8a0de19e2) <br><br>

* Obtener todos los pacientes afiliados actualmente <br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/e25ea205-8964-4548-8a78-cebe7e85748a) <br><br>

* Obtener un paciente por medio de su ID <br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/1ac26a96-6f15-4b87-9933-bfc4d0c1250a) <br><br>

* Crear un paciente <br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/4bb42dc1-dc8e-4bd3-ba6e-e83751db121d) <br><br>

* Eliminar un paciente <br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/ab857ac1-4fa8-4427-bde9-18ac7cb221ef) <br><br>

* Modificar un paciente <br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/93390408-0f18-48dd-902b-7058b388a128) <br><br>


### Doctores 😷

* Obtener todos los doctores<br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/2f710596-5a4d-42a4-abf7-712250978592)<br><br>

* Obtener todos los doctores vinculados a la EPS en este momento<br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/a27b351c-db05-4032-a47b-af8d6df69b54)<br><br>

* Obtener doctores vinculados actualmente a la EPS filtrando por su especialidad<br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/91ded012-6bac-4b3c-b86c-ba2099d7d48e)<br><br>

* Crear un doctor<br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/db8d89fb-9a7c-4b5b-abf8-2facf9ef6ebf)<br><br>

* Eliminar un doctor<br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/ac2964be-b7cd-4df0-9ce9-931420041368)<br><br>

* Modificar un doctor<br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/dec904a6-0e9f-43d6-8d26-e78420ed9c64)<br><br>


### Citas ⌛

* Obtener todas las citas <br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/20bcd390-4425-42f5-acbe-916ab7c53891)<br><br>

* Obtener todas las citas filtrando por especialidad del doctor <br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/583804ba-f870-4f13-bfc3-328f2c196d8a)<br><br>

* Obtener citas filtrando por cedula del paciente <br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/5810184a-25b5-4f59-a6d1-c3fd4319ff9e)<br><br>

* Obtener citas filtrando por el id del doctor <br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/3b1983f7-f4f5-4357-bedf-f8c6f3d40261)

* Crear cita <br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/6e0ee9d3-0fb5-4b5d-ac6a-b979ad820cce)<br><br>

### Manejo de excepciones ❗❗❗

* Paciente ocupado<br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/69462bc3-38b0-4780-adfb-f88420feedcf)<br><br>

* Doctor ocupado<br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/d0f77ed2-c22f-44ac-8630-4990456626be)<br><br>

* Doble cita el mismo dia<br><br>
![image](https://github.com/SparkleCow/API-CowSalud/assets/55297516/8429ea3f-b11b-4d4d-8f00-9bd59dba2059)<br><br>



