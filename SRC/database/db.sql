





-- Create a new table called 'TipoUser' in schema '
-- Drop the table if it already exists

-- Create the table in the specified schema
CREATE TABLE TipoUser
(
    idTU INT NOT NULL PRIMARY KEY, -- primary key column
    tipo VARCHAR(10) NOT NULL
    -- specify more columns here
);


-- Create the table in the specified schema
CREATE TABLE Users
(
    idU serial NOT NULL PRIMARY KEY, -- primary key column
    nameUser VARCHAR(50) not null,
    pass Varchar(255) NOT NULL,
    idTU int REFERENCES TipoUser(idTU) NOT NULL
    -- specify more columns here
);


-- Create the table in the specified schema
CREATE TABLE TipoArchivo
(
    idTA serial NOT NULL PRIMARY KEY, -- primary key column
    tipo VARCHAR(20) NOT NULL
    -- specify more columns here
);



-- Create the table in the specified schema
CREATE TABLE Concesionario
(
    IdC serial NOT NULL PRIMARY KEY,
    -- primary key column
    nombre VARCHAR(20) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    nit bigint not null,
    telefono bigint NOT NULL,
    correoCliente VARCHAR(100) NOT null,
    correoEmpresa VARCHAR(100) NOt NULL,
    celular bigint not NULL,
    idtu int REFERENCES TipoUser(idTU),
    idU bigint REFERENCES Users(idU)
    -- specify more columns here
);



CREATE TABLE Empleado
(
    idE serial NOT NULL PRIMARY KEY, -- primary key column
    cedula bigint NOT NULL,
    nombre VARCHAR(66) NOT NULL,
    cargo VARCHAR(50),
    celular bigint not NULL,
    correo VARCHAR(100) NOT NULL,
    idtu INT REFERENCES TipoUser(idTU), 
    idU bigint REFERENCES Users(idU)
    -- specify more columns here
);



-- Create the table in the specified schema
CREATE TABLE Archivo
(
    idA serial NOT NULL PRIMARY KEY, -- primary key column
    nombre VARCHAR(100) NOT NULL,
    rutaBucket VARCHAR(100) NOT NULL,
    HahS VARCHAR(255) not NULL,
    idTA int REFERENCES TipoArchivo(idTA),
    FechaSubida DATE not NULL,
    HoraSubida TIME not NULL,
    idC bigint REFERENCES Concesionario(idC) 
    -- specify more columns here
);



-- Create the table in the specified schema
CREATE TABLE LogVisitaArchivo
(
    LogVisitaArchivoId serial NOT NULL PRIMARY KEY, -- primary key column
    idA bigint REFERENCES Archivo(idA) NOt NULL,
    idE bigint REFERENCES Empleado(idE) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL
    -- specify more columns here
);


