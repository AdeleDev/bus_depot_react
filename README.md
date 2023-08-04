# Bus Depot React App
Bus Depot CRUD Application on React.
Grid layout build with React Material UI and Material React Table
Working in pair with [Backend SpringBoot App](https://github.com/AdeleDev/bus_depot_app).

![2023-08-04 19_01_36-](https://github.com/AdeleDev/bus_depot_react/assets/135621284/81d18ad1-84dd-44ae-928c-1eac50abd44d)

![2023-08-04 19_00_12-React App](https://github.com/AdeleDev/bus_depot_react/assets/135621284/d1cc64d1-5715-419f-a07a-ff6a5c534f9a)

### Built With

* [![Javascript][Javascript.io]][Javascript-url]
* [![React][React.io]][React-url]
* [![NodeJs][NodeJs.io]][NodeJs-url]

## Pre-installations

#### Npm install:

  ```sh
  npm install npm@latest -g
  ```
```sh
npm install react-scripts --save
```

#### Reactstrap install:

  ```sh
  npm install reactstrap bootstrap
  ```

#### Clone the repo:

```sh
git clone https://github.com/AdeleDev/employees_react_app.git
```

## Usage

### To build:
The build artifacts will be stored in the `build` directory.

``` sh
npm run build
```

### To start development server:
Navigate to `http://localhost:3000/

```sh
npm start
```

### Via Docker
Switch in terminal to folder where Dockerfile

```sh
docker build . -t bus-depot-frontend
```

Start without backend:

```sh
docker run -d -p 3000:3000 --name  frontend-server bus-depot-frontend
```
Start with backend: set right path in docker compose for both images firstly

```sh
docker-compose up -d
```
<!-- MARKDOWN LINKS & IMAGES -->

[Javascript.io]: https://img.shields.io/badge/-Javascript-lightyellow?style=for-the-badge&logo=javascript

[Javascript-url]: https://www.javascript.com/

[React.io]: https://img.shields.io/badge/React-black?style=for-the-badge&logo=react

[React-url]: https://reactjs.org/

[NodeJs.io]: https://img.shields.io/badge/-Node.js-green?style=for-the-badge&logo=Node.js

[NodeJs-url]: https://nodejs.org/en/
