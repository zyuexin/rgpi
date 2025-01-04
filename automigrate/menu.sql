DELETE FROM menus;
INSERT INTO menus (`id`, `name`, `parent_id`, `path`, `level`, `icon`, `sort_order`, `description`) 
VALUES
('storage', 'Storage', NULL, '/storage', 0, 'icon-archive', 1, 'Storage Server'),
('monitor', 'System Monitor', NULL, '/monitor', 0, 'icon-circle-gauge', 2, 'System Monitor Panel'),
('substorage1', 'Substorage1', 'storage', '/storage/substorage1', 1, 'icon-flask-conical', 1, 'Description for substorage1'),
('substorage2', 'Substorage2', 'storage', '/storage/substorage2', 1, 'icon-flask-conical', 2, 'Description for substorage2');