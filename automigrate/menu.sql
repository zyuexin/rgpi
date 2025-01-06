DELETE FROM menus;
INSERT INTO menus (`id`, `name`, `parent_id`, `path`, `level`, `icon`, `sort_order`, `description`) 
VALUES
('system', 'System', NULL, '/system', 0, 'icon-monitor-cog', 0, 'System''s Information'),
('moniter', 'Moniter', 'system', '/system/moniter', 1, 'icon-circle-gauge', 0, 'System Moniter'),
('logs', 'Logs', 'system', '/system/logs', 1, 'icon-logs', 1, 'System Logs'),
('storage', 'Storage', NULL, '/storage', 0, 'icon-archive', 1, 'Storage Server'),
('substorage1', 'Substorage1', 'storage', '/storage/substorage1', 1, 'icon-flask-conical', 0, 'Description for substorage1'),
('substorage2', 'Substorage2', 'storage', '/storage/substorage2', 1, 'icon-flask-conical', 1, 'Description for substorage2');