DELETE FROM todo_status_cates;

INSERT INTO todo_status_cates (name, description) VALUES ('unstarted', 'task not started yet');
INSERT INTO todo_status_cates (name, description) VALUES ('progressing', 'task in progressing');
INSERT INTO todo_status_cates (name, description) VALUES ('done', 'task done');
INSERT INTO todo_status_cates (name, description) VALUES ('cancelled', 'task cancelled');
INSERT INTO todo_status_cates (name, description) VALUES ('suspended', 'task suspended');