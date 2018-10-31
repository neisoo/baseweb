-- Table

CREATE TABLE `SDM_Login_Group` (
  `groupID` int(11) NOT NULL AUTO_INCREMENT,
  `groupShortName` varchar(45) DEFAULT NULL,
  `groupDes` text,
  `status` char(1) DEFAULT 'A',
  PRIMARY KEY (`groupID`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;


CREATE TABLE `SDM_Login_GroupPermission` (
  `groupID` int(11) NOT NULL,
  `permissionKey` varchar(45) NOT NULL,
  PRIMARY KEY (`groupID`,`permissionKey`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


CREATE TABLE `SDM_Login_Permission` (
  `permissionKey` varchar(45) NOT NULL,
  `permissionDesc` text,
  PRIMARY KEY (`permissionKey`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


CREATE TABLE `SDM_Login_User` (
  `userid1` varchar(45) NOT NULL,
  `userid2` varchar(45) NOT NULL DEFAULT '',
  `password1` varchar(45) NOT NULL,
  `password2` varchar(45) NOT NULL DEFAULT '',
  `status` char(1) NOT NULL DEFAULT 'S',
  `email` varchar(150) DEFAULT '',
  `lastLoginDt` timestamp NULL DEFAULT NULL,
  `lastFailLoginDt` timestamp NULL DEFAULT NULL,
  `loginToken` varchar(100) DEFAULT NULL,
  `lastAccessDt` timestamp NULL DEFAULT NULL,
  `ipAddress` varchar(32) DEFAULT '',
  `lastUpdteDt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid1`,`userid2`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


CREATE TABLE `SDM_Login_UserGroup` (
  `groupID` int(11) NOT NULL,
  `userid1` varchar(45) NOT NULL DEFAULT '',
  `userid2` varchar(45) NOT NULL DEFAULT '',
  PRIMARY KEY (`groupID`,`userid1`,`userid2`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


CREATE TABLE `SDM_Login_UserPermission` (
  `userid1` varchar(45) NOT NULL,
  `userid2` varchar(45) NOT NULL DEFAULT '',
  `permissionKey` varchar(45) NOT NULL,
  `accessType` char(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY (`userid1`,`userid2`,`permissionKey`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


-- Stored Procedure




DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_DisableUser_delete`(
	IN _token VARCHAR(100),
	IN _userid VARCHAR(45)
)
BEGIN
	IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE loginToken = _token AND status = 'A') THEN
		UPDATE
			SDM_Login_User
		SET
			status = 'P'
		WHERE
			loginToken = _token
		AND userid1 = _userid;

		IF ROW_COUNT() > 0 THEN
			SELECT 'SUCCESS' AS 'result';
		ELSE
			SELECT 'DBFAIL' AS 'result';
		END IF;
	ELSE
		SELECT 'FAIL' AS 'result';
	END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_enableUser_delete`(
	IN _token VARCHAR(100),
	IN _userid VARCHAR(45)
)
BEGIN
	IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE loginToken = _token AND status = 'P') THEN
		UPDATE
			SDM_Login_User
		SET
			status = 'A'
		WHERE
			loginToken = _token
		AND userid1 = _userid;

		IF ROW_COUNT() > 0 THEN
			SELECT 'SUCCESS' AS 'result';
		ELSE
			SELECT 'DBFAIL' AS 'result';
		END IF;
	ELSE
		SELECT 'FAIL' AS 'result';
	END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_GroupAdd`(
	IN _groupName VARCHAR(45),
	IN _groupDesc TEXT
)
BEGIN
	
	IF NOT EXISTS(SELECT 1 FROM SDM_Login_Group WHERE groupShortName = _groupName) THEN
		INSERT INTO
			SDM_Login_Group(groupShortName, groupDes, status)
		VALUES
			(_groupName, _groupDesc, 'A');

		IF ROW_COUNT() > 0 THEN
			SELECT 'SUCCESS' AS 'result',
			LAST_INSERT_ID() AS 'groupID'; 
		ELSE
			SELECT 'DB_FAIL' AS 'result';
		END IF;
	ELSE
		SELECT 'DUPLICATE_GROUPNAME' AS 'result';
	END IF;
	
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_GroupDelete`(
	IN _groupid INT(11)
)
BEGIN
	IF EXISTS(SELECT 1 FROM SDM_Login_Group WHERE groupID = _groupid) THEN
		DELETE FROM
			SDM_Login_Group
		WHERE
			groupID = _groupid;
		
		DELETE FROM
			SDM_Login_UserGroup
		WHERE
			groupID = _groupid;
		SELECT 'SUCCESS' AS 'result';
	ELSE
		SELECT 'INVALID_GROUPID' AS 'result';
	END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_GroupEdit`(
	IN _groupid INT(11),
	IN _groupName VARCHAR(45),
	IN _groupDesc TEXT
)
BEGIN
	IF EXISTS(SELECT 1 FROM SDM_Login_Group WHERE groupID = _groupid) THEN
		IF NOT EXISTS(SELECT 1 FROM SDM_Login_Group WHERE groupShortName = _groupName AND groupID != _groupid) THEN
			UPDATE
				SDM_Login_Group
			SET 
				groupShortName = _groupName, groupDes = _groupDesc
			WHERE
				groupID = _groupid;

			SELECT 'SUCCESS' AS 'result';
		ELSE
			SELECT 'DUPLICATE_GROUPNAME' AS 'result';
		END IF;
	ELSE
		SELECT 'INVALID_GROUPID' AS 'result';
	END IF;
END$$
DELIMITER ;




DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_GroupEditUser`(
	IN _userid VARCHAR(45),
	IN _userid2 VARCHAR(45),
	IN _groupid INT(11),
	IN _action CHAR(1)
)
BEGIN
	SET _userid2='';

	IF(_action = 'A') THEN
		IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE userid1 = _userid AND userid2 = _userid2 AND status = 'A') THEN
			IF EXISTS(SELECT 1 FROM SDM_Login_Group WHERE groupID = _groupid AND status = 'A') THEN
				IF NOT EXISTS(SELECT 1 FROM SDM_Login_UserGroup WHERE groupID = _groupid AND userid1 = _userid AND userid2 = _userid2) THEN
					INSERT INTO
						SDM_Login_UserGroup(groupID, userid1, userid2)
					VALUES
						(_groupid, _userid, _userid2);
				ELSE
					SELECT 'EXISTING_GROUP_USER' AS 'result';
				END IF;
			ELSE
				SELECT 'INVALID_GROUPID' AS 'result';
			END IF;

			SELECT 'SUCCESS' AS 'result';
		ELSE
			SELECT 'INVALID_USERID' AS 'result';
		END IF;
	ELSEIF(_action = 'R') THEN
		IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE userid1 = _userid AND userid2 = _userid2 AND status = 'A') THEN
			IF EXISTS(SELECT 1 FROM SDM_Login_Group WHERE groupID = _groupid AND status = 'A') THEN
				IF EXISTS(SELECT 1 FROM SDM_Login_UserGroup WHERE groupID = _groupid AND userid1 = _userid AND userid2 = _userid2) THEN
					DELETE FROM
						SDM_Login_UserGroup
					WHERE
						userid1 = _userid
						AND userid2 = _userid2
						AND groupID = _groupid;
				ELSE
					SELECT 'NOTEXISTING_GROUP_USER' AS 'result';
				END IF;
			ELSE
				SELECT 'INVALID_GROUPID' AS 'result';
			END IF;

			SELECT 'SUCCESS' AS 'result';
		ELSE
			SELECT 'INVALID_USERID' AS 'result';
		END IF;
	END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_GroupShowAll`()
BEGIN
	SELECT
		groupID,
		groupShortName,
		groupDes
	FROM
		SDM_Login_Group;
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_GroupShowAllUser`(
	IN _groupid INT(11)
)
BEGIN
	IF EXISTS(SELECT 1 FROM SDM_Login_Group WHERE groupID = _groupid) THEN
		SELECT
			LGROUP.groupShortName,
			LGROUP.groupDes,
			LGROUP.groupID,
			LUSERGROUP.userid1,
			'SUCCESS' AS 'result',
			LU.status
		FROM
			SDM_Login_UserGroup LUSERGROUP
		RIGHT JOIN
			SDM_Login_Group LGROUP
			ON
			LUSERGROUP.groupID = LGROUP.groupID
		LEFT JOIN 
			SDM_Login_User LU
			ON LU.userid1 = LUSERGROUP.userid1
			AND LU.userid2 = LUSERGROUP.userid2
		WHERE
			LGROUP.groupID = _groupid
			AND LGROUP.status = 'A';

	ELSE
		SELECT 'INVALID_GROUPID' AS 'result';
	END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_LoginSubmitChecking`(
	IN _userid1 VARCHAR(45),
	IN _password1 VARCHAR(45),
	IN _ipAddress VARCHAR(32)
)
BEGIN

	DECLARE _lastLoginSuccessTime TIMESTAMP;
	DECLARE _lastLoginFailTime TIMESTAMP;
	DECLARE _loginToken VARCHAR(100);


	SELECT
		lastLoginDt,lastFailLoginDt INTO
		_lastLoginSuccessTime,_lastLoginFailTime
	FROM
		SDM_Login_User WHERE userid1 = _userid1
		AND	password1 = md5(_password1)	AND status='A';


	SET _loginToken = md5(CONCAT(_userid1, now()));

	UPDATE 
		SDM_Login_User 
	SET 
		lastLoginDt = NOW(),
		loginToken = _loginToken,
		lastAccessDt = now(),
		ipAddress = _ipAddress
	WHERE 
		userid1 = _userid1
		AND	password1 = md5(_password1)
		AND status='A';

	IF ROW_COUNT()>0 THEN
		SELECT 'SUCCESS' AS 'result' , _lastLoginSuccessTime AS 'lastSuccess',_lastLoginFailTime AS 'lastFail' , _loginToken AS 'loginToken';
	ELSE 
		UPDATE 
			SDM_Login_User 
		SET 
			lastFailLoginDt = NOW()
		WHERE 
			userid1 = _userid1;

		SELECT 'FAIL' AS 'result' , _lastLoginSuccessTime AS 'lastSuccess',_lastLoginFailTime AS 'lastFail' , '' AS 'loginToken';
	END IF;

END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_LoginVerify`(
	IN _token VARCHAR(100),
	IN _sessionTimeOutLimit int,
	IN _extendSession int,
	IN _ipAddress VARCHAR(32)

)
BEGIN

	DECLARE _lastAccessDt TIMESTAMP;

	SELECT 
		lastAccessDt INTO _lastAccessDt
	FROM
		SDM_Login_User
	WHERE
		loginToken = _token;

	IF EXISTS (SELECT 1 FROM SDM_Login_User WHERE loginToken = _token AND ipAddress = _ipAddress) THEN
		IF ((_lastAccessDt + INTERVAL _sessionTimeOutLimit SECOND) < now()) THEN
			UPDATE
				SDM_Login_User
			SET
				loginToken = NULL,
				lastAccessDt = NULL,
				ipAddress = ''
			WHERE
				loginToken = _token;
			SELECT 'TIMEOUT' AS 'result';
		ELSE
			IF (_extendSession = 1) THEN
				UPDATE
					SDM_Login_User
				SET
					lastAccessDt = now()
				WHERE 
					loginToken = _token;
			END IF;
			SELECT 'LOGIN' AS 'result';
		END IF;
	Else
		SELECT 'NOTLOGIN' AS 'result';
		
	END IF;


END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_LogoutSubmit`(
	IN _token VARCHAR(100)
)
BEGIN
	
	UPDATE
		SDM_Login_User
	SET
		loginToken = NULL,
		lastAccessDt = NULL
	WHERE
		loginToken = _token;

	IF ROW_COUNT() > 0 THEN
		SELECT 'SUCCESS' AS 'result';
	ELSE
		SELECT 'FAIL' AS 'result';
	END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_PermissionAdd`(
	IN _permissionKey VARCHAR(45),
	IN _permissionDesc VARCHAR(100)
)
BEGIN

	IF NOT EXISTS (SELECT 1 FROM SDM_Login_Permission WHERE permissionKey = _permissionKey) THEN
		INSERT INTO 
			SDM_Login_Permission (permissionKey, permissionDesc)
		VALUES
			(_permissionKey, _permissionDesc);

		IF ROW_COUNT() > 0 THEN
			SELECT 'SUCCESS' AS 'result';
		ELSE
			SELECT 'FAIL' AS 'result';
		END IF;
	ELSE
		SELECT 'DUPLICATE_PERMISSIONKEY' AS 'result';
		
	END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_PermissionAssignToUser`(
	IN _userid VARCHAR(45),
	IN _userid2 VARCHAR(45),
	IN _permissionKey VARCHAR(45),
	IN _accessType CHAR(1)
)
BEGIN

	SET _userid2='';
	IF EXISTS(SELECT 1 FROM SDM_Login_Permission WHERE permissionKey = _permissionKey) THEN
		IF (_accessType = 'A') OR (_accessType = 'D') THEN
			IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE userid1 = _userid AND userid2 = _userid2) THEN
				IF EXISTS(SELECT 1 FROM SDM_Login_UserPermission WHERE userid1 = _userid AND userid2 = _userid2 AND permissionKey = _permissionKey) THEN
					UPDATE
						SDM_Login_UserPermission
					SET
						accessType = _accessType
					WHERE
						userid1 = _userid
					AND permissionKey = _permissionKey;

					SELECT 'SUCCESS' AS 'result';
				ELSE
					INSERT INTO
						SDM_Login_UserPermission(userid1, permissionKey, accessType)
					VALUES
						(_userid, _permissionKey, _accessType);
					
					IF ROW_COUNT()>0 THEN
						SELECT 'SUCCESS' AS 'result';
					ELSE
						SELECT 'DB_FAIL' AS 'result';
					END IF;
				END IF;
			ELSE
				SELECT 'INVALID_USERID' AS 'result';
			END IF;
		ELSEIF (_accessType = 'R') THEN
			DELETE FROM
				SDM_Login_UserPermission
			WHERE
				userid1 = _userid
				AND userid2 = _userid2
				AND permissionKey = _permissionKey;

			SELECT 'SUCCESS' AS 'result';
		ELSE
			SELECT 'FAIL' AS 'result';
		END IF;
	ELSE
		SELECT 'INVALID_PERMISSIONKEY' AS 'result';
	END IF;

END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_PermissionDelete`(
	IN _permissionKey VARCHAR(45)
)
BEGIN
	IF EXISTS (SELECT 1 FROM SDM_Login_Permission WHERE permissionKey = _permissionKey) THEN
		DELETE FROM 
			SDM_Login_Permission
		WHERE 
			permissionKey = _permissionKey;
		
		DELETE FROM
			SDM_Login_GroupPermission
		WHERE
			permissionKey = _permissionKey;

		DELETE FROM
			SDM_Login_UserPermission
		WHERE
			permissionKey = _permissionKey;

		SELECT 'SUCCESS' AS 'result';
	ELSE
		SELECT 'FAIL' AS 'result';

	END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_PermissionEdit`(
	IN _permissionKey VARCHAR(45),
	IN _permissionDesc TEXT
)
BEGIN
	
	IF EXISTS (SELECT 1 FROM SDM_Login_Permission WHERE permissionKey = _permissionKey) THEN
		UPDATE
			SDM_Login_Permission
		SET
			permissionDesc = _permissionDesc
		WHERE
			permissionKey = _permissionKey;

			SELECT 'SUCCESS' AS 'result';
			
	ELSE
		SELECT 'INVALID_PERMISSIONKEY' AS 'result';
	END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_PermissionGrantToGroup`(
	IN _groupid INT(11),
	IN _permissionKey VARCHAR(45)
)
BEGIN
	IF EXISTS(SELECT 1 FROM SDM_Login_Group WHERE groupID = _groupid) THEN
		IF EXISTS(SELECT 1 FROM SDM_Login_Permission WHERE permissionKey = _permissionKey) THEN
			IF NOT EXISTS(SELECT 1 FROM SDM_Login_GroupPermission WHERE groupID = _groupid AND permissionKey = _permissionKey) THEN
				INSERT INTO
					SDM_Login_GroupPermission(groupID, permissionKey)
				VALUES
					(_groupid, _permissionKey);

				SELECT 'SUCCESS' AS 'result';
			ELSE
				SELECT 'SUCCESS' AS 'result';
			END IF;
		ELSE
			SELECT 'INVALID_PERMISSIONKEY' AS 'result';
		END IF;
	ELSE
		SELECT 'INVALID_GROUPID' AS 'result';
	END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_PermissionRemoveFromGroup`(
	IN _groupid INT(11),
	IN _permissionKey VARCHAR(45)
)
BEGIN
	IF(SELECT 1 FROM SDM_Login_Group WHERE groupID = _groupid) THEN
		IF(SELECT 1 FROM SDM_Login_Permission WHERE permissionKey = _permissionKey) THEN
			DELETE FROM
				SDM_Login_GroupPermission
			WHERE
				groupID = _groupid
				AND permissionKey = _permissionKey;

			SELECT 'SUCCESS' AS 'result';
		ELSE
			SELECT 'INVALID_PERMISSIONKEY' AS 'result';
		END IF;
	ELSE
		SELECT 'INVALID_GROUPID' AS 'result';
	END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_PermissionShowAll`()
BEGIN
		SELECT
			permissionKey,
			'SYS' AS 'permissionType',
			permissionDesc
		FROM
			SDM_Login_Permission
		WHERE
			permissionKey LIKE 'SYS_SDM%'
		UNION
		SELECT
			permissionKey,
			'USER' AS 'permissionType',
			permissionDesc
		FROM
			SDM_Login_Permission
		WHERE
			permissionKey NOT LIKE 'SYS_SDM%';
END$$
DELIMITER ;



DELIMITER $$

CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_PermissionShowAllOfGroup`(
	IN _groupid VARCHAR(45)
)
BEGIN
	IF EXISTS(SELECT 1 FROM SDM_Login_Group WHERE groupID = _groupid) THEN
			SELECT 
				permissionKey,
				'SUCCESS' AS 'result',
				'SYS' AS 'permissionType'
			FROM
				SDM_Login_GroupPermission
			WHERE
				groupID = _groupid
				AND permissionKey LIKE 'SYS_SDM%'
			UNION
			SELECT
				permissionKey,
				'SUCCESS' AS 'result',
				'USER' AS 'permissionType'
			FROM
				SDM_Login_GroupPermission
			WHERE
				groupID = _groupid
				AND permissionKey NOT LIKE 'SYS_SDM%';
	ELSE
		SELECT 'INVALID_GROUPID' AS 'result';
	END IF;
	
END



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_PermissionShowAllOfUser`(
	-- IN _token VARCHAR(100),
	IN _userid VARCHAR(45)
)
BEGIN

	IF EXISTS(SELECT 1 FROM SDM_Login_User Where userid1 = _userid) THEN
		SELECT
			'SUCCESS' AS 'result',
			permissionKey,
			'SYS' AS 'permissionType',
			accessType
		FROM
			SDM_Login_UserPermission
		WHERE
			userid1 = _userid
			AND permissionKey LIKE 'SYS_SDM%'
		UNION
		SELECT
			'SUCCESS' AS 'result',
			permissionKey,
			'USER' AS 'permissionType',
			accessType
		FROM
			SDM_Login_UserPermission
		WHERE
			userid1 = _userid
			AND permissionKey NOT LIKE 'SYS_SDM%';
	ELSE
		SELECT 'INVALID_USERID' AS 'result';
	END IF;
END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_PermissionVerify`(
	IN _token VARCHAR(100),
	IN _sessionTimeOutLimit int,
	IN _permissonKey VARCHAR(45)
)
BEGIN
	DECLARE _userid VARCHAR(45);
	DECLARE _groupID INT(11);
	
	IF EXISTS (SELECT 1 FROM SDM_Login_User WHERE loginToken = _token) Then
		IF NOT EXISTS (
						SELECT 
							1 
						FROM 
							SDM_Login_UserPermission LUSERPERMISSION
						INNER JOIN
							SDM_Login_User LUSER
							ON
								LUSER.userid1 = LUSERPERMISSION.userid1
							AND LUSER.userid2 = LUSERPERMISSION.userid2
						WHERE
							LUSER.loginToken = _token
						AND	LUSERPERMISSION.permissionKey = _permissonKey 
						AND LUSERPERMISSION.accessType = 'D') 
		THEN
			IF EXISTS (SELECT 
							1 
						FROM 
							SDM_Login_UserPermission LUSERPERMISSION
						INNER JOIN
							SDM_Login_User LUSER
							ON
								LUSER.userid1 = LUSERPERMISSION.userid1
							AND LUSER.userid2 = LUSERPERMISSION.userid2
						WHERE
							LUSER.loginToken = _token
						AND	LUSERPERMISSION.permissionKey = _permissonKey 
						AND LUSERPERMISSION.accessType = 'A') 
					THEN
						SELECT 'PASS' AS 'result';
					ELSE
				IF(
					SELECT 
						1
					FROM 
						SDM_Login_User LUSER
					INNER JOIN 
						SDM_Login_UserGroup LGROUP
						ON 
						LUSER.userid1 = LGROUP.userid1
						
					INNER JOIN
						SDM_Login_GroupPermission LPERMG
						ON
						LGROUP.groupID = LPERMG.groupID
						
					WHERE
						LUSER.loginToken = _token
						AND	(LUSER.lastAccessDt + INTERVAL _sessionTimeOutLimit SECOND) > now()
						AND LUSER.status = 'A'
						AND LPERMG.permissionKey = _permissonKey)
				THEN
						SELECT 'PASS' AS 'result';
				ELSE
					SELECT 'NOTPASS' AS 'result';
				END IF;
			END IF;
		ELSE
			SELECT 'NOTPASS' AS 'result';
		END IF;
	ELSE
		SELECT 'NOTPASS' AS 'result';
	END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_UserAdd`(
	IN _userid VARCHAR(45),
	IN _password VARCHAR(45),
	IN _email VARCHAR(150),
	IN _status CHAR(1)
)
BEGIN
	IF NOT EXISTS(SELECT 1 FROM SDM_Login_User WHERE userid1 = _userid) THEN
		INSERT INTO
			SDM_Login_User (userid1, password1, password2, email, status)
		VALUES
			(_userid, md5(_password),md5(''), _email, _status);
		IF ROW_COUNT()>0 THEN
			SELECT 'SUCCESS' AS 'result';
		ELSE
			SELECT 'DB_FAIL' AS 'result';
		END IF;
	ELSE
		SELECT 'DUPLICATE_USERID' AS 'result';
	END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_UserEditPassword`(
	IN _token VARCHAR(100),
	IN _oldPassword VARCHAR(45),
	IN _newPassword VARCHAR(45),
	IN _extendSession int
)
BEGIN
	IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE loginToken = _token AND status = 'A') THEN
		IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE password1 = md5(_oldPassword) AND loginToken = _token) THEN
			UPDATE
				SDM_Login_User
			SET
				password1 = md5(_newPassword)
			WHERE
				loginToken = _token;

			IF (_extendSession = 1) THEN
				UPDATE
					SDM_Login_User
				SET
					lastAccessDt = now()
				WHERE 
					loginToken = _token;
			END IF;
			IF ROW_COUNT() > 0 THEN
				SELECT 'SUCCESS' AS 'result';
			ELSE
				SELECT 'DB_FAIL' AS 'result';
			END IF;
		ELSE
			SELECT 'INVALID_OLDPASSWORD' AS 'result';
		END IF;
	END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_UserEditStatus`(
	IN _userid1 VARCHAR(45),
	IN _userid2 VARCHAR(45),
	IN _status CHAR(1)
)
BEGIN
	SET _userid2='';
	
	IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE userid1 = _userid1 AND userid2 = _userid2) THEN
		UPDATE
			SDM_Login_User
		SET
			status = _status
		WHERE
			userid1 = _userid1
		AND userid2 = _userid2;

		SELECT 'SUCCESS' AS 'result';
		
	ELSE
		SELECT 'INVALID_USERID' AS 'result';
	END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_PermissionShowAllOfGroup`(
	-- IN _token VARCHAR(100),
	IN _groupid VARCHAR(45)
)
BEGIN
	IF EXISTS(SELECT 1 FROM SDM_Login_Group WHERE groupID = _groupid) THEN
		IF EXISTS(SELECT 1 FROM SDM_Login_GroupPermission WHERE groupID = _groupid) THEN
			SELECT 
				permissionKey,
				'SUCCESS' AS 'result'
			FROM
				SDM_Login_GroupPermission
			WHERE
				groupID = _groupid;
		ELSE
			SELECT 'NOPERMISSIONKEY' AS 'result';
		END IF;
	ELSE
		SELECT 'INVALID_GROUPID' AS 'result';
	END IF;
	
END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_UserShowAll`()
BEGIN
	SELECT
		userid1,
		status
	FROM
		SDM_Login_User;
END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`leonardo`@`%` PROCEDURE `sp_SDM_AccessControl_UserShowDetail`(
	IN _userid VARCHAR(45),
	IN _userid2 VARCHAR(45)
)
BEGIN
	IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE userid1 = _userid AND userid2 = _userid2) THEN
		IF NOT EXISTS(SELECT 1 FROM SDM_Login_UserGroup WHERE userid1 = _userid AND userid2 = _userid2) THEN
			SELECT
				LUSER.userid1,
				LUSER.status,
				LUSER.lastLoginDt,
				LUSER.lastFailLoginDt,
				LUSER.lastAccessDt,
				LUSER.lastUpdteDt,
				'SUCCESS' AS 'result',
				'NOGROUPOFUSER' AS 'result2'
			FROM
				SDM_Login_User LUSER
			WHERE
				LUSER.userid1 = _userid
				AND LUSER.userid2 = _userid2;
		ELSE
			SELECT
				LUSER.userid1,
				LUSER.status,
				LUSER.lastLoginDt,
				LUSER.lastFailLoginDt,
				LUSER.lastAccessDt,
				LUSER.lastUpdteDt,
				LGROUP.groupID,
				LGROUP.groupShortName,
				'SUCCESS' AS 'result',
				'GROUPUSER' AS 'result2'
			FROM
				SDM_Login_User LUSER
			INNER JOIN
				SDM_Login_UserGroup LUSERGROUP
				ON
					LUSERGROUP.userid1 = _userid
					AND LUSERGROUP.userid2 = _userid2
			INNER JOIN
				SDM_Login_Group LGROUP
				ON
					LGROUP.groupID = LUSERGROUP.groupID
			WHERE
				LUSER.userid1 = _userid
				AND LUSER.userid2 = _userid2;
		END IF;
	ELSE
		SELECT 'INVALID_USERID' AS 'result';
	END IF;
END$$
DELIMITER ;








-- Data


INSERT INTO SDM_Login_Permission VALUES('SYS_SDM_USER_ADD', 'Add New User');
INSERT INTO SDM_Login_Permission VALUES('SYS_SDM_USER_EDIT', 'Edit User');
INSERT INTO SDM_Login_Permission VALUES('SYS_SDM_USER_DEL', 'Delete User Account');
INSERT INTO SDM_Login_Permission VALUES('SYS_SDM_USER_ENABLE_DISABLE', 'Enable or Disable User Account');
INSERT INTO SDM_Login_Permission VALUES('SYS_SDM_GROUP_ADD', 'Add a new user group');
INSERT INTO SDM_Login_Permission VALUES('SYS_SDM_GROUP_EDIT', 'Update user group description');
INSERT INTO SDM_Login_Permission VALUES('SYS_SDM_GROUP_DEL', 'Delete a user group');
INSERT INTO SDM_Login_Permission VALUES('SYS_SDM_GROUP_EDITUSER', 'Add or remove user from group');
INSERT INTO SDM_Login_Permission VALUES('SYS_SDM_PERMISSION_ADD', 'Add permission to system');
INSERT INTO SDM_Login_Permission VALUES('SYS_SDM_PERMISSION_DEL', 'Delete permission in system');
INSERT INTO SDM_Login_Permission VALUES('SYS_SDM_PERMISSION_EDIT', 'Update permission description');
INSERT INTO SDM_Login_Permission VALUES('SYS_SDM_PERMISSION_VIEWOTHER', 'Show other user permission');
INSERT INTO SDM_Login_Permission VALUES('SYS_SDM_PERMISSION_ASSIGN', 'Assign permission to user or group');
INSERT INTO SDM_Login_Permission VALUES('SYS_SDM_GROUP_SHOWALLUSER', 'Show all user of group');
INSERT INTO SDM_Login_Permission VALUES('SYS_SDM_USER_SHOWDETAIL', 'Show user detail');
INSERT INTO SDM_Login_Permission VALUES('SYS_SDM_USER_SHOWALL', 'Show all user in system');





INSERT INTO SDM_Login_User VALUES('SystemAdmin','',md5('admin'),md5(''),'A','',NULL,NULL,NULL,NULL,'',NOW());



INSERT INTO SDM_Login_UserPermission VALUES('SystemAdmin','','SYS_SDM_USER_ADD','A');
INSERT INTO SDM_Login_UserPermission VALUES('SystemAdmin','','SYS_SDM_USER_EDIT','A');
INSERT INTO SDM_Login_UserPermission VALUES('SystemAdmin','','SYS_SDM_USER_DEL','A');
INSERT INTO SDM_Login_UserPermission VALUES('SystemAdmin','','SYS_SDM_USER_ENABLE_DISABLE','A');
INSERT INTO SDM_Login_UserPermission VALUES('SystemAdmin','','SYS_SDM_GROUP_ADD','A');
INSERT INTO SDM_Login_UserPermission VALUES('SystemAdmin','','SYS_SDM_GROUP_EDIT','A');
INSERT INTO SDM_Login_UserPermission VALUES('SystemAdmin','','SYS_SDM_GROUP_DEL','A');
INSERT INTO SDM_Login_UserPermission VALUES('SystemAdmin','','SYS_SDM_GROUP_EDITUSER','A');
INSERT INTO SDM_Login_UserPermission VALUES('SystemAdmin','','SYS_SDM_PERMISSION_ADD','A');
INSERT INTO SDM_Login_UserPermission VALUES('SystemAdmin','','SYS_SDM_PERMISSION_DEL','A');
INSERT INTO SDM_Login_UserPermission VALUES('SystemAdmin','','SYS_SDM_PERMISSION_EDIT','A');
INSERT INTO SDM_Login_UserPermission VALUES('SystemAdmin','','SYS_SDM_PERMISSION_VIEWOTHER','A');
INSERT INTO SDM_Login_UserPermission VALUES('SystemAdmin','','SYS_SDM_PERMISSION_ASSIGN','A');
INSERT INTO SDM_Login_UserPermission VALUES('SystemAdmin','','SYS_SDM_GROUP_SHOWALLUSER','A');
INSERT INTO SDM_Login_UserPermission VALUES('SystemAdmin','','SYS_SDM_USER_SHOWDETAIL','A');
INSERT INTO SDM_Login_UserPermission VALUES('SystemAdmin','','SYS_SDM_USER_SHOWALL','A');




