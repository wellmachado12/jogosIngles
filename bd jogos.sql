drop database jogosDigitais;
create database jogosDigitais;

use jogosDigitais;

create table jogos(
id int primary key auto_increment,
nome varchar (80) not null,
genero varchar (80) not null,
estudio varchar (80) not null,
data_lancamento varchar (80) not null
);

insert into jogos (nome, genero, estudio, data_lancamento) values
("God of War", "Ação-aventura", "Santa Monica Studio", "22/03/2005"),
("Super Mario World", "Aventura", "Nintendo", "21/09/1990"),
("Silent Hill", "Terror psicológico", "Konami Digital Entertainment", "23/02/1999");

select * from jogos;