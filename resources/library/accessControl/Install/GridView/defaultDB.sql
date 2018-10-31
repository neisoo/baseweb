DELIMITER $$

CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_GridView_GetGridPageFromView`(
    OUT _total INT,
    IN _view VARCHAR(128),
    IN _sort VARCHAR(255),
    IN _limit VARCHAR(128),
    IN _filter VARCHAR(255)
    
)
BEGIN
    SET @a = 0;
    SET @statement1 = CONCAT('SELECT COUNT(*) INTO @a FROM ', _view, _filter);
    PREPARE stmt_select1 FROM @statement1;
    EXECUTE stmt_select1;
    SET _total = @a;

   SET @statement = CONCAT('SELECT * FROM ', _view, _filter ,_sort,_limit);
--    SELECT @statement;
    PREPARE stmt_select FROM @statement;
    EXECUTE stmt_select;
END