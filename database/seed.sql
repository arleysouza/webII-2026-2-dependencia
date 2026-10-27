BEGIN;

INSERT INTO students (ra, name) VALUES
    (258001, 'Ana Clara Silva'),
    (258002, 'Bruno Henrique Santos'),
    (258003, 'Camila Oliveira Souza');

INSERT INTO courses (id, name) VALUES
    (1, 'Algoritmos e Lógica de Programação'),
    (2, 'Desenvolvimento Web I'),
    (3, 'Design Digital'),
    (4, 'Engenharia de Software I'),
    (5, 'Modelagem de Banco de Dados'),
    (6, 'Sistemas Operacionais e Redes de Comp.'),
    (7, 'Técnicas de Programação I'),
    (8, 'Desenvolvimento Web II'),
    (9, 'Matemática para computação'),
    (10, 'Engenharia de Software II'),
    (11, 'Banco de Dados – Relacional'),
    (12, 'Estrutura de Dados'),
    (13, 'Desenvolvimento Web III'),
    (14, 'Álgebra Linear'),
    (15, 'Gestão Ágil de Projetos de Software'),
    (16, 'Banco de Dados - Não Relacional'),
    (17, 'Interação Humano Computador'),
    (18, 'Inglês I'),
    (19, 'Integração e Entrega Contínua'),
    (20, 'Laboratório de Desenvolvimento Web'),
    (21, 'Internet das Coisas e Aplicações'),
    (22, 'Programação para Dispositivos Móveis I'),
    (23, 'Estatística Aplicada'),
    (24, 'Experiência do Usuário'),
    (25, 'Inglês II'),
    (26, 'Computação em Nuvem I'),
    (27, 'Aprendizagem de Máquina'),
    (28, 'Lab. de Des. para Dispositivos Móveis'),
    (29, 'Programação para Dispositivos Móveis II'),
    (30, 'Segurança no Des. de Aplicações'),
    (31, 'Fundamentos da Redação técnica'),
    (32, 'Inglês III'),
    (33, 'Computação em Nuvem II'),
    (34, 'Processamento de Linguagem Natural'),
    (35, 'Laboratório de Des. Multiplataforma'),
    (36, 'Mineração de Dados'),
    (37, 'Qualidade e Testes de Software'),
    (38, 'Ética Profissional e Patente'),
    (39, 'Inglês IV');

-- Sincroniza a sequência após inserir IDs explícitos.
SELECT setval(pg_get_serial_sequence('courses', 'id'), (SELECT MAX(id) FROM courses));

INSERT INTO enrollments (student_ra, course_id) VALUES
    -- Ana Clara: 5 disciplinas.
    (258001, 1),
    (258001, 2),
    (258001, 3),
    (258001, 4),
    (258001, 5),
    -- Bruno Henrique: 7 disciplinas.
    (258002, 6),
    (258002, 7),
    (258002, 8),
    (258002, 9),
    (258002, 10),
    (258002, 11),
    (258002, 12),
    -- Camila: 10 disciplinas.
    (258003, 13),
    (258003, 14),
    (258003, 15),
    (258003, 16),
    (258003, 17),
    (258003, 18),
    (258003, 19),
    (258003, 20),
    (258003, 21),
    (258003, 22);

COMMIT;
