-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.1.73
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
--
-- Create schema 
--
CREATE DATABASE /*!32312 IF NOT EXISTS*/ GSL_RDMS DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE GSL_RDMS;
--
-- Function `SPLIT_STR`
--
DROP FUNCTION IF EXISTS `SPLIT_STR`;
DELIMITER $$
CREATE FUNCTION `SPLIT_STR`( x VARCHAR(255), delim VARCHAR(12), pos INT ) RETURNS varchar(255) CHARSET latin1
RETURN REPLACE(SUBSTRING(SUBSTRING_INDEX(x, delim, pos), CHAR_LENGTH(SUBSTRING_INDEX(x, delim, pos -1)) + 1),delim, '') $$
DELIMITER ;
--
-- Table structure for table `AppPackage`
--
DROP TABLE IF EXISTS `AppPackage`;
CREATE TABLE `AppPackage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `appID` int(11) NOT NULL,
  `version` varchar(45) NOT NULL,
  `deviceModel` varchar(8) NOT NULL,
  `filePath` varchar(255) NOT NULL,
  `fileSize` float NOT NULL,
  `md5` varchar(32) NOT NULL,
  `releaseNote` varchar(255) DEFAULT NULL,
  `status` char(1) NOT NULL DEFAULT 'N',
  `createDt` datetime NOT NULL,
  `deployDt` datetime DEFAULT NULL,
  `lastUpdateDt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
--
-- Table structure for table `Applications`
--
DROP TABLE IF EXISTS `Applications`;
CREATE TABLE `Applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `packageName` varchar(255) NOT NULL,
  `releaseNote` varchar(45) DEFAULT NULL,
  `status` char(1) NOT NULL DEFAULT 'A',
  `createDt` datetime NOT NULL,
  `removalDt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
--
-- Dumping data for table `Applications`
--
/*!40000 ALTER TABLE `Applications` DISABLE KEYS */;
INSERT INTO `Applications` (`id`,`name`,`packageName`,`releaseNote`,`status`,`createDt`,`removalDt`) VALUES 
 (0,'firmware','0',NULL,'R','2014-10-09 11:11:24',NULL),
 (1,'RDMS','com.gsl.rdms',NULL,'A','2014-10-08 00:00:00',NULL);
/*!40000 ALTER TABLE `Applications` ENABLE KEYS */;
--
-- Table structure for table `AuditLog`
--
DROP TABLE IF EXISTS `AuditLog`;
CREATE TABLE `AuditLog` (
  `userid` varchar(45) NOT NULL,
  `recordDt` datetime NOT NULL,
  `ipAddress` varchar(45) NOT NULL,
  `action` varchar(45) NOT NULL,
  `accessResources` text,
  `result` char(1) NOT NULL COMMENT 'Action result.\nSuccess = "S"\nFail = "F"',
  PRIMARY KEY (`userid`,`recordDt`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
--
-- Table structure for table `Command`
--
DROP TABLE IF EXISTS `Command`;
CREATE TABLE `Command` (
  `commandID` varchar(50) NOT NULL,
  `commandName` varchar(50) NOT NULL,
  `expiryDtInterval` int(11) NOT NULL,
  `processTimeout` int(11) NOT NULL,
  `clientProcessInterval` int(11) DEFAULT '360000',
  PRIMARY KEY (`commandID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
--
-- Dumping data for table `Command`
--
/*!40000 ALTER TABLE `Command` DISABLE KEYS */;
INSERT INTO `Command` (`commandID`,`commandName`,`expiryDtInterval`,`processTimeout`,`clientProcessInterval`) VALUES 
 ('admin_password','Admin Password',86400000,86400000,360000),
 ('factory_reset','Factory Reset',86400000,86400000,360000),
 ('update_app','Update App',86400000,86400000,360000),
 ('install_app','Install App',86400000,86400000,360000),
 ('update_rdms','Update Rdms',86400000,86400000,360000),
 ('reboot','Reboot',86400000,86400000,360000),
 ('download','Download',86400000,86400000,360000),
 ('uninstall_app','Uninstall app',86400000,86400000,360000),
 ('datetime','Datetime',86400000,86400000,360000),
 ('volume','Volume',86400000,86400000,360000),
 ('update_firmware','Update Firmware',86400000,86400000,360000),
 ('set_admin_user_mode','Set Admin/User Mode',86400000,86400000,360000),
 ('set_screen_timeout','Set Screen Timeout',86400000,86400000,360000),
 ('set_screen_lock','Set Screen Lock',86400000,86400000,360000),
 ('set_owner_info','Set Owner Info',86400000,86400000,360000),
 ('key_settings','Key Settings',86400000,86400000,360000),
 ('feature_controls','Feature Controls',86400000,86400000,360000),
 ('report_interval','Report Interval',86400000,86400000,360000),
 ('app_enable','Enable/Disable Application',86400000,86400000,360000),
 ('app_exec','Execute Application',86400000,86400000,360000),
 ('start_remote_ctl','Start Remote Control',86400000,86400000,360000),
 ('stop_remote_ctl','Stop Remote Control',86400000,86400000,360000),
 ('start_remote_shell','Start Remote Shell',86400000,86400000,360000),
 ('set_remote_server','Set Remote Server',86400000,86400000,360000);
/*!40000 ALTER TABLE `Command` ENABLE KEYS */;
--
-- Table structure for table `DeviceSetting`
--
DROP TABLE IF EXISTS `DeviceSetting`;
CREATE TABLE `DeviceSetting` (
  `serialNo` varchar(50) NOT NULL,
  `settingID` varchar(45) NOT NULL,
  `value` varchar(20) NOT NULL,
  PRIMARY KEY (`serialNo`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
--
-- Dumping data for table `DeviceSetting`
--
/*!40000 ALTER TABLE `DeviceSetting` DISABLE KEYS */;
/*!40000 ALTER TABLE `DeviceSetting` ENABLE KEYS */;
--
-- Table structure for table `DeviceStatus`
--
DROP TABLE IF EXISTS `DeviceStatus`;
CREATE TABLE `DeviceStatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serialNo` varchar(50) NOT NULL COMMENT 'Serial Number',
  `powerLevel` int(11) NOT NULL COMMENT 'The percentage of remain',
  `powerStatus` varchar(20) DEFAULT NULL,
  `networkStatus` varchar(10) NOT NULL COMMENT 'mobile / wifi',
  `storageStatus` varchar(100) NOT NULL COMMENT 'Current Available\nStorage(MB) | Total\nStorage(MB)',
  `updateDt` datetime NOT NULL,
  `deviceStatus` char(1) DEFAULT NULL COMMENT 'Device active status.\nActivated = â€œAâ€,\nInactivated = â€œIâ€',
  `OS` varchar(45) DEFAULT NULL,
  `volumeLevelInMedia` int(11) DEFAULT NULL,
  `volumeLevelInRingtone` int(11) DEFAULT NULL,
  `volumeLevelInAlams` int(11) DEFAULT NULL,
  `reportInterval` int(11) DEFAULT NULL,
  `maxVolumeInMedia` int(11) DEFAULT NULL,
  `maxVolumeInRingtone` int(11) DEFAULT NULL,
  `maxVolumeInAlarms` int(11) DEFAULT NULL,
  `firmwareVersion` varchar(50) DEFAULT NULL,
  `ipAddress` varchar(32) DEFAULT NULL,
  `otherInfo` text,
  PRIMARY KEY (`id`,`serialNo`,`updateDt`),
  KEY `idx_serialNo` (`serialNo`),
  KEY `idx_joinRemoteDevice_DESC` (`serialNo`,`updateDt`),
  KEY `idx_view` (`serialNo`,`updateDt`,`OS`,`deviceStatus`),
  KEY `idx_joinRemoteDevice_ASC` (`serialNo`,`updateDt`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
--
-- Table structure for table `DevicesDefaultSetting`
--
DROP TABLE IF EXISTS `DevicesDefaultSetting`;
CREATE TABLE `DevicesDefaultSetting` (
  `settingID` varchar(45) NOT NULL,
  `value` varchar(20) NOT NULL,
  PRIMARY KEY (`settingID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
--
-- Dumping data for table `DevicesDefaultSetting`
--
/*!40000 ALTER TABLE `DevicesDefaultSetting` DISABLE KEYS */;
INSERT INTO `DevicesDefaultSetting` (`settingID`,`value`) VALUES 
 ('reportInterval','5');
/*!40000 ALTER TABLE `DevicesDefaultSetting` ENABLE KEYS */;
--
-- Table structure for table `DownloadQueue`
--
DROP TABLE IF EXISTS `DownloadQueue`;
CREATE TABLE `DownloadQueue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serialNo` varchar(50) NOT NULL,
  `packageID` int(11) NOT NULL,
  `fileType` varchar(50) NOT NULL,
  `src` varchar(255) NOT NULL,
  `md5` varchar(32) NOT NULL,
  `fileSize` float NOT NULL,
  `status` char(1) NOT NULL DEFAULT 'P',
  `priority` int(11) NOT NULL DEFAULT '1',
  `deploymentDt` datetime NOT NULL,
  `createDt` datetime NOT NULL,
  `outgoingCommandID` int(11) DEFAULT NULL,
  `deviceLastSeen` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
--
-- Table structure for table `LogUserPassword`
--
DROP TABLE IF EXISTS `LogUserPassword`;
CREATE TABLE `LogUserPassword` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `recordDt` datetime NOT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
--
-- Table structure for table `OutgoingCommand`
--
DROP TABLE IF EXISTS `OutgoingCommand`;
CREATE TABLE `OutgoingCommand` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Latest id of the S/N + 1\n(Create trigger doing this)',
  `serialNo` varchar(50) NOT NULL COMMENT 'Device serial number',
  `command` varchar(50) NOT NULL COMMENT 'Command to send',
  `message` text DEFAULT NULL COMMENT 'Message to send',
  `status` char(1) NOT NULL DEFAULT 'P' COMMENT 'Pending = â€œPâ€\nSent = â€œSâ€\nCancel = â€œCâ€\nExpired = â€œEâ€\nFail = â€œFâ€\nFinish = â€œDâ€\nProcess Timeout = â€œTâ€',
  `createDt` datetime NOT NULL COMMENT 'Create time of record',
  `lastUpdate` datetime NOT NULL COMMENT 'Last modify time',
  `expiryDt` datetime NOT NULL,
  `scheduleDt` datetime NOT NULL COMMENT 'Record available time',
  `processTimeout` datetime DEFAULT NULL COMMENT 'Process timeout after device\nreceived the command. Null\nwhen command status not\nâ€œSentâ€',
  `clientProcessInterval` int(11) DEFAULT NULL,
  `result` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`serialNo`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
--
-- Table structure for table `RemoteDevices`
--
DROP TABLE IF EXISTS `RemoteDevices`;
CREATE TABLE `RemoteDevices` (
  `serialNo` varchar(50) NOT NULL COMMENT 'Serial Number',
  `userid` varchar(45) NOT NULL,  
  `MACAddress` varchar(20) DEFAULT NULL COMMENT 'Device MAC Address',
  `deviceStatus` char(1) NOT NULL DEFAULT 'I' COMMENT 'Active = ï¿½Aï¿½\nInactive = ï¿½Iï¿½\nUnregistered = ï¿½Uï¿½',
  `model` varchar(45) DEFAULT NULL,
  `registrationDt` datetime DEFAULT NULL,
  PRIMARY KEY (`serialNo`),
  KEY `idx_serialNo` (`serialNo`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
--
-- Table structure for table `SDM_Login_Group`
--
DROP TABLE IF EXISTS `SDM_Login_Group`;
CREATE TABLE `SDM_Login_Group` (
  `groupID` int(11) NOT NULL AUTO_INCREMENT,
  `groupShortName` varchar(45) DEFAULT NULL,
  `groupDes` text,
  `status` char(1) DEFAULT 'A',
  PRIMARY KEY (`groupID`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
--
-- Dumping data for table `SDM_Login_Group`
--
/*!40000 ALTER TABLE `SDM_Login_Group` DISABLE KEYS */;
INSERT INTO `SDM_Login_Group` (`groupID`,`groupShortName`,`groupDes`,`status`) VALUES 
 (1,'Security Administrator',NULL,'A'),
 (2,'System Administrator',NULL,'A');
/*!40000 ALTER TABLE `SDM_Login_Group` ENABLE KEYS */;
--
-- Table structure for table `SDM_Login_GroupPermission`
--
DROP TABLE IF EXISTS `SDM_Login_GroupPermission`;
CREATE TABLE `SDM_Login_GroupPermission` (
  `groupID` int(11) NOT NULL,
  `permissionKey` varchar(45) NOT NULL,
  PRIMARY KEY (`groupID`,`permissionKey`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
--
-- Dumping data for table `SDM_Login_GroupPermission`
--
/*!40000 ALTER TABLE `SDM_Login_GroupPermission` DISABLE KEYS */;
INSERT INTO `SDM_Login_GroupPermission` (`groupID`,`permissionKey`) VALUES 
 (1,'RDMS_USER_EDIT'),
 (2,'RDMS_APP_EDIT'),
 (2,'RDMS_FIRMWARE_EDIT'),
 (2,'RDMS_USER_EDIT'),
 (2,'RDMS_SETTING_EDIT'),
 (1,'RDMS_INACTIVITY_TIMEOUT_CONFIG'),
 (1,'RDMS_PASSWORD_ALLOW_PERIOD_CONFIG'),
 (1,'RDMS_PASSWORD_CONFIG '),
 (1,'SYS_SDM_USER_ADD'),
 (1,'SYS_SDM_USER_DEL'),
 (1,'SYS_SDM_USER_EDIT'),
 (1,'SYS_SDM_USER_ENABLE_DISABLE'),
 (1,'SYS_SDM_USER_SHOWALL'),
 (1,'SYS_SDM_USER_SHOWDETAIL'),
 (2,'RDMS_AUDIT_BACKUP_LOCATION_CONFIG'),
 (2,'RDMS_INACTIVITY_TIMEOUT_CONFIG'),
 (2,'RDMS_LOGIN_ATTEMPT_NUMBER_CONFIG'),
 (2,'RDMS_LOGIN_LOCK_DURATION_CONFIG'),
 (2,'RDMS_PASSWORD_EXPIRY_NOTIFY_CONFIG'),
 (2,'RDMS_PASSWORD_GRACE_PERIOD_CONFIG'),
 (2,'SYS_SDM_USER_ADD'),
 (2,'SYS_SDM_USER_DEL'),
 (2,'SYS_SDM_USER_EDIT'),
 (2,'SYS_SDM_USER_ENABLE_DISABLE'),
 (2,'SYS_SDM_USER_SHOWALL'),
 (2,'SYS_SDM_USER_SHOWDETAIL');
 
/*!40000 ALTER TABLE `SDM_Login_GroupPermission` ENABLE KEYS */;
--
-- Table structure for table `SDM_Login_Permission`
--
DROP TABLE IF EXISTS `SDM_Login_Permission`;
CREATE TABLE `SDM_Login_Permission` (
  `permissionKey` varchar(45) NOT NULL,
  `permissionDesc` text,
  PRIMARY KEY (`permissionKey`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
--
-- Dumping data for table `SDM_Login_Permission`
--
/*!40000 ALTER TABLE `SDM_Login_Permission` DISABLE KEYS */;
INSERT INTO `SDM_Login_Permission` (`permissionKey`,`permissionDesc`) VALUES 
 ('SYS_SDM_USER_ADD','Add New User'),
 ('SYS_SDM_USER_EDIT','Edit User'),
 ('SYS_SDM_USER_DEL','Delete User Account'),
 ('SYS_SDM_USER_ENABLE_DISABLE','Enable or Disable User Account'),
 ('SYS_SDM_GROUP_ADD','Add a new user group'),
 ('SYS_SDM_GROUP_EDIT','Update user group description'),
 ('SYS_SDM_GROUP_DEL','Delete a user group'),
 ('SYS_SDM_GROUP_EDITUSER','Add or remove user from group'),
 ('SYS_SDM_PERMISSION_ADD','Add permission to system'),
 ('SYS_SDM_PERMISSION_DEL','Delete permission in system'),
 ('SYS_SDM_PERMISSION_EDIT','Update permission description'),
 ('SYS_SDM_PERMISSION_VIEWOTHER','Show other user permission'),
 ('SYS_SDM_PERMISSION_ASSIGN','Assign permission to user or group'),
 ('SYS_SDM_GROUP_SHOWALLUSER','Show all user of group'),
 ('SYS_SDM_USER_SHOWDETAIL','Show user detail'),
 ('SYS_SDM_USER_SHOWALL','Show all user in system'),
 ('RDMS_PASSWORD_CONFIG ','Setting the password aging interval and reuse period'),
 ('RDMS_PASSWORD_ALLOW_PERIOD_CONFIG','Setting the allow period after which a password must be changed');
INSERT INTO `SDM_Login_Permission` (`permissionKey`,`permissionDesc`) VALUES 
 ('RDMS_LOGIN_ATTEMPT_NUMBER_CONFIG','Setting the threshold on the number of incorrect login attempts'),
 ('RDMS_LOGIN_LOCK_DURATION_CONFIG','Setting the duration of channel lock-out that occurs when the threshold on the number of incorrect logins is exceeded'),
 ('RDMS_INACTIVITY_TIMEOUT_CONFIG','Setting the duration of the inactivity time-out interval for an established session'),
 ('RDMS_PASSWORD_EXPIRY_NOTIFY_CONFIG','Setting the parameters for the mechanism that notifies users of the need to change passwords'),
 ('RDMS_AUDIT_BACKUP_LOCATION_CONFIG','Setting the audit log backup location'),
 ('RDMS_PASSWORD_GRACE_PERIOD_CONFIG','Setting the grace period for useing an expired password');
/*!40000 ALTER TABLE `SDM_Login_Permission` ENABLE KEYS */;
--
-- Table structure for table `SDM_Login_User`
--
DROP TABLE IF EXISTS `SDM_Login_User`;
CREATE TABLE `SDM_Login_User` (
  `userid` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `status` char(1) NOT NULL DEFAULT 'S',
  `email` varchar(150) DEFAULT '',
  `username` varchar(150) DEFAULT '',
  `company` varchar(150) DEFAULT '',
  `title` varchar(150) DEFAULT '',
  `address` varchar(150) DEFAULT '',
  `notes` varchar(150) DEFAULT '',
  `lastLoginDt` timestamp NULL DEFAULT NULL,
  `lastFailLoginDt` timestamp NULL DEFAULT NULL,
  `loginToken` varchar(100) DEFAULT NULL,
  `lastAccessDt` timestamp NULL DEFAULT NULL,
  `ipAddress` varchar(32) DEFAULT '',
  `lastUpdteDt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `lft` int(11) NOT NULL,
  `rgt` int(11) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
--
-- Dumping data for table `SDM_Login_User`
--
/*!40000 ALTER TABLE `SDM_Login_User` DISABLE KEYS */;
---INSERT INTO `SDM_Login_User` (`userid`,`password`,`status`,`email`,`lastLoginDt`,`lastFailLoginDt`,`loginToken`,`lastAccessDt`,`ipAddress`,`lastUpdteDt`, `lft`, `rgt`) VALUES 
--- ('SystemAdmin','c3284d0f94606de1fd2af172aba15bf3','A','','2015-02-09 09:33:18','2015-01-15 15:14:01','de212ee29b36d7f9a72e3a2f07e00818','2015-02-09 09:41:07','::1','2014-09-03 12:25:32',1,10),
--- ('Tester1','c3284d0f94606de1fd2af172aba15bf3','A','Tester1@gmail.com','2015-02-09 09:33:18','2015-01-15 15:14:01','de212ee29b36d7f9a72e3a2f07e00818','2015-02-09 09:41:07','::1','2014-09-03 12:25:32',2,7),
--- ('Tester2','c3284d0f94606de1fd2af172aba15bf3','A','Tester2@gmail.com','2015-02-09 09:33:18','2015-01-15 15:14:01','de212ee29b36d7f9a72e3a2f07e00818','2015-02-09 09:41:07','::1','2014-09-03 12:25:32',3,4),
--- ('Tester3','c3284d0f94606de1fd2af172aba15bf3','A','Tester3@gmail.com','2015-02-09 09:33:18','2015-01-15 15:14:01','de212ee29b36d7f9a72e3a2f07e00818','2015-02-09 09:41:07','::1','2014-09-03 12:25:32',5,6),
--- ('Tester4','c3284d0f94606de1fd2af172aba15bf3','A','Tester4@gmail.com','2015-02-09 09:33:18','2015-01-15 15:14:01','de212ee29b36d7f9a72e3a2f07e00818','2015-02-09 09:41:07','::1','2014-09-03 12:25:32',8,9);
INSERT INTO `SDM_Login_User` (`userid`,`password`,`status`,`email`,`lastLoginDt`,`lastFailLoginDt`,`loginToken`,`lastAccessDt`,`ipAddress`,`lastUpdteDt`, `lft`, `rgt`) VALUES 
 ('SystemAdmin','c3284d0f94606de1fd2af172aba15bf3','A','','2015-02-09 09:33:18','2015-01-15 15:14:01','de212ee29b36d7f9a72e3a2f07e00818','2015-02-09 09:41:07','::1','2014-09-03 12:25:32',1,2);
/*!40000 ALTER TABLE `SDM_Login_User` ENABLE KEYS */;
--
-- Table structure for table `SDM_Login_UserGroup`
--
DROP TABLE IF EXISTS `SDM_Login_UserGroup`;
CREATE TABLE `SDM_Login_UserGroup` (
  `groupID` int(11) NOT NULL,
  `userid` varchar(45) NOT NULL DEFAULT '',
  PRIMARY KEY (`groupID`,`userid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
--
-- Dumping data for table `SDM_Login_UserGroup`
--
/*!40000 ALTER TABLE `SDM_Login_UserGroup` DISABLE KEYS */;
INSERT INTO `SDM_Login_UserGroup` (`groupID`,`userid`) VALUES 
 (2,'SystemAdmin');
/*!40000 ALTER TABLE `SDM_Login_UserGroup` ENABLE KEYS */;
--
-- Table structure for table `SDM_Login_UserPermission`
--
DROP TABLE IF EXISTS `SDM_Login_UserPermission`;
CREATE TABLE `SDM_Login_UserPermission` (
  `userid` varchar(45) NOT NULL,
  `permissionKey` varchar(45) NOT NULL,
  `accessType` char(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY (`userid`,`permissionKey`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
--
-- Dumping data for table `SDM_Login_UserPermission`
--
/*!40000 ALTER TABLE `SDM_Login_UserPermission` DISABLE KEYS */;
INSERT INTO `SDM_Login_UserPermission` (`userid`,`permissionKey`,`accessType`) VALUES 
 ('SystemAdmin','RDMS_AUDIT_BACKUP_LOCATION_CONFIG','A'),
 ('SystemAdmin','RDMS_INACTIVITY_TIMEOUT_CONFIG','A'),
 ('SystemAdmin','RDMS_LOGIN_ATTEMPT_NUMBER_CONFIG','A'),
 ('SystemAdmin','RDMS_LOGIN_LOCK_DURATION_CONFIG','A'),
 ('SystemAdmin','RDMS_PASSWORD_ALLOW_PERIOD_CONFIG','A'),
 ('SystemAdmin','RDMS_PASSWORD_CONFIG ','A'),
 ('SystemAdmin','RDMS_PASSWORD_EXPIRY_NOTIFY_CONFIG','A'),
 ('SystemAdmin','SYS_SDM_GROUP_ADD','A'),
 ('SystemAdmin','SYS_SDM_GROUP_DEL','A'),
 ('SystemAdmin','SYS_SDM_GROUP_EDIT','A'),
 ('SystemAdmin','SYS_SDM_GROUP_EDITUSER','A'),
 ('SystemAdmin','SYS_SDM_GROUP_SHOWALLUSER','A'),
 ('SystemAdmin','SYS_SDM_PERMISSION_ADD','A'),
 ('SystemAdmin','SYS_SDM_PERMISSION_ASSIGN','A'),
 ('SystemAdmin','SYS_SDM_PERMISSION_DEL','A'),
 ('SystemAdmin','SYS_SDM_PERMISSION_EDIT','A'),
 ('SystemAdmin','SYS_SDM_PERMISSION_VIEWOTHER','A'),
 ('SystemAdmin','SYS_SDM_USER_ADD','A');
INSERT INTO `SDM_Login_UserPermission` (`userid`,`permissionKey`,`accessType`) VALUES 
 ('SystemAdmin','SYS_SDM_USER_DEL','A'),
 ('SystemAdmin','SYS_SDM_USER_EDIT','A'),
 ('SystemAdmin','SYS_SDM_USER_ENABLE_DISABLE','A'),
 ('SystemAdmin','SYS_SDM_USER_SHOWALL','A'),
 ('SystemAdmin','SYS_SDM_USER_SHOWDETAIL','A'),
 ('SystemAdmin','RDMS_PASSWORD_GRACE_PERIOD_CONFIG','A');
/*!40000 ALTER TABLE `SDM_Login_UserPermission` ENABLE KEYS */;
--
-- Table structure for table `SoftwareStatus`
--
DROP TABLE IF EXISTS `SoftwareStatus`;
CREATE TABLE `SoftwareStatus` (
  `serialNo` varchar(50) NOT NULL COMMENT 'Serial Number',
  `appID` int(11) NOT NULL COMMENT 'Application ID, 0 = firmware',
  `version` varchar(50) NOT NULL COMMENT 'App/Firmware Version',
  `recordDt` datetime NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `packageName` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_serialNO_id` (`serialNo`,`id`),
  KEY `idx_serialNO_recordDt` (`serialNo`,`recordDt`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
--
-- Table structure for table `SystemParameter`
--
DROP TABLE IF EXISTS `SystemParameter`;
CREATE TABLE `SystemParameter` (
  `Key` varchar(255) NOT NULL,
  `DisplayName` varchar(255) DEFAULT NULL,
  `Value` varchar(255) NOT NULL,
  PRIMARY KEY (`Key`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
--
-- Dumping data for table `SystemParameter`
--
/*!40000 ALTER TABLE `SystemParameter` DISABLE KEYS */;
INSERT INTO `SystemParameter` (`Key`,`DisplayName`,`Value`) VALUES 
 ('max_download_limit',NULL,'2'),
 ('download_MB_per_minutes',NULL,'1'),
 ('host_name',NULL,'http://127.0.0.1/rdms/'),
 ('login_attempt_count','Number of incorrect login to block','5'),
 ('login_error_block_time','Invalid login lock-out period','1'),
 ('password_expiry_period','Password expiry period','2'),
 ('password_expired_grace_period','Grace period after password expired','2'),
 ('password_expiry_alert_period','Notify password expiry before','2'),
 ('password_reuse_period','Password reuse prevent period','2'),
 ('login_timeout','Login timeout interval','20'),
 ('log_backup_location','Audit log backup location','../log_bk'),
 ('device_inactive_check_time','Device change to inactive after ','24'),
 ('report_interval','Default device report interval','60');
/*!40000 ALTER TABLE `SystemParameter` ENABLE KEYS */;
--
-- Table structure for table `tmp_OutgoingCommand`
--
DROP TABLE IF EXISTS `tmp_OutgoingCommand`;
CREATE TABLE `tmp_OutgoingCommand` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Latest id of the S/N + 1\n(Create trigger doing this)',
  `serialNo` varchar(50) NOT NULL COMMENT 'Device serial number',
  `command` varchar(50) NOT NULL COMMENT 'Command to send',
  `message` text DEFAULT NULL COMMENT 'Message to send',
  `status` char(1) NOT NULL DEFAULT 'P' COMMENT 'Pending = â€œPâ€\nSent = â€œSâ€\nCancel = â€œCâ€\nExpired = â€œEâ€\nFail = â€œFâ€\nFinish = â€œDâ€\nProcess Timeout = â€œTâ€',
  `createDt` datetime NOT NULL COMMENT 'Create time of record',
  `lastUpdate` datetime NOT NULL COMMENT 'Last modify time',
  `expiryDt` datetime NOT NULL,
  `scheduleDt` datetime NOT NULL COMMENT 'Record available time',
  `processTimeout` datetime DEFAULT NULL COMMENT 'Process timeout after device\nreceived the command. Null\nwhen command status not\nâ€œSentâ€',
  `clientProcessInterval` int(11) DEFAULT NULL,
  `result` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`serialNo`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
--
-- Create Trigger
-- 
DELIMITER $$
DROP TRIGGER IF EXISTS default_current_time_trigger_app_package_insert$$
CREATE TRIGGER `default_current_time_trigger_app_package_insert`
BEFORE INSERT ON `AppPackage`
 FOR EACH ROW
 BEGIN
   IF (NEW.`createDt` IS NULL OR NEW.`createDt` = '' OR NEW.`createDt` = '0000-00-00 00:00:00') THEN
     SET NEW.`createDt` = NOW();
   END IF;
   IF (NEW.`lastUpdateDt` IS NULL OR NEW.`lastUpdateDt` = '' OR NEW.`lastUpdateDt` = '0000-00-00 00:00:00') THEN
     SET NEW.`lastUpdateDt` = NOW();
   END IF;
 END$$
DELIMITER ;
DELIMITER $$
DROP TRIGGER IF EXISTS default_current_time_trigger_app_package_update$$
CREATE TRIGGER `default_current_time_trigger_app_package_update`
BEFORE UPDATE ON `AppPackage`
 FOR EACH ROW
 BEGIN
   SET NEW.`lastUpdateDt` = NOW();
 END$$
DELIMITER ;
DELIMITER $$
DROP TRIGGER IF EXISTS default_current_time_trigger_application_insert$$
CREATE TRIGGER `default_current_time_trigger_application_insert`
BEFORE INSERT ON `Applications`
 FOR EACH ROW
 BEGIN
   IF (NEW.`createDt` IS NULL OR NEW.`createDt` = '' OR NEW.`createDt` = '0000-00-00 00:00:00') THEN
     SET NEW.`createDt` = NOW();
   END IF;
 END$$
DELIMITER ;
DELIMITER $$
DROP TRIGGER IF EXISTS OutgoingCommand_After_Update$$
CREATE TRIGGER `OutgoingCommand_After_Update`
AFTER UPDATE ON OutgoingCommand FOR EACH ROW
BEGIN
    DECLARE _message text;
    DECLARE _command VARCHAR(255);
    DECLARE _expiryDt DATETIME;
    DECLARE _processTimeout DATETIME;
    DECLARE _clientProcessInterval INT;
    IF (OLD.`command` = 'download' AND NEW.`status` = 'D') THEN
        -- build android application install command.
        IF (LOCATE('.apk', NEW.`message`) > 0) THEN
            SET _message = CONCAT('{', SUBSTRING_INDEX(SUBSTRING_INDEX(NEW.`message`, ',', -1), '}',1),',"src":"/storage/sdcard0/Download/RDMS/', SUBSTRING_INDEX(SUBSTRING_INDEX(NEW.`message`, '/', -1), '.apk', 1), '.apk"}');
            SET _command = IF (LOCATE('com.gsl.rdms', NEW.`message`) > 0, 'update_rdms', 'install_app');
        END IF;
        -- build wince application install command.
        IF (LOCATE('.cab', NEW.`message`) > 0) THEN
            SET _message = NEW.`message`;
            SET _command = IF (LOCATE('com.gsl.rdms', NEW.`message`) > 0, 'update_rdms', 'install_app');
        END IF;
        -- build firmware install command.
        IF (LOCATE('.zip', NEW.`message`) > 0) THEN
            SET _message = CONCAT('{', SUBSTRING_INDEX(SUBSTRING_INDEX(NEW.`message`, ',', 2), ',',-1), ',', SUBSTRING_INDEX(SUBSTRING_INDEX(NEW.`message`, ',', -1), '}',1),',"src":"/storage/sdcard0/Download/RDMS/', SUBSTRING_INDEX(SUBSTRING_INDEX(NEW.`message`, '/', -1), '.zip', 1), '.zip"}');
            SET _command = 'update_firmware';
        END IF;
        SELECT
            DATE_ADD(NOW(), INTERVAL (`expiryDtInterval` / 1000) SECOND),
            DATE_ADD(NOW(), INTERVAL (`processTimeout` / 1000) SECOND),
            `clientProcessInterval`
        INTO
            _expiryDt,
            _processTimeout,
            _clientProcessInterval
        FROM Command WHERE commandID = 'install_app';
        INSERT INTO `tmp_OutgoingCommand` (
            `serialNo`,
            `command`,
            `message`,
            `status`,
            `createDt`,
            `lastUpdate`,
            `expiryDt`,
            `scheduleDt`,
            `processTimeout`,
            `clientProcessInterval`
        ) VALUES (
            NEW.`serialNo`,
            _command,
            _message,
            'P',
            NOW(),
            NOW(),
            _expiryDt,
            NOW(),
            _processTimeout,
            _clientProcessInterval
        );
    END IF;
END$$
DELIMITER ;
--
-- View structure for view `DeviceCommandHistory_View`
--
DROP VIEW IF EXISTS `DeviceCommandHistory_View`;
CREATE VIEW `DeviceCommandHistory_View` AS select `O`.`serialNo` AS `serialNo`,`O`.`id` AS `id`,`O`.`command` AS `command`,`C`.`commandName` AS `commandName`,(case `O`.`status` when 'P' then 'Pending' when 'S' then 'Sent' when 'C' then 'Cancel' when 'E' then 'Expired' when 'F' then 'Fail' when 'D' then 'Finish' when 'T' then 'Process Timeout' end) AS `status`,`O`.`createDt` AS `createDt`,`O`.`lastUpdate` AS `lastUpdate`,`O`.`message` AS `message` from (`OutgoingCommand` `O` join `Command` `C` on((`O`.`command` = `C`.`commandID`))) order by `O`.`createDt` desc;
--
-- View structure for view `DeviceInstalledApp_View`
--
DROP VIEW IF EXISTS `DeviceInstalledApp_View`;
CREATE VIEW `DeviceInstalledApp_View` AS select `S`.`serialNo` AS `serialNo`,`S`.`packageName` AS `packageName`,`S`.`recordDt` AS `recordDt`,`S`.`version` AS `version` from `SoftwareStatus` `S` where ((`S`.`packageName` <> '0') and (`S`.`packageName` <> ''));
--
-- View structure for view `DeviceStatus_View`
--
DROP VIEW IF EXISTS `DeviceStatus_View`;
CREATE VIEW `DeviceStatus_View` AS select `DS`.`serialNo` AS `serialNo`,`DS`.`updateDt` AS `Date`,`DS`.`firmwareVersion` AS `firmwareVersion`,`DS`.`OS` AS `OSVersion`,`DS`.`powerStatus` AS `batteryStatus`,concat(`DS`.`powerLevel`,'%') AS `batteryLevel`,concat(`SPLIT_STR`(`DS`.`storageStatus`,'|',1),' / ',`SPLIT_STR`(`DS`.`storageStatus`,'|',2),'MB') AS `Storage`,concat(`DS`.`volumeLevelInMedia`,' / ',`DS`.`maxVolumeInMedia`) AS `volumeLevelInMedia`,concat(`DS`.`volumeLevelInRingtone`,' / ',`DS`.`maxVolumeInRingtone`) AS `volumeLevelInRingtone`,concat(`DS`.`volumeLevelInAlams`,' / ',`DS`.`maxVolumeInAlarms`) AS `volumeLevelInAlams`,`DS`.`networkStatus` AS `networkStatus`,`DS`.`ipAddress` AS `ipAddress` from `DeviceStatus` `DS` order by `DS`.`updateDt` desc;
--
-- View structure for view `view_Device_LastUpdateDt`
--
DROP VIEW IF EXISTS `view_Device_LastUpdateDt`;
CREATE VIEW `view_Device_LastUpdateDt` AS select `DeviceStatus`.`serialNo` AS `serialNo`,max(`DeviceStatus`.`updateDt`) AS `LastUpdateDt` from `DeviceStatus` group by `DeviceStatus`.`serialNo`;
--
-- View structure for view `Devices_View`
--
DROP VIEW IF EXISTS `Devices_View`;
CREATE VIEW `Devices_View` AS select DISTINCT `R`.`serialNo` AS `serialNo`, `R`.`userid` AS `userid`, if(isnull(`R`.`model`),'-',`R`.`model`) AS `model`,if(isnull(`D`.`OS`),'-',`D`.`OS`) AS `OS`,if((isnull(`D`.`firmwareVersion`) or (`D`.`firmwareVersion` = 'NULL')),'-',`D`.`firmwareVersion`) AS `firmwareVersion`,(case `R`.`deviceStatus` when 'A' then 'Active' when 'I' then 'Inactive' when 'U' then 'Unregistered' end) AS `deviceStatus`,`R`.`registrationDt` AS `registrationDate`,if(isnull(`D`.`updateDt`),'-',`D`.`updateDt`) AS `lastSeen`,if(isnull(`D`.`updateDt`),'1700-00-00 00:00:00',`D`.`updateDt`) AS `ls` from ((`RemoteDevices` `R` left join `view_Device_LastUpdateDt` `D1` on((`R`.`serialNo` = `D1`.`serialNo`))) left join `DeviceStatus` `D` on(((`R`.`serialNo` = `D`.`serialNo`) and (`D`.`updateDt` = `D1`.`LastUpdateDt`))));
--
-- View structure for view `view_rdms_App_Package`
--
DROP VIEW IF EXISTS `view_rdms_App_Package`;
CREATE VIEW `view_rdms_App_Package` AS select `AppPackage`.`id` AS `id`,`AppPackage`.`appID` AS `appID`,`AppPackage`.`version` AS `version`,`AppPackage`.`deviceModel` AS `deviceModel`,`AppPackage`.`filePath` AS `filePath`,`AppPackage`.`fileSize` AS `fileSize`,`AppPackage`.`releaseNote` AS `releaseNote`,(case `AppPackage`.`status` when 'N' then 'Uploaded' when 'R' then 'Released' when 'S' then 'Scheduled' when 'D' then 'Deployed' when 'M' then 'Manual Deployed' when 'V' then 'Voided' else 'UNDEFINE STATUS' end) AS `status`,if((isnull(`AppPackage`.`createDt`) or (`AppPackage`.`createDt` = '0000-00-00 00:00:00')),'',date_format(`AppPackage`.`createDt`,'%Y-%m-%d %H:%i')) AS `uploadDt`,if((isnull(`AppPackage`.`deployDt`) or (`AppPackage`.`deployDt` = '0000-00-00 00:00:00')),'',date_format(`AppPackage`.`deployDt`,'%Y-%m-%d %H:%i')) AS `deployDt` from `AppPackage` order by if((isnull(`AppPackage`.`createDt`) or (`AppPackage`.`createDt` = '0000-00-00 00:00:00')),'',date_format(`AppPackage`.`createDt`,'%Y-%m-%d %H:%i')) desc;
--
-- View structure for view `view_rdms_apps`
--
DROP VIEW IF EXISTS `view_rdms_apps`;
CREATE VIEW `view_rdms_apps` AS select `A`.`id` AS `appID`,`A`.`name` AS `name`,`AP`.`version` AS `version` from (`Applications` `A` left join `AppPackage` `AP` on(((`A`.`id` = `AP`.`appID`) and ((`AP`.`status` = 'D') or (`AP`.`status` = 'M')) and (`AP`.`lastUpdateDt` = (select max(`AppPackage`.`lastUpdateDt`) from `AppPackage` where ((`AppPackage`.`appID` = `A`.`id`) and ((`AppPackage`.`status` = 'D') or (`AppPackage`.`status` = 'M')))))))) where (`A`.`status` = 'A');

--
-- View structure for view `view_rdms_user`
-- 获取用户视图
DROP VIEW IF EXISTS `view_rdms_user`;
--CREATE VIEW `view_rdms_user` AS select `U`.`userid` AS `userID`,`U`.`lft` AS `lft`,`U`.`rgt` AS `rgt`,(COUNT(parent.name) - 1) AS 'level',(case `U`.`status` when 'A' then 'Active' when 'P' then 'Disabled' else 'UNDEFINE STATUS' end) AS `status`,(select ifnull(group_concat(`G`.`groupShortName` separator ', '),'--') from (`SDM_Login_Group` `G` join `SDM_Login_UserGroup` `UG` on((`G`.`groupID` = `UG`.`groupID`))) where (`UG`.`userid` = `U`.`userid`)) AS `userType`,ifnull(date_format(`U`.`lastLoginDt`,'%Y-%m-%d %H:%i'),'--') AS `lastLoginDt` from `SDM_Login_User` `U`;
CREATE VIEW view_rdms_user AS
SELECT
  node.userid AS userID,
  node.lft AS lft,
  node.rgt AS rgt,
  (COUNT(parent.userid) - 1) AS level,
  (case node.status when 'A' then 'Active' when 'P' then 'Disabled' else 'UNDEFINE STATUS' end) AS status,
  (select ifnull(group_concat(`G`.`groupShortName` separator ', '),'--') from (`SDM_Login_Group` `G` join `SDM_Login_UserGroup` `UG` on((`G`.`groupID` = `UG`.`groupID`))) where (`UG`.`userid` = node.userid)) AS userType,
  ifnull(date_format(node.lastLoginDt,'%Y-%m-%d %H:%i'),'--') AS lastLoginDt
FROM SDM_Login_User AS node,
SDM_Login_User AS parent
WHERE node.lft BETWEEN parent.lft AND parent.rgt
GROUP BY node.userid
ORDER BY node.lft;

--
-- Procedure `sp_rdms_user_tree_get`
--
-- 获取_userid的嵌套模型的子树
DROP PROCEDURE IF EXISTS `sp_rdms_user_tree_get`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_user_tree_get`(
    IN _userid VARCHAR(45)
)
BEGIN
    SELECT
        node.userid AS id,
        node.lft AS lft,
        node.rgt AS rgt,
        (COUNT(parent.userid) - (sub_tree.level + 1)) AS level,
        (case node.status when 'A' then 'Active' when 'P' then 'Disabled' else 'UNDEFINE STATUS' end) AS status,
        (select ifnull(group_concat(`G`.`groupShortName` separator ', '),'--') from (`SDM_Login_Group` `G` join `SDM_Login_UserGroup` `UG` on((`G`.`groupID` = `UG`.`groupID`))) where (`UG`.`userid` = node.userid)) AS userType,
        node.email AS email,
        node.username AS username,
        node.company AS company,
        node.title AS title,
        node.address AS address,
        node.notes AS notes,        
        ifnull(date_format(node.lastLoginDt,'%Y-%m-%d %H:%i'),'--') AS lastLoginDt
    FROM SDM_Login_User AS node,
    SDM_Login_User AS parent,
    SDM_Login_User AS sub_parent,
    (
        SELECT
            node.userid,
            (COUNT(parent.userid) - 1) AS level
        FROM SDM_Login_User AS node,
        SDM_Login_User AS parent
        WHERE node.lft BETWEEN parent.lft AND parent.rgt
        AND node.userid = _userid
        GROUP BY node.userid
        ORDER BY node.lft
    )AS sub_tree
    WHERE node.lft BETWEEN parent.lft AND parent.rgt
    AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt
    AND sub_parent.userid = sub_tree.userid
    GROUP BY node.userid
    ORDER BY node.lft;
END $$
DELIMITER ;



--
-- Procedure `RDMS_group_user_list_get`
--
DROP PROCEDURE IF EXISTS `RDMS_group_user_list_get`;
DELIMITER $$
CREATE PROCEDURE `RDMS_group_user_list_get`(
    IN _groupID INT
)
BEGIN
    SELECT U.userid AS userid, U.email 
    FROM SDM_Login_User U INNER JOIN SDM_Login_UserGroup G 
    ON U.userid = G.userid
    WHERE G.groupID = _groupID;
END $$
DELIMITER ;
--
-- Procedure `sm_dm_app_status_remove`
--
DROP PROCEDURE IF EXISTS `sm_dm_app_status_remove`;
DELIMITER $$
CREATE PROCEDURE `sm_dm_app_status_remove`(
	IN _serialNo VARCHAR(50)
)
BEGIN
	DELETE FROM SoftwareStatus
	WHERE serialNo = _serialNo;
END $$
DELIMITER ;
--
-- Procedure `sp_check_ip_is_blocked`
--
DROP PROCEDURE IF EXISTS `sp_check_ip_is_blocked`;
DELIMITER $$
CREATE PROCEDURE `sp_check_ip_is_blocked`(
    IN _ipAddress VARCHAR(45)
)
BEGIN
    DECLARE _BLOCK_TIME INT;
    SET _BLOCK_TIME = (SELECT Value FROM SystemParameter WHERE `Key` = 'login_error_block_time');
    SELECT IF((DATE_ADD(recordDt, INTERVAL _BLOCK_TIME MINUTE) >= NOW() AND result = 'F'), 1, 0) AS blockStatus 
    FROM AuditLog 
    WHERE ipAddress = _ipAddress AND action="Login" 
    ORDER BY recordDt DESC LIMIT 1;
END $$
DELIMITER ;
--
-- Procedure `sp_check_user_is_blocked`
--
DROP PROCEDURE IF EXISTS `sp_check_user_is_blocked`;
DELIMITER $$
CREATE PROCEDURE `sp_check_user_is_blocked`(
    IN _userid VARCHAR(45)
)
BEGIN
    DECLARE _BLOCK_TIME INT;
    SET _BLOCK_TIME = (SELECT Value FROM SystemParameter WHERE `Key` = 'login_error_block_time');
	SELECT IF(DATE_ADD(MAX(recordDt), INTERVAL _BLOCK_TIME MINUTE) >= NOW(),1,0) AS `isBlocked` FROM  AuditLog where `action` = 'Login Attempt' and userid = _userid;
END $$
DELIMITER ;
--
-- Procedure `sp_command_add`
--
DROP PROCEDURE IF EXISTS `sp_command_add`;
DELIMITER $$
CREATE PROCEDURE `sp_command_add`(
	IN _serialNo varchar(50),
	IN _command varchar(50),
	IN _message text,
	IN _status char(1),
	IN _expiryDt datetime,
	IN _scheduleDt datetime,
	IN _processTimeout datetime
)
BEGIN
	INSERT INTO `OutgoingCommand` (
		`serialNo`,
		`command`,
		`message`,
		`status`,
		`createDt`,
		`lastUpdate`,
		`expiryDt`,
		`scheduleDt`,
		`processTimeout`
	) VALUES (
		_serialNo,
		_command,
		_message,
		_status,
		NOW(),
		NOW(),
		_expiryDt,
		_scheduleDt,
		_processTimeout
	);
END $$
DELIMITER ;
--
-- Procedure `sp_command_get`
--
DROP PROCEDURE IF EXISTS `sp_command_get`;
DELIMITER $$
CREATE PROCEDURE `sp_command_get`(
	IN _serialNo VARCHAR(50)
)
BEGIN
	DECLARE _max_download_limit INT;
    DECLARE _download_count INT;
    DECLARE _report_interval INT;
    
	IF EXISTS(SELECT 1 FROM RemoteDevices WHERE serialNo = _serialNo) THEN
    
		IF NOT EXISTS(SELECT 1
			FROM OutgoingCommand
			WHERE serialNo = _serialNo 
			AND status = 'P' 
			AND expiryDt > now()
			AND scheduleDt <= now()
			AND command = 'download') THEN
				SET _max_download_limit = (SELECT CAST(`Value` AS UNSIGNED) FROM `SystemParameter`  WHERE `Key` = 'max_download_limit');
				SET _download_count = (SELECT COUNT(*) AS count FROM `OutgoingCommand` WHERE `command`='download' AND `status` in('S','P'));
                SET _report_interval = (SELECT CAST(`Value` AS UNSIGNED) FROM `SystemParameter`  WHERE `Key` = 'report_interval');
                IF _max_download_limit <= _download_count THEN
					IF EXISTS (SELECT 1 FROM DownloadQueue WHERE serialNo = _serialNo AND deploymentDt<=NOW() AND `status`='P') THEN
						IF EXISTS (SELECT 1 FROM OutgoingCommand WHERE `command` = 'download' AND `status`= 'P' AND DATE_ADD(lastUpdate, INTERVAL _report_interval+1 MINUTE)<=NOW()) THEN
							UPDATE DownloadQueue SET `status`= 'P' WHERE outgoingCommandID = (SELECT id FROM OutgoingCommand WHERE DATE_ADD(lastUpdate, INTERVAL _report_interval+1 MINUTE)<=NOW() AND `status`='P' AND `command`='download' ORDER BY lastUpdate,id LIMIT 1);
							DELETE FROM OutgoingCommand WHERE DATE_ADD(lastUpdate, INTERVAL _report_interval+1 MINUTE)<=NOW() AND `status`='P' AND `command`='download' ORDER BY lastUpdate,id LIMIT 1;							
						END IF;
					END IF;
                END IF;
		END IF;
		UPDATE DownloadQueue SET deviceLastSeen = NOW() WHERE serialNo = _serialNo AND `status` = 'P';
		SELECT
			id,
			command,
			message,
			status,
			createDt,
			clientProcessInterval
		FROM
			OutgoingCommand
		WHERE 
			serialNo = _serialNo 
		AND status = 'P' 
		AND expiryDt > now()
		AND scheduleDt <= now();
		UPDATE
			OutgoingCommand
		SET
			status = 'S',
			lastUpdate = NOW()
		WHERE
			serialNo = _serialNo 
		AND status = 'P' 
		AND expiryDt > now()
		AND scheduleDt <= now();
	ELSE
		SELECT 'FAIL' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_command_get_pending`
--
DROP PROCEDURE IF EXISTS `sp_command_get_pending`;
DELIMITER $$
CREATE PROCEDURE `sp_command_get_pending`(
	IN _serialNo varchar(50)
)
BEGIN
	IF EXISTS(SELECT 1 FROM RemoteDevices WHERE serialNo = _serialNo) THEN
		SELECT
			id,
			command,
			message,
			status,
			createDt,
			clientProcessInterval
		FROM
			OutgoingCommand
		WHERE
			serialNo = _serialNo
		AND status = 'P'
		AND expiryDt > now()
		AND scheduleDt <= now();
	ELSE
		SELECT 'FAIL' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_command_status_update`
--
DROP PROCEDURE IF EXISTS `sp_command_status_update`;
DELIMITER $$
CREATE PROCEDURE `sp_command_status_update`(
	IN _serialNo VARCHAR(50),
	IN _id INT(11),
	IN _status CHAR(1),
	IN _result INT(11)
)
BEGIN
	IF EXISTS(SELECT 1 FROM RemoteDevices WHERE serialNo = _serialNo) THEN
		IF EXISTS(SELECT 1 FROM OutgoingCommand WHERE serialNo = _serialNo AND id = _id) THEN
			UPDATE 
				`OutgoingCommand` 
			SET
				`status` = _status,
				`lastUpdate` = NOW(),
				`result` = _result
			WHERE 
				`id` = _id 
			and
				`serialNo` = _serialNo;
			SELECT 'SUCCESS' AS 'result';
		ELSE
			SELECT 'FAIL' AS 'result';
		END IF;
	ELSE
		SELECT 'FAIL' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_dm_modellist_get`
--
DROP PROCEDURE IF EXISTS `sp_dm_modellist_get`;
DELIMITER $$
CREATE PROCEDURE `sp_dm_modellist_get`(
)
BEGIN
    SELECT left(serialNo,8) as 'model' FROM remotedevices group by left(serialNo,8);
END $$
DELIMITER ;
--
-- Procedure `sp_dm_command_insert`
--
DROP PROCEDURE IF EXISTS `sp_dm_command_insert`;
DELIMITER $$
CREATE PROCEDURE `sp_dm_command_insert`(
	IN _serialNo varchar(50),
	IN _commandID varchar(50),
	IN _message text,
	IN _status char(1),
	IN _expiryDt datetime,
	IN _scheduleDt datetime,
	IN _processTimeout datetime, 
	IN _clientProcessInterval int
)
BEGIN
	DECLARE defExpiryDt DATETIME;
	DECLARE defProcessTimeout DATETIME;
	DECLARE defScheduleDt DATETIME;
	DECLARE client_process_interval int;
	
	IF (_clientProcessInterval IS NULL OR _clientProcessInterval = '') THEN
		SELECT `clientProcessInterval` INTO client_process_interval FROM `Command` WHERE `commandID` = _commandID;
	ELSE 
		SET client_process_interval = _clientProcessInterval;
	END IF;
	IF (_expiryDt = '' OR _expiryDt = '0000-00-00 00:00:00') THEN
		SELECT DATE_ADD(NOW(), INTERVAL (`expiryDtInterval` / 1000) SECOND) INTO defExpiryDt FROM Command WHERE commandID = _commandID;
	ELSE
		SET defExpiryDt = _expiryDt;
	END IF;
	IF (_processTimeout = '' OR _processTimeout = '0000-00-00 00:00:00') THEN
		SELECT DATE_ADD(NOW(), INTERVAL (`processTimeout` / 1000) SECOND) INTO defProcessTimeout FROM Command WHERE commandID = _commandID;
	ELSE
		SET defProcessTimeout = _processTimeout;
	END IF;
	IF (_scheduleDt = '' OR _scheduleDt = '0000-00-00 00:00:00') THEN
		SET defScheduleDt = NOW();
	ELSE
		SET defScheduleDt = _scheduleDt;
	END IF;
	INSERT INTO `OutgoingCommand` (
		`serialNo`,
		`command`,
		`message`,
		`status`,
		`createDt`,
		`lastUpdate`,
		`expiryDt`,
		`scheduleDt`,
		`processTimeout`,
		`clientProcessInterval`
	) VALUES (
		_serialNo,
		_commandID,
		_message,
		_status,
		NOW(),
		NOW(),
		defExpiryDt,
		defScheduleDt,
		defProcessTimeout,
		client_process_interval
	);
    
	SELECT LAST_INSERT_ID() AS `id`, "SUCCESS" AS result;
END $$
DELIMITER ;
--
-- Procedure `sp_dm_command_status_update`
--
DROP PROCEDURE IF EXISTS `sp_dm_command_status_update`;
DELIMITER $$
CREATE PROCEDURE `sp_dm_command_status_update`(
	IN _serialNo VARCHAR(50),
	IN _id INT(11),
	IN _status CHAR(1)
)
BEGIN
	IF EXISTS(SELECT 1 FROM RemoteDevices WHERE serialNo = _serialNo) THEN
		IF EXISTS(SELECT 1 FROM OutgoingCommand WHERE serialNo = _serialNo AND id = _id) THEN
			UPDATE
				OutgoingCommand
			SET
				status = _status,
				lastUpdate = NOW()
			WHERE
				serialNo = _serialNo
			AND id = _id;
			
			SELECT 'SUCCESS' AS 'result';
		ELSE
			SELECT 'FAIL' AS 'result';
		END IF;
	ELSE
		SELECT 'FAIL' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_dm_device_activate`
--
DROP PROCEDURE IF EXISTS `sp_dm_device_activate`;
DELIMITER $$
CREATE PROCEDURE `sp_dm_device_activate`(
	IN _serialNo VARCHAR(50)
)
BEGIN
	DECLARE _status CHAR(1) DEFAULT '';
	IF(SELECT 1 FROM RemoteDevices WHERE `serialNo` = _serialNo) THEN 
		SELECT deviceStatus INTO _status FROM RemoteDevices WHERE `serialNo` = _serialNo;
		IF(_status = 'I') THEN
			UPDATE `RemoteDevices` SET `deviceStatus`='A' WHERE `serialNo` = _serialNo;
			SELECT 1 AS 'result';
		ELSEIF(_status = 'U') THEN
			SELECT 0 AS 'result';
		ELSE 
			SELECT 1 AS 'result';
		END IF;
	ELSE
		SELECT 'serialNotFind' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_dm_device_defaultSettings_get`
--
DROP PROCEDURE IF EXISTS `sp_dm_device_defaultSettings_get`;
DELIMITER $$
CREATE PROCEDURE `sp_dm_device_defaultSettings_get`(
)
BEGIN
	IF (SELECT 1 FROM DevicesDefaultSetting WHERE `settingID` = 'reportInterval') THEN
		SELECT `settingID`, `value` FROM DevicesDefaultSetting WHERE `settingID` = 'reportInterval';
	ELSE
		SELECT -1 AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_dm_device_defaultSettings_set`
--
DROP PROCEDURE IF EXISTS `sp_dm_device_defaultSettings_set`;
DELIMITER $$
CREATE PROCEDURE `sp_dm_device_defaultSettings_set`(
	IN _settingID VARCHAR(45),
	IN _value VARCHAR(20)
)
BEGIN
	UPDATE `DevicesDefaultSetting` SET `value` = _value WHERE `settingID` = _settingID;
END $$
DELIMITER ;
--
-- Procedure `sp_dm_device_details_get`
--
DROP PROCEDURE IF EXISTS `sp_dm_device_details_get`;
DELIMITER $$
CREATE PROCEDURE `sp_dm_device_details_get`(
	IN _sn varchar(50)
)
BEGIN
	SELECT
		R.`model`,
        R.`userid` AS 'userid',
		R.`serialNo` AS `sn`,
		D.`updateDt` AS `lastSeen`,
		R.`registrationDt` AS `registerDt`,
		R.`deviceStatus` AS `status`,
		D.`powerLevel` AS `powerLevel`,
		D.`powerStatus` AS `powerStatus`,
		D.`networkStatus` AS `networkStatus`,
		D.`storageStatus` AS `storageStatus`,
		D.`OS` AS `OS`,
		D.`firmwareVersion` AS `firmwareVersion`,
		`SPLIT_STR`(`D`.`storageStatus`,'|',1) AS `storageUsed`,
		`SPLIT_STR`(`D`.`storageStatus`,'|',2) AS `storageTotal`,
		D.`ipAddress` AS `ipAddress`,
		D.`otherInfo` AS `otherInfo`
	FROM
		`RemoteDevices` R
	LEFT JOIN
		`view_Device_LastUpdateDt` DLS
	ON (R.`serialNo` = DLS. `serialNo`)
	LEFT JOIN
		`DeviceStatus` D
	ON (DLS.LastUpdateDt = D.updateDt AND D.`serialNo` = R.`serialNo`)
	where
		R.`serialNo` = _sn;
END $$
DELIMITER ;
--
-- Procedure `sp_dm_device_reactive`
--
DROP PROCEDURE IF EXISTS `sp_dm_device_reactive`;
DELIMITER $$
CREATE PROCEDURE `sp_dm_device_reactive`(
	IN _serialNo VARCHAR(50)
)
BEGIN
	IF(SELECT 1 FROM `RemoteDevices` WHERE `serialNo` = _serialNo) THEN 
		UPDATE `RemoteDevices` SET `deviceStatus`='I' WHERE `serialNo` = _serialNo;
		SELECT 'ok' AS 'result';
	ELSE
		SELECT 'serialNotFind' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_dm_device_register`
--
DROP PROCEDURE IF EXISTS `sp_dm_device_register`;
DELIMITER $$
CREATE PROCEDURE `sp_dm_device_register`(
	IN _serialNo VARCHAR(50),
    IN _userid VARCHAR(45),
	IN _model VARCHAR(50)
)
BEGIN
	IF EXISTS(SELECT 1 FROM RemoteDevices WHERE `serialNo` = _serialNo) THEN 
		SELECT 'Device Exist' AS 'result';
	ELSE
        INSERT INTO RemoteDevices (
            serialNo,
            userid,
            deviceStatus,
            model,
            registrationDt
        )
        VALUES (
            _serialNo,
            _userid,
            'I',
            _model,
            NOW()
        );
		SELECT 'SUCCESS' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_dm_device_unregister`
--
DROP PROCEDURE IF EXISTS `sp_dm_device_unregister`;
DELIMITER $$
CREATE PROCEDURE `sp_dm_device_unregister`(
	IN _sn varchar(50)
)
BEGIN
	IF (SELECT 1 FROM `RemoteDevices` WHERE `serialNo`= _sn) THEN
		UPDATE `RemoteDevices` SET `deviceStatus`='U' WHERE `serialNo`= _sn;
		SELECT 0 AS `result`;
	ELSE 
		SELECT -1 AS `result`;
	END IF; 
END $$
DELIMITER ;
--
-- Procedure `sp_dm_device_volumeSettings_get`
--
DROP PROCEDURE IF EXISTS `sp_dm_device_volumeSettings_get`;
DELIMITER $$
CREATE PROCEDURE `sp_dm_device_volumeSettings_get`(
	IN _serialNo VARCHAR(50)
)
BEGIN
	IF EXISTS(SELECT 1 FROM `DeviceStatus` WHERE `serialNo` = _serialNo) THEN
		SELECT
			`volumeLevelInMedia`,
			`maxVolumeInMedia`,
			`volumeLevelInRingtone`,
			`maxVolumeInRingtone`,
			`volumeLevelInAlams`,
			`maxVolumeInAlarms`
		FROM
			`DeviceStatus` 
		WHERE
			`serialNo` = _serialNo 
		ORDER BY 
			`updateDt`
		DESC LIMIT 1;
	ELSE
		SELECT -1 AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_dm_getpackageNameByAppID`
--
DROP PROCEDURE IF EXISTS `sp_dm_getpackageNameByAppID`;
DELIMITER $$
CREATE PROCEDURE `sp_dm_getpackageNameByAppID`(
	IN _appID INT(11)
)
BEGIN
	IF (SELECT 1 FROM Applications WHERE id = _appID) THEN
		SELECT packageName AS `result` FROM Applications WHERE id = _appID;
	ELSE
		SELECT -1 AS `result`;
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_latest_ip_login_success_get`
--
DROP PROCEDURE IF EXISTS `sp_latest_ip_login_success_get`;
DELIMITER $$
CREATE PROCEDURE `sp_latest_ip_login_success_get`(
    IN _ipAddress VARCHAR(45)
)
BEGIN
    SET @IP = _ipAddress;
    SET @ATTEMPT_COUNT = (SELECT Value FROM SystemParameter WHERE `Key` = 'login_attempt_count');
    PREPARE STMT FROM 
    "SELECT case COUNT(*) WHEN ? THEN
        SUM(IF(result = 'S',1,0))
        ELSE 999
        END AS lastLoginSuccess FROM 
        (SELECT result FROM AuditLog 
        WHERE ipAddress = ? 
        ORDER BY recordDt DESC 
        LIMIT ?) T
        ";
    EXECUTE STMT USING @ATTEMPT_COUNT, @IP, @ATTEMPT_COUNT;
    DEALLOCATE PREPARE STMT;
END $$
DELIMITER ;
--
-- Procedure `sp_latest_user_login_fail_get`
--
DROP PROCEDURE IF EXISTS `sp_latest_user_login_fail_get`;
DELIMITER $$
CREATE PROCEDURE `sp_latest_user_login_fail_get`(
    IN _userid VARCHAR(45)
)
BEGIN
    SET @UID = _userid;
    SET @ATTEMPT_COUNT = (SELECT Value FROM SystemParameter WHERE `Key` = 'login_attempt_count');
    SET @_BLOCK_TIME = (SELECT Value FROM SystemParameter WHERE `Key` = 'login_error_block_time');
PREPARE STMT FROM
"select IF(SUM(`cnt`)=?,1,0) as `isAttempt` FROM (
select IF(result = 'F', 1, 0) AS `cnt`
FROM AuditLog a WHERE  `action` = 'Login' and userid = ? and DATE_ADD(recordDt, INTERVAL ? MINUTE) >= NOW() AND recordDt >= IFNULL((SELECT recordDt FROM  AuditLog where `action` = 'Login Attempt' and userid = ? order by recordDt desc LIMIT 1),recordDt) order by recordDt DESC LIMIT ?
) T";
    EXECUTE STMT USING @ATTEMPT_COUNT,@UID,@_BLOCK_TIME,@UID, @ATTEMPT_COUNT;
    DEALLOCATE PREPARE STMT;
END $$
DELIMITER ;
--
-- Procedure `sp_latest_user_login_success_get`
--
DROP PROCEDURE IF EXISTS `sp_latest_user_login_success_get`;
DELIMITER $$
CREATE PROCEDURE `sp_latest_user_login_success_get`(
    IN _userid VARCHAR(45)
)
BEGIN
    SET @UID = _userid;
    SET @ATTEMPT_COUNT = (SELECT Value FROM SystemParameter WHERE `Key` = 'login_attempt_count');
    PREPARE STMT FROM 
    "SELECT case COUNT(*) WHEN ? THEN
        SUM(IF(result = 'S',1,0))
        ELSE 999
        END AS lastLoginSuccess FROM 
        (SELECT result FROM AuditLog 
        WHERE userid = ? 
        ORDER BY recordDt DESC 
        LIMIT ?) T
        ";
    EXECUTE STMT USING @ATTEMPT_COUNT, @UID, @ATTEMPT_COUNT;
    DEALLOCATE PREPARE STMT;
END $$
DELIMITER ;
--
-- Procedure `sp_notification_api_UpdateRegistrationID`
--
DROP PROCEDURE IF EXISTS `sp_notification_api_UpdateRegistrationID`;
DELIMITER $$
CREATE PROCEDURE `sp_notification_api_UpdateRegistrationID`(
  IN _name varchar(45),
  IN _package_name varchar(255)
)
BEGIN
  INSERT INTO `Applications` (`name`, `packageName`) VALUES (_name, _package_name);
  SELECT LAST_INSERT_ID() as 'id';
END $$
DELIMITER ;
--
-- Procedure `sp_password_log_insert`
--
DROP PROCEDURE IF EXISTS `sp_password_log_insert`;
DELIMITER $$
CREATE PROCEDURE `sp_password_log_insert`(
    IN _userid VARCHAR(45),
    IN _password VARCHAR(45)
)
BEGIN
    INSERT INTO LogUserPassword(userid, password, recordDt)
    VALUES(_userid, md5(_password) , NOW());
END $$
DELIMITER ;
--
-- Procedure `sp_password_nearly_expiry_user_get`
--
DROP PROCEDURE IF EXISTS `sp_password_nearly_expiry_user_get`;
DELIMITER $$
CREATE PROCEDURE `sp_password_nearly_expiry_user_get`()
BEGIN
	DECLARE _expiryPeriod VARCHAR(20);
    DECLARE _alertPeriod VARCHAR(20);
    SET _expiryPeriod = (SELECT Value FROM SystemParameter WHERE `Key` = 'password_expiry_period');
    SET _alertPeriod = (SELECT Value FROM SystemParameter WHERE `Key` = 'password_expiry_alert_period');
    SELECT 
        U.userid, 
        U.email,
        DATE_ADD(DATE_ADD(MAX(A.recordDt), INTERVAL _expiryPeriod MONTH ),INTERVAL -_alertPeriod DAY) AS alertDt,
        DATE_ADD(MAX(A.recordDt), INTERVAL _expiryPeriod MONTH ) AS expiryDt
    FROM LogUserPassword A INNER JOIN SDM_Login_User U 
    ON A.userid = U.userid
    GROUP BY U.userid
    HAVING DATE(alertDt)=DATE(NOW());
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_addOtherInfoToUser`
--
DROP PROCEDURE IF EXISTS `sp_rdms_addOtherInfoToUser`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_addOtherInfoToUser`(
	IN _userid VARCHAR(45),
	IN _email VARCHAR(150),
	IN _username VARCHAR(150),
	IN _company VARCHAR(150),
	IN _title VARCHAR(150),
	IN _address VARCHAR(150),
	IN _notes VARCHAR(150)
)
BEGIN
	UPDATE 
		`SDM_Login_User` 
	SET
        `email` = _email,        
        `username` = _username,
        `company` = _company,
        `title` = _title,
        `address` = _address,
        `notes` = _notes        
	WHERE 
		`userid` = _userid;
	SELECT 'success' AS 'result';
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_appName_get_all`
--
DROP PROCEDURE IF EXISTS `sp_rdms_appName_get_all`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_appName_get_all`()
BEGIN
	SELECT `name`, `packageName` FROM Applications;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_appPackage_get`
--
DROP PROCEDURE IF EXISTS `sp_rdms_appPackage_get`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_appPackage_get`(
  IN _package_id int
)
BEGIN
  IF EXISTS (
    SELECT 1 FROM `AppPackage` WHERE `id` = _package_id
  ) THEN
    SELECT `id` AS 'packageID', `appID`, `version`, `filePath`, `fileSize`, `md5`, `releaseNote`, `status`, `createDt`, `deployDt`, `lastUpdateDt`
    FROM `AppPackage`
    WHERE `id` = _package_id;
  END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_appPackage_get_all`
--
DROP PROCEDURE IF EXISTS `sp_rdms_appPackage_get_all`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_appPackage_get_all`(
  IN _app_id int
)
BEGIN
  IF EXISTS (
    SELECT 1 FROM `AppPackage` WHERE `appID` = _app_id
  ) THEN
    SELECT `id` AS 'packageID', `appID`, `version`, `filePath`, `fileSize`, `md5`, `releaseNote`, `status`, `createDt`, `deployDt`, `lastUpdateDt`
    FROM `AppPackage`
    WHERE `appID` = _app_id;
  END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_app_CancelDeploy`
--
DROP PROCEDURE IF EXISTS `sp_rdms_app_CancelDeploy`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_app_CancelDeploy`(
    IN _packageID INT
)
BEGIN
    DECLARE _hasRecord INT;
    IF EXISTS (
        SELECT 1 FROM DownloadQueue WHERE packageID=_packageID LIMIT 1
    ) THEN
        SELECT COUNT(1) INTO _hasRecord FROM DownloadQueue WHERE packageID=_packageID AND status='P';
        IF _hasRecord > 0 THEN
            UPDATE DownloadQueue SET `status`='C' WHERE packageID=_packageID AND status='P';
            SELECT 0 as result;
        ELSE
            SELECT -2 as result;
        END IF;
    ELSE
        SELECT -1 as result;
    END IF;
    UPDATE AppPackage SET `status`='R', `deployDt`='0000-00-00 00:00:00'  WHERE id=_packageID;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_app_release`
--
DROP PROCEDURE IF EXISTS `sp_rdms_app_release`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_app_release`(
  IN _package_id int
)
BEGIN
  IF EXISTS (
    SELECT 1 FROM `AppPackage` WHERE `id`=_package_id
  ) THEN
    UPDATE `AppPackage` SET `status` = 'R' WHERE `id` = _package_id;
    SELECT 0 AS 'result';
  ELSE
    SELECT -1 AS 'result';
  END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_app_deploy`
--
DROP PROCEDURE IF EXISTS `sp_rdms_app_deploy`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_app_deploy`(
  IN _package_id int,
  IN _deployment_dt datetime,
  IN _priority int
)
BEGIN
  DECLARE _deviceModel varchar(8);
  DECLARE _file_path varchar(255);
  DECLARE _file_size float;
  DECLARE _md5 varchar(32);
  DECLARE _serial_no varchar(50);
  DECLARE done INT DEFAULT FALSE;
  DECLARE curl CURSOR FOR SELECT `serialNo` FROM `RemoteDevices` WHERE `deviceStatus` = 'A';
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
  IF EXISTS (
    SELECT 1 FROM `AppPackage` WHERE `id`=_package_id
  ) THEN
    SELECT `deviceModel`, `filePath`, `fileSize`, `md5` INTO _deviceModel, _file_path, _file_size, _md5
    FROM `AppPackage`
    WHERE `id` = _package_id;
    OPEN curl;
    the_loop: LOOP
      FETCH curl INTO _serial_no;
      IF done THEN
        LEAVE the_loop;
      END IF;
      IF (left(_serial_no, 8) = _deviceModel) THEN
        CALL `sp_rdms_app_DownloadQueue_insert` (_serial_no, _package_id, 'APP', _file_path, _md5, _file_size, _deployment_dt, _priority);
      END IF;
    END LOOP the_loop;
    CLOSE curl;
    UPDATE `AppPackage` SET `status` = 'S', `deployDt` = _deployment_dt WHERE `id` = _package_id;
    SELECT '0' AS 'result';
  ELSE
    SELECT '-1' AS 'result';
  END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_app_DownloadQueue_insert`
--
DROP PROCEDURE IF EXISTS `sp_rdms_app_DownloadQueue_insert`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_app_DownloadQueue_insert`(
  IN _serial_no varchar(50),
  IN _package_id int,
  IN _file_type varchar(50),
  IN _src varchar(255),
  IN _md5 varchar(32),
  IN _file_size float,
  IN _deployment_dt datetime,
  IN _priority int
)
BEGIN
  IF EXISTS (
    SELECT 1 FROM `RemoteDevices` WHERE `serialNo` = _serial_no
  ) THEN
    
    IF EXISTS (
      SELECT 1 FROM `RemoteDevices` WHERE `serialNo` = _serial_no AND `deviceStatus` = 'A'
    ) THEN
      INSERT INTO `DownloadQueue` (`serialNo`, `packageID`, `fileType`, `src`, `md5`, `fileSize`, `status`, `priority`, `deploymentDt`, `createDt`, `deviceLastSeen`) VALUES (_serial_no, _package_id, _file_type, _src, _md5, _file_size, 'P', _priority, _deployment_dt, NOW(), NOW());
      SELECT 0 AS 'result';
    ELSE
      SELECT -2 AS 'result';
    END IF;
    
  ELSE
    SELECT -1 AS 'result';
  END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_app_DownloadQueue_insert_by_appID`
--
DROP PROCEDURE IF EXISTS `sp_rdms_app_DownloadQueue_insert_by_appID`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_app_DownloadQueue_insert_by_appID`(
    IN _serialNo VARCHAR(50),
    IN _appID INT,
    IN _deployDt DATETIME
)
BEGIN
    DECLARE _packageID INT;
    DECLARE _fileType VARCHAR(50);
    DECLARE _src VARCHAR(255);
    DECLARE _md5 VARCHAR(32);
    DECLARE _fileSize FLOAT;
    IF EXISTS(SELECT 1 FROM `AppPackage` WHERE `appID` = _appID AND (`status` = 'R' OR `status` = 'D' OR `status` = 'M') AND `deviceModel` = left(_serialNo, 8)) THEN
    BEGIN
        SELECT 
            `id`,
            IF(_appID = 0, 'FIRMWARE', 'APP'), 
            `filePath`,
            `md5`, 
            `fileSize`
        INTO _packageID, _fileType, _src, _md5, _fileSize
        FROM `AppPackage`
        WHERE (`status` = 'R' OR `status` = 'D' OR `status` = 'M') AND `appID` = _appID AND `deviceModel` = left(_serialNo, 8)
        ORDER BY lastUpdateDt DESC LIMIT 1;
        INSERT INTO DownloadQueue(`serialNo`, `packageID`, `fileType`, `src`, `md5`, `fileSize`, `status`, `priority`, `deploymentDt`, `createDt`, `deviceLastSeen`)
        SELECT serialNo,_packageID,_fileType,_src,_md5,_fileSize,'P','10',_deployDt,NOW(),NOW() FROM RemoteDevices WHERE `serialNo` = _serialNo;
        SELECT 'SUCCESS' AS "result";
    END;
    ELSE 
        SELECT 'FAIL' AS "result";
    END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_app_DownloadQueue_status_update`
--
DROP PROCEDURE IF EXISTS `sp_rdms_app_DownloadQueue_status_update`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_app_DownloadQueue_status_update`(
    IN _id INT,
    IN _outgoingCommandID INT
)
BEGIN
    UPDATE DownloadQueue 
    SET 
        `status` = 'D',
        `outgoingCommandID` = _outgoingCommandID
    WHERE `id` = _id;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_app_get`
--
DROP PROCEDURE IF EXISTS `sp_rdms_app_get`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_app_get`(
  IN _app_id int
)
BEGIN
  IF EXISTS (
    SELECT 1 FROM `Applications` WHERE `id` = _app_id
  ) THEN
    SELECT `id`, `name`, `packageName`, `releaseNote`, `status`, `createDt`, `removalDt` FROM `Applications` WHERE `id` = _app_id;
  END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_app_insert`
--
DROP PROCEDURE IF EXISTS `sp_rdms_app_insert`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_app_insert`(
  IN _name varchar(45),
  IN _package_name varchar(255)
)
BEGIN
	IF NOT EXISTS(SELECT 1 FROM `Applications` WHERE `packageName` = _package_name) THEN
		IF NOT EXISTS(SELECT 1 FROM `Applications` WHERE `name` = _name) THEN
			INSERT INTO `Applications` (
				`name`,
				`packageName`,
				`createDt`
			) VALUES (
				_name,
				_package_name,
				NOW()
			);
			SELECT 'SUCCESS' as 'result', LAST_INSERT_ID() as 'id';
		ELSE
			SELECT 'FAIL' as 'result', 'DUPLICATE_NAME' as 'reason';
		END IF;
	ELSE
		SELECT 'FAIL' as 'result', 'DUPLICATE_PACKAGE_NAME' as 'reason';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_app_n_package_uninstall`
--
DROP PROCEDURE IF EXISTS `sp_rdms_app_n_package_uninstall`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_app_n_package_uninstall`(
	IN _appID INT
)
BEGIN
	IF EXISTS(SELECT 1 FROM Applications WHERE id = _appID) THEN
		IF NOT EXISTS(SELECT 1 FROM AppPackage WHERE appID = _appID AND `status` IN('S','D','M')) THEN
			DELETE FROM AppPackage WHERE appID = _appID;
            DELETE FROM Applications WHERE id = _appID;
			SELECT 1 AS `resultValue`;
		ELSE
			SELECT 0 AS `resultValue`;
		END IF;
	ELSE
		SELECT 2 AS `resultValue`;
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_app_n_package_uninstall_check`
--
DROP PROCEDURE IF EXISTS `sp_rdms_app_n_package_uninstall_check`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_app_n_package_uninstall_check`(
	IN _appID INT
)
BEGIN
	IF EXISTS(SELECT 1 FROM Applications WHERE id = _appID) THEN
		IF NOT EXISTS(SELECT 1 FROM AppPackage WHERE appID = _appID AND `status` IN('S','D','M')) THEN
			SELECT 1 AS `available`;
		ELSE
			SELECT 0 AS `available`;
		END IF;
	ELSE
		SELECT 0 AS `available`;
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_app_Package_get`
--
DROP PROCEDURE IF EXISTS `sp_rdms_app_Package_get`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_app_Package_get`(
	IN _packageID INT
)
BEGIN
	IF(SELECT 1 FROM AppPackage WHERE id = _packageID) THEN
		SELECT
			AP.appID,
			A.`name`,
			AP.id,
			AP.version,
			AP.filePath,
			AP.fileSize,
			AP.`status`,
			AP.createDt,
			AP.deployDt,
			AP.lastUpdateDt
		FROM
			AppPackage AP
		INNER JOIN
			Applications A
		ON
			AP.appID = A.id
		WHERE
			AP.id = _packageID;
	ELSE
		SELECT -1 AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_app_package_insert`
--
DROP PROCEDURE IF EXISTS `sp_rdms_app_package_insert`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_app_package_insert`(
  IN _app_id int,
  IN _version varchar(45),
  IN _deviceModel varchar(8),
  IN _file_path varchar(255),
  IN _file_size int,
  IN _md5 varchar(32),
  IN _release_note varchar(255)
)
BEGIN
  IF NOT EXISTS(SELECT 1 FROM `AppPackage` WHERE `deviceModel`=_deviceModel AND `md5`=_md5 AND `appID`=_app_id) THEN
    INSERT INTO `AppPackage` (`appID`, `version`, deviceModel, `filePath`, `fileSize`, `md5`, `releaseNote`) VALUES (_app_id, _version, _deviceModel, _file_path, _file_size, _md5, _release_note);
    SELECT LAST_INSERT_ID() as 'id';
  END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_app_package_deploy`
--
DROP PROCEDURE IF EXISTS `sp_rdms_app_package_deploy`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_app_package_deploy`()
BEGIN
    UPDATE `AppPackage` SET `status`='D'
    WHERE deployDt<=now() 
    AND `status` = 'S';
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_app_package_manual_deploy`
--
DROP PROCEDURE IF EXISTS `sp_rdms_app_package_manual_deploy`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_app_package_manual_deploy`(
    IN _packageID INT,
    IN _deploy_dt datetime
)
BEGIN
    UPDATE AppPackage SET `status`='M', `deployDt`=_deploy_dt WHERE id=_packageID;
    SELECT 0 as result;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_app_package_update`
--
DROP PROCEDURE IF EXISTS `sp_rdms_app_package_update`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_app_package_update`(
  IN _package_id int,
  IN _version varchar(45),
  IN _file_path varchar(255),
  IN _file_size int,
  IN _md5 varchar(32),
  IN _deploy_dt datetime
)
BEGIN
  IF (
    SELECT 1 FROM `AppPackage` WHERE `id`=_package_id
  ) THEN 
    UPDATE `AppPackage` SET `version`=_version, `filePath`=_file_path, `fileSize`=_file_size, `md5`=_md5, `deployDt`=_deploy_dt WHERE `id`=_package_id;
    SELECT 0 as 'result';
  ELSE
    SELECT -1 as 'result';
  END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_app_Package_void`
--
DROP PROCEDURE IF EXISTS `sp_rdms_app_Package_void`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_app_Package_void`(
	IN _packageID INT
)
BEGIN
	IF(SELECT 1 FROM AppPackage WHERE `id` = _packageID) THEN
		IF(SELECT 1 FROM AppPackage WHERE `id` = _packageID AND (`status` = 'N' OR `status` = 'R')) THEN
			UPDATE `AppPackage` SET `status`='V' WHERE `id` = _packageID AND (`status` = 'N' OR `status` = 'R');
			SELECT 0 AS 'result';
		ELSE
			SELECT -2 AS 'result';
		END IF;
	ELSE
		SELECT -1 AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_app_uninstall`
--
DROP PROCEDURE IF EXISTS `sp_rdms_app_uninstall`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_app_uninstall`(
	IN _appID INT
)
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE _serialNo VARCHAR(50);
	DECLARE _packageName VARCHAR(255);
	DECLARE cur1 CURSOR FOR SELECT serialNo FROM RemoteDevices WHERE deviceStatus='A';
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
	IF EXISTS (
		SELECT 1 FROM Applications WHERE id=_appID
	) THEN
		SELECT packageName INTO _packageName FROM Applications WHERE id=_appID;
		OPEN cur1;		
		read_loop: LOOP
			FETCH cur1 INTO _serialNo;
			IF done THEN
				LEAVE read_loop;
			END IF;
			CALL sp_dm_command_insert(_serialNo, 'uninstall_app', CONCAT('{"package":"',_packageName,'"}'),'P','',now(),'','');
		END LOOP;
		
		CLOSE cur1;
        
		SELECT 0 as result;
	ELSE
		SELECT -1 as result;
	END IF;
	
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_audit_get_by_date`
--
DROP PROCEDURE IF EXISTS `sp_rdms_audit_get_by_date`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_audit_get_by_date`()
BEGIN
	SELECT * FROM AuditLog
    WHERE DATE(recordDt) = DATE_ADD(DATE(NOW()), INTERVAL -1 DAY)
    ORDER BY recordDt DESC;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_audit_info_get`
--
DROP PROCEDURE IF EXISTS `sp_rdms_audit_info_get`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_audit_info_get`(
	IN _loginToken VARCHAR(100)
)
BEGIN
	
	IF NOT EXISTS(SELECT 1 FROM SDM_Login_User WHERE loginToken = _loginToken)THEN
		SELECT 'FAIL' AS 'result';
	ELSE
		SELECT
			userid AS 'userid',
			ipAddress AS 'ipAddress'
		FROM 
			SDM_Login_User
		WHERE
			loginToken = _loginToken;
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_audit_insert`
--
DROP PROCEDURE IF EXISTS `sp_rdms_audit_insert`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_audit_insert`(
	_userid VARCHAR(45),
	_ipAddress VARCHAR(45),
	_action VARCHAR(45),
	_input TEXT,
	_result CHAR(1)
)
BEGIN
	
	INSERT INTO AuditLog(
		userid,
		recordDt,
		ipAddress,
		action,
		accessResources,
		result
	)
	VALUE(
		_userid,
		NOW(),
		_ipAddress,
		_action,
		_input,
		_result
	);
	IF ROW_COUNT()>0 THEN
		SELECT 'SUCCESS' AS 'result';
	ELSE
		SELECT 'DB_FAIL' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_checkPasswordExpired`
--
DROP PROCEDURE IF EXISTS `sp_rdms_checkPasswordExpired`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_checkPasswordExpired`(
  IN _userID varchar(45)
)
BEGIN
DECLARE lastLogin DATETIME;
DECLARE password_expiry_period INT;
DECLARE password_expired_grace_period INT;
DECLARE password_expiry_alert_period INT;
IF(_userID = "SystemAdmin") THEN
	SELECT 'pass' as result;
ELSE
	IF(SELECT 1 FROM LogUserPassword WHERE userid = _userID ORDER BY recordDt DESC LIMIT 1) THEN
		SELECT recordDt INTO lastLogin FROM LogUserPassword WHERE userid = _userID ORDER BY recordDt DESC LIMIT 1;
	ELSE
		IF(SELECT 1 FROM AuditLog WHERE userid = _userID AND action = "Login" AND result = "S" ORDER BY recordDt DESC LIMIT 1) THEN
			SELECT recordDt INTO lastLogin FROM AuditLog WHERE userid = _userID AND action = "Login" AND result = "S" ORDER BY recordDt DESC LIMIT 1;
		ELSE
			SELECT NOW() INTO lastLogin;
		END IF;
	END IF;
	SELECT Value INTO password_expiry_period FROM SystemParameter WHERE `Key` = 'password_expiry_period';
	SELECT Value INTO password_expired_grace_period FROM SystemParameter  WHERE `Key` = 'password_expired_grace_period';
	SELECT Value INTO password_expiry_alert_period FROM SystemParameter WHERE `Key` = 'password_expiry_alert_period';
	IF(
		NOW() < DATE_ADD(DATE_ADD(lastLogin, INTERVAL password_expiry_period MONTH),INTERVAL -(password_expiry_alert_period) DAY)
	) THEN
		SELECT 'pass' as result;
	ELSEIF (NOW() < DATE_ADD(lastLogin, INTERVAL password_expiry_period MONTH)) THEN
		SELECT 'alert period' as result;
	ELSEIF (NOW() < DATE_ADD(DATE_ADD(lastLogin, INTERVAL password_expiry_period MONTH),INTERVAL password_expired_grace_period DAY)) THEN
		SELECT 'grace period' as result;
	ELSE
		SELECT 'over period' as result;
	END IF;
END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_command_downloadCount`
--
DROP PROCEDURE IF EXISTS `sp_rdms_command_downloadCount`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_command_downloadCount`()
BEGIN
    SELECT COUNT(*) AS count 
    FROM `OutgoingCommand`
    WHERE `command`='download' 
    AND `status` in('S','P');
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_command_get`
--
DROP PROCEDURE IF EXISTS `sp_rdms_command_get`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_command_get`(
    IN _commandID VARCHAR(50)
)
BEGIN
    SELECT 
        `commandID`,
        `commandName`,
        `expiryDtInterval`,
        `processTimeout`, 
        `clientProcessInterval`
    FROM Command
    WHERE commandID = _commandID;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_command_update_expiry`
--
DROP PROCEDURE IF EXISTS `sp_rdms_command_update_expiry`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_command_update_expiry`()
BEGIN
	UPDATE `OutgoingCommand`
	SET `status` = 'E'
	WHERE `expiryDt` <= NOW()
	AND `status` = 'P';
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_command_update_timeout`
--
DROP PROCEDURE IF EXISTS `sp_rdms_command_update_timeout`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_command_update_timeout`()
BEGIN
	UPDATE `OutgoingCommand`
	SET `status` = 'T'
	WHERE `processTimeout` <= NOW()
	AND `status` = 'S';
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_device_approve`
--
DROP PROCEDURE IF EXISTS `sp_rdms_device_approve`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_device_approve`(
  IN _serialNo varchar(50)
)
BEGIN
	IF (SELECT 1 FROM `RemoteDevices` WHERE `serialNo` = _serialNo LIMIT 1) THEN
			UPDATE RemoteDevices SET deviceStatus = 'A',lastUpdate = NOW() WHERE serialNo = _serialNo;
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_device_edit`
--
DROP PROCEDURE IF EXISTS `sp_rdms_device_edit`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_device_edit`(
	IN _serialNo VARCHAR(50),
    IN _deviceName VARCHAR(45)
)
BEGIN
	IF EXISTS(SELECT 1 FROM `RemoteDevices` WHERE `serialNo`=_serialNo) THEN
		UPDATE `RemoteDevices` SET `model` = _deviceName WHERE `serialNo` = _serialNo;
		SELECT 'SUCCESS' AS `result`;
    ELSE
		SELECT 'FAIL' AS `result`;
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_device_inactive_checking`
--
DROP PROCEDURE IF EXISTS `sp_rdms_device_inactive_checking`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_device_inactive_checking`()
BEGIN
	DECLARE _checkTime INT;
    SET _checkTime = (SELECT `Value` FROM `SystemParameter` WHERE `Key` = 'device_inactive_check_time');
	UPDATE `RemoteDevices` SET `deviceStatus` = 'I'
    WHERE `serialNo` NOT IN (
		SELECT DISTINCT `serialNo` FROM `DeviceStatus` 
        WHERE `updateDt` >= DATE_ADD(NOW(), INTERVAL -_checkTime HOUR)
    );
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_device_info_update`
--
DROP PROCEDURE IF EXISTS `sp_rdms_device_info_update`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_device_info_update`(
	IN _serialNo VARCHAR(50),
	IN _OS VARCHAR(20),
	IN _powerStatus VARCHAR(20),
	IN _powerLevel INT,
	IN _networkStatus varchar(10),
	IN _storageStatus varchar(100),
	IN _mediaVolumeLevel INT,
	IN _ringtonVolumeLevel INT,
	IN _alarmVolumeLevel INT,
	IN _deviceReportInterval INT,
	IN _updateDt DATETIME,
	IN _maxMediaVolume INT,
	IN _maxRingtonVolume INT,
	IN _maxAlarmVolume INT,
	IN _firmwareVersion VARCHAR(50),
	IN _ipAddress VARCHAR(32),
	IN _otherInfo TEXT
)
BEGIN
	IF EXISTS (SELECT 1 FROM RemoteDevices WHERE serialNo = _serialNo) THEN
		INSERT INTO DeviceStatus(
			serialNo,
			powerLevel,
			powerStatus,
			networkStatus,
			storageStatus,
			updateDt,
			OS,
			volumeLevelInMedia,
			volumeLevelInRingtone,
			volumeLevelInAlams,
			reportInterval,
			maxVolumeInMedia,
			maxVolumeInRingtone,
			maxVolumeInAlarms,
			firmwareVersion,
			ipAddress,
			otherInfo
		) VALUES (
			_serialNo,
			_powerLevel,
			_powerStatus,
			_networkStatus,
			_storageStatus,
			_updateDt,
			_OS,
			_mediaVolumeLevel, 
			_ringtonVolumeLevel,
			_alarmVolumeLevel,
			_deviceReportInterval,
			_maxMediaVolume,
			_maxRingtonVolume,
			_maxAlarmVolume,
			_firmwareVersion,
			_ipAddress,
			_otherInfo
		);
		IF ROW_COUNT()>0 THEN
			SELECT 'SUCCESS' AS 'result';
		ELSE
			SELECT 'DB_FAIL' AS 'result';
		END IF;
	ELSE
		SELECT 'FAIL' AS 'result';
	END IF;
	
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_device_register`
--
DROP PROCEDURE IF EXISTS `sp_rdms_device_register`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_device_register`(
	IN _serialNo VARCHAR(50),
	IN _deviceStatus CHAR(1)
)
BEGIN
	IF EXISTS (SELECT 1 FROM RemoteDevices WHERE serialNo = _serialNo) THEN
		UPDATE
			RemoteDevices
		SET
			deviceStatus = _deviceStatus
		WHERE
			serialNo = _serialNo;
		SELECT 'SUCCESS' AS 'result';
	ELSE
		SELECT 'FAIL' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_device_reportInterval_get`
--
DROP PROCEDURE IF EXISTS `sp_rdms_device_reportInterval_get`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_device_reportInterval_get`(
	IN _serialNo VARCHAR(50)
)
BEGIN
	IF (SELECT 1 FROM DeviceSetting WHERE serialNo = _serialNo AND settingID = 'reportInterval') THEN 
		SELECT `value` FROM DeviceSetting WHERE `serialNo` = _serialNo AND settingID = 'reportInterval';
	ELSE
		SELECT `value` FROM SystemParameter WHERE `Key` = 'report_interval';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_device_reportInterval_set`
--
DROP PROCEDURE IF EXISTS `sp_rdms_device_reportInterval_set`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_device_reportInterval_set`(
	IN _serialNo VARCHAR(50),
	IN _reportInterval int
)
BEGIN
	IF EXISTS(SELECT 1 FROM RemoteDevices WHERE `serialNo` = _serialNo) THEN
		REPLACE INTO DeviceSetting (
			serialNo,
			settingID,
			value
		)
		VALUES (
			_serialNo,
			'reportInterval',
			_reportInterval
		);
		SELECT 'SUCCESS' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_device_reportInterval_batch_set`
--
DROP PROCEDURE IF EXISTS `sp_rdms_device_reportInterval_batch_set`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_device_reportInterval_batch_set`(
	IN _whereClause VARCHAR(255),
	IN _reportInterval int
)
BEGIN
	SET @stmt_str = CONCAT('REPLACE INTO DeviceSetting(`serialNo`, `settingID`, `value`) 
	SELECT serialNo,','\'reportInterval\',',_reportInterval,' FROM Devices_View WHERE (`deviceStatus`<>\'Unregistered\')', _whereClause,'');
	PREPARE stmt1 FROM @stmt_str;
	EXECUTE stmt1;
	DEALLOCATE PREPARE stmt1;
	SELECT 'SUCCESS' AS 'result';
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_device_software_info_update`
--
DROP PROCEDURE IF EXISTS `sp_rdms_device_software_info_update`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_device_software_info_update`(
	IN _serialNo VARCHAR(50),
	IN _packageName VARCHAR(50),
	IN _version VARCHAR(50),
	IN _recordDt DATETIME
)
BEGIN
	IF EXISTS (SELECT 1 FROM RemoteDevices WHERE serialNo = _serialNo) THEN
		INSERT INTO `SoftwareStatus` (
			`serialNo`,
			`packageName`,
			`version`,
			`recordDt`
		) VALUES (
			_serialNo,
			_packageName,
			_version,
			_recordDt
		);
		IF ROW_COUNT() > 0 THEN
			SELECT 'SUCCESS' AS 'result';
		ELSE
			SELECT 'DB_FAIL' AS 'result';
		END IF;
	ELSE
		SELECT 'FAIL' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_device_status_cleanup`
--
DROP PROCEDURE IF EXISTS `sp_rdms_device_status_cleanup`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_device_status_cleanup`()
BEGIN
/*
	DELETE  D.*
	FROM    DeviceStatus D
	JOIN    (
			SELECT  serialNo,
					(
					SELECT  updateDt
					FROM    DeviceStatus D1
					WHERE   D1.serialNo = D2.serialNo
					ORDER BY
							D1.serialNo DESC, D1.updateDt DESC
					LIMIT 720, 1
					) AS mts
			FROM DeviceStatus D2
			) D3
	ON      D.serialNo = D3.serialNo
			AND D.updateDt < mts;
*/
    DECLARE _serial_no varchar(50);
    DECLARE done INT DEFAULT FALSE;
    DECLARE curl CURSOR FOR SELECT DISTINCT `serialNo` FROM `DeviceStatus`;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    CREATE TABLE IF NOT EXISTS tmp_DeviceStatus LIKE DeviceStatus;
    truncate TABLE tmp_DeviceStatus;
    OPEN curl;
    the_loop: LOOP
        FETCH curl INTO _serial_no;
        IF done THEN
            LEAVE the_loop;
        END IF;
        insert into tmp_DeviceStatus
            SELECT *
            FROM DeviceStatus
            WHERE serialNo = _serial_no
            ORDER BY serialNo DESC, updateDt DESC
            LIMIT 0, 720;
    END LOOP the_loop;
    CLOSE curl;
    RENAME TABLE DeviceStatus to back_DeviceStatus,
        tmp_DeviceStatus TO DeviceStatus;
    DROP TABLE back_DeviceStatus;
    SELECT * FROM DeviceStatus;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_device_unregister`
--
DROP PROCEDURE IF EXISTS `sp_rdms_device_unregister`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_device_unregister`( 
	IN _serialNo varchar(50)
)
BEGIN
	IF (SELECT 1 FROM `RemoteDevices` WHERE `serialNo` = _serialNo LIMIT 1) THEN
			UPDATE RemoteDevices SET deviceStatus = 'I' WHERE serialNo = _serialNo;
		SELECT 'SUCCESS' AS 'result';
	ELSE
		SELECT 'FAIL' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_dm_batchCommand_common_send`
--
DROP PROCEDURE IF EXISTS `sp_rdms_dm_batchCommand_common_send`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_dm_batchCommand_common_send`(
	IN _whereClause VARCHAR(255),
	IN _commandID varchar(50),
	IN _message text,
	IN _status char(1),
	IN _expiryDt datetime,
	IN _scheduleDt datetime,
	IN _processTimeout datetime, 
	IN _clientProcessInterval int
)
BEGIN
--	DECLARE defExpiryDt DATETIME;
--	DECLARE defProcessTimeout DATETIME;
--	DECLARE defScheduleDt DATETIME;
--	DECLARE client_process_interval int;
--
--    IF (_clientProcessInterval IS NULL OR _clientProcessInterval = '') THEN
--		SELECT `clientProcessInterval` INTO client_process_interval FROM `Command` WHERE `commandID` = _commandID;
--	ELSE
--		SET client_process_interval = _clientProcessInterval;
--	END IF;
--
--	IF (_expiryDt = '' OR _expiryDt = '0000-00-00 00:00:00') THEN
--		SELECT DATE_ADD(NOW(), INTERVAL (`expiryDtInterval` / 1000) SECOND) INTO defExpiryDt FROM Command WHERE commandID = _commandID;
--	ELSE
--		SET defExpiryDt = _expiryDt;
--	END IF;
--
--	IF (_processTimeout = '' OR _processTimeout = '0000-00-00 00:00:00') THEN
--		SELECT DATE_ADD(NOW(), INTERVAL (`processTimeout` / 1000) SECOND) INTO defProcessTimeout FROM Command WHERE commandID = _commandID;
--	ELSE
--		SET defProcessTimeout = _processTimeout;
--	END IF;
--
--	IF (_scheduleDt = '' OR _scheduleDt = '0000-00-00 00:00:00') THEN
--		SET defScheduleDt = NOW();
--	ELSE
--		SET defScheduleDt = _scheduleDt;
--	END IF;
--
--    SET @stmt_str = CONCAT('INSERT INTO OutgoingCommand(`serialNo`, `command`, `message`, `status`, `createDt`,`lastUpdate`, `expiryDt`, `scheduleDt`, `processTimeout`,`clientProcessInterval`) 
--    SELECT serialNo,','\'',_commandID,'\',','\'',_message,'\',','\'',_status,'\',','\'',NOW(),'\',','\'',NOW(),'\',','\'',defExpiryDt,'\',','\'',defScheduleDt,'\',','\'',defProcessTimeout,'\',',client_process_interval,' FROM Devices_View WHERE (`deviceStatus`<>\'Unregistered\')', _whereClause,'');
--
--    PREPARE stmt1 FROM @stmt_str;
--
--    EXECUTE stmt1;
--    DEALLOCATE PREPARE stmt1;
--
--	SELECT "SUCCESS" AS "result";
    DECLARE defExpiryDt DATETIME;
    DECLARE defProcessTimeout DATETIME;
    DECLARE defScheduleDt DATETIME;
    DECLARE client_process_interval int;
    DECLARE rowCount INT DEFAULT 0;
    DECLARE done INT DEFAULT 0;
    DECLARE temp_sn varchar(50) DEFAULT NULL;
    DECLARE cur CURSOR FOR (SELECT serialNo FROM temp_device_filter_view);
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    IF (_clientProcessInterval IS NULL OR _clientProcessInterval = '') THEN
        SELECT `clientProcessInterval` INTO client_process_interval FROM `Command` WHERE `commandID` = _commandID;
    ELSE
        SET client_process_interval = _clientProcessInterval;
    END IF;
    IF (_expiryDt = '' OR _expiryDt = '0000-00-00 00:00:00') THEN
        SELECT DATE_ADD(NOW(), INTERVAL (`expiryDtInterval` / 1000) SECOND) INTO defExpiryDt FROM Command WHERE commandID = _commandID;
    ELSE
        SET defExpiryDt = _expiryDt;
    END IF;
    IF (_processTimeout = '' OR _processTimeout = '0000-00-00 00:00:00') THEN
        SELECT DATE_ADD(NOW(), INTERVAL (`processTimeout` / 1000) SECOND) INTO defProcessTimeout FROM Command WHERE commandID = _commandID;
    ELSE
        SET defProcessTimeout = _processTimeout;
    END IF;
    IF (_scheduleDt = '' OR _scheduleDt = '0000-00-00 00:00:00') THEN
        SET defScheduleDt = NOW();
    ELSE
        SET defScheduleDt = _scheduleDt;
    END IF;
    DROP VIEW IF EXISTS temp_device_filter_view;
    SET @stmt_filter_str = 'CREATE VIEW temp_device_filter_view AS ';
    SET @stmt_filter_str = CONCAT(@stmt_filter_str, 'SELECT serialNo FROM Devices_View WHERE (`deviceStatus`<>\'Unregistered\')', _whereClause,'');
    PREPARE stmt_filter FROM @stmt_filter_str;
    EXECUTE stmt_filter;
    DEALLOCATE PREPARE stmt_filter;
    OPEN cur;
    FETCH cur INTO temp_sn;
    WHILE done <> 1 DO
        SELECT COUNT(*) INTO rowCount FROM OutgoingCommand
        WHERE
            serialNo = temp_sn
            AND status = 'P'
            AND expiryDt > now()
            AND scheduleDt <= now();
        IF (rowCount < 200) THEN
            SET @stmt_insert_str = CONCAT('INSERT INTO OutgoingCommand(`serialNo`, `command`, `message`, `status`, `createDt`,`lastUpdate`, `expiryDt`, `scheduleDt`, `processTimeout`,`clientProcessInterval`)
            SELECT serialNo,','\'',_commandID,'\',','\'',_message,'\',','\'',_status,'\',','\'',NOW(),'\',','\'',NOW(),'\',','\'',defExpiryDt,'\',','\'',defScheduleDt,'\',','\'',defProcessTimeout,'\',',client_process_interval,' FROM Devices_View WHERE serialNo =', '\'', temp_sn, '\'');
            PREPARE stmt_insert FROM @stmt_insert_str;
            EXECUTE stmt_insert;
            DEALLOCATE PREPARE stmt_insert;
        END IF;
        FETCH cur INTO temp_sn;
    END WHILE;
    CLOSE cur;
    SELECT "SUCCESS" AS "result";
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_dm_batchCommand_download_send`
--
DROP PROCEDURE IF EXISTS `sp_rdms_dm_batchCommand_download_send`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_dm_batchCommand_download_send`(
    IN _deviceModel VARCHAR(8),
    IN _whereClause VARCHAR(255),
    IN _appID INT,
    IN _deployDt DATETIME,
    IN _priority INT
)
BEGIN
    DECLARE _packageID INT;
    DECLARE _fileType VARCHAR(50);
    DECLARE _src VARCHAR(255);
    DECLARE _md5 VARCHAR(32);
    DECLARE _fileSize FLOAT;
    IF EXISTS(SELECT 1 FROM `AppPackage` WHERE `appID` = _appID AND (`status` = 'R' OR `status` = 'D' OR `status` = 'M') AND `deviceModel` = _deviceModel) THEN
    BEGIN
        SELECT 
            `id`,
            IF(_appID = 0, 'FIRMWARE', 'APP'), 
            `filePath`,
            `md5`, 
            `fileSize`
        INTO _packageID, _fileType, _src, _md5, _fileSize
        FROM `AppPackage` 
        WHERE `appID` = _appID AND (`status` = 'R' OR `status` = 'D' OR `status` = 'M') AND `deviceModel` = _deviceModel
        ORDER BY lastUpdateDt DESC LIMIT 1;
        SET @stmt_str = CONCAT('INSERT INTO DownloadQueue(`serialNo`, `packageID`, `fileType`, `src`, `md5`, `fileSize`, `status`, `priority`, `deploymentDt`, `createDt`, `deviceLastSeen`)
        SELECT serialNo,','\'',_packageID,'\',','\'',_fileType,'\',','\'',_src,'\',','\'',_md5,'\',','\'',_fileSize,'\',','\'P\',','\'10\',','\'',_deployDt,'\',','\'',NOW(),'\',','\'',NOW(),'\' FROM Devices_View WHERE left(`serialNo`, 8) = \'',_deviceModel,'\' AND `deviceStatus`<>\'Unregistered\'', _whereClause,'');
        PREPARE stmt1 FROM @stmt_str;
        EXECUTE stmt1;
        DEALLOCATE PREPARE stmt1;
        SELECT 'SUCCESS' AS "result";
    END;
    ELSE 
        SELECT 'FAIL' AS "result";
    END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_dm_install_available_app_list_get`
--
DROP PROCEDURE IF EXISTS `sp_rdms_dm_install_available_app_list_get`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_dm_install_available_app_list_get`(
  IN _serial_no varchar(50)
)
BEGIN
    IF _serial_no = '' THEN
        SELECT A.`id`, A.`name` FROM `Applications` A 
        INNER JOIN (SELECT P.`id`, P.`appID`, max(`lastUpdateDt`) FROM `AppPackage` P WHERE (P.`status`='R' OR P.`status`='S' OR P.`status`='D' OR P.`status`='M') GROUP BY P.`appID`) T 
        ON A.`id`=T.`appID`; 
    ELSE
        SELECT A.`id`, A.`name` FROM `Applications` A 
        INNER JOIN (SELECT P.`id`, P.`appID`, max(`lastUpdateDt`) FROM `AppPackage` P WHERE ((P.`status`='R' OR P.`status`='S' OR P.`status`='D' OR P.`status`='M') AND P.`deviceModel` = left(_serial_no, 8)) GROUP BY P.`appID`) T 
        ON A.`id`=T.`appID`; 
    END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_dm_installed_app_list_get`
--
DROP PROCEDURE IF EXISTS `sp_rdms_dm_installed_app_list_get`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_dm_installed_app_list_get`(
    IN _serialNo VARCHAR(50)
)
BEGIN
    IF (_serialNo = '') THEN
        SELECT DISTINCT packageName FROM DeviceInstalledApp_View;
    ELSE
        SELECT packageName FROM DeviceInstalledApp_View WHERE serialNo = _serialNo;
    END IF;
    SELECT 'SUCCESS' AS 'result';
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_DownloadQueue_get`
--
DROP PROCEDURE IF EXISTS `sp_rdms_DownloadQueue_get`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_DownloadQueue_get`(
    IN _count INT
)
BEGIN
    SET @DEPLOYMENT_DT = now();
    SET @COUNT = _count; 
    SELECT `Value` INTO @hostname FROM `SystemParameter` WHERE `Key` = 'host_name';
    PREPARE STMT FROM 
    "   SELECT 
            `D`.`id`,
            `D`.`serialNo`,
            `D`.`packageID`,
            `D`.`fileType`,
            CONCAT(?, REPLACE(`D`.`src`, '../', '')) AS `src`,
            `D`.`md5`,
            `D`.`fileSize`,
            `D`.`status`,
            `D`.`priority`,
            `D`.`deploymentDt`,
            `A`.`packageName`
        FROM DownloadQueue `D`
        LEFT JOIN `AppPackage` `P` ON `P`.`id` = `D`.`packageID`
        LEFT JOIN `Applications` `A` ON `A`.`id` = `P`.`appID`
        WHERE `D`.deploymentDt < ?
        AND `D`.`status` = 'P'
        ORDER BY `D`.deviceLastSeen DESC, `D`.deploymentDt
        LIMIT ?"; 
    EXECUTE STMT USING @hostname, @DEPLOYMENT_DT, @COUNT;
    DEALLOCATE PREPARE STMT;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_download_queue_cleanup`
--
DROP PROCEDURE IF EXISTS `sp_rdms_download_queue_cleanup`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_download_queue_cleanup`()
BEGIN
	DELETE FROM `DownloadQueue` 
    WHERE `deploymentDt` < DATE_ADD(NOW(), INTERVAL -1 MONTH);
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_getAllPermissionOfUser`
--
DROP PROCEDURE IF EXISTS `sp_rdms_getAllPermissionOfUser`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_getAllPermissionOfUser`(
	IN _userid varchar(45)
)
BEGIN
	SELECT DISTINCT GP.permissionKey FROM SDM_Login_GroupPermission GP 
	INNER JOIN SDM_Login_UserGroup UG on UG.groupID = GP.groupID
	INNER JOIN SDM_Login_User U on UG.userid = U.userid
	WHERE U.userid = _userid
	UNION
	SELECT DISTINCT UP.permissionKey FROM SDM_Login_UserPermission UP
	INNER JOIN SDM_Login_User U on UP.userid = U.userid
	WHERE U.userid = _userid;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_IncompleteFactoryResetCommand_update`
--
DROP PROCEDURE IF EXISTS `sp_rdms_IncompleteFactoryResetCommand_update`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_IncompleteFactoryResetCommand_update`(
	IN _serialNo VARCHAR(50)
)
BEGIN
	UPDATE OutgoingCommand SET `status` = 'D' 
    WHERE serialNo = _serialNo 
    AND command = 'factory_reset'
    AND `status` = 'S'
    ORDER BY lastUpdate
    LIMIT 1;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_loginHistory_get`
--
DROP PROCEDURE IF EXISTS `sp_rdms_loginHistory_get`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_loginHistory_get`(
	IN _userid VARCHAR(45)
)
BEGIN
	SELECT userid,recordDt,ipAddress 
    FROM AuditLog
    WHERE userid = _userid
    AND `action` = 'Login'
    AND `result` = 'S'
    ORDER BY recordDt DESC LIMIT 20;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_reset_user_password`
--
DROP PROCEDURE IF EXISTS `sp_rdms_reset_user_password`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_reset_user_password`(
	IN _userid VARCHAR(45),
    /*IN _oldPassword VARCHAR(45),*/
    IN _newPassword VARCHAR(45)
)
BEGIN
	IF EXISTS(SELECT 1 FROM `SDM_Login_User` WHERE `userid` = _userid) THEN
		/*IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE `password` = md5(_oldPassword) AND `userid` = _userid) THEN*/
			UPDATE SDM_Login_User SET `password` = md5(_newPassword)
			WHERE `userid` = _userid;
            
			IF ROW_COUNT() > 0 THEN
				SELECT 'SUCCESS' AS 'result';
			ELSE
				SELECT 'DB_FAIL' AS 'result';
			END IF;
		/*
		ELSE
			SELECT 'INVALID_OLDPASSWORD' AS 'result';
		END IF;
		*/
	ELSE
		SELECT 'USER_NOT_FOUND' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_syspara_get_by_key`
--
DROP PROCEDURE IF EXISTS `sp_rdms_syspara_get_by_key`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_syspara_get_by_key`(
    IN _key VARCHAR(255)
)
BEGIN
    SELECT `Key`, `DisplayName`, `Value` 
    From `SystemParameter` 
    WHERE `Key` = _key;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_system_setting_get`
--
DROP PROCEDURE IF EXISTS `sp_rdms_system_setting_get`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_system_setting_get`()
BEGIN
	SELECT `Key`, `Value` FROM `SystemParameter`;
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_system_setting_set`
--
DROP PROCEDURE IF EXISTS `sp_rdms_system_setting_set`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_system_setting_set`(
	IN _login_timeout VARCHAR(255),
	IN _login_attempt_count VARCHAR(255),
	IN _login_error_block_time VARCHAR(255),
    IN _password_reuse_period VARCHAR(255),
    IN _password_expiry_period VARCHAR(255),
    IN _password_expired_grace_period VARCHAR(255),
    IN _password_expiry_alert_period VARCHAR(255),
    IN _log_backup_location VARCHAR(255),
    IN _report_interval VARCHAR(255)
    
)
BEGIN
	IF(_login_timeout <> '') THEN
	UPDATE SystemParameter SET `Value` = _login_timeout WHERE `Key` = 'login_timeout';
    END IF;
    
	IF(_login_attempt_count <> '') THEN
    UPDATE SystemParameter SET `Value` = _login_attempt_count WHERE `Key` = 'login_attempt_count';
    END IF;
    
	IF(_login_error_block_time <> '') THEN
    UPDATE SystemParameter SET `Value` = _login_error_block_time WHERE `Key` = 'login_error_block_time';
    END IF;
    
	IF(_password_reuse_period <> '') THEN
    UPDATE SystemParameter SET `Value` = _password_reuse_period WHERE `Key` = 'password_reuse_period';
    END IF;
    
	IF(_password_expiry_period <> '') THEN
    UPDATE SystemParameter SET `Value` = _password_expiry_period WHERE `Key` = 'password_expiry_period';
    END IF;
    
	IF(_password_expired_grace_period <> '') THEN
    UPDATE SystemParameter SET `Value` = _password_expired_grace_period WHERE `Key` = 'password_expired_grace_period';
    END IF;
    
	IF(_password_expiry_alert_period <> '') THEN
    UPDATE SystemParameter SET `Value` = _password_expiry_alert_period WHERE `Key` = 'password_expiry_alert_period';
    END IF;
    
	IF(_log_backup_location <> '') THEN
    UPDATE SystemParameter SET `Value` = _log_backup_location WHERE `Key` = 'log_backup_location';
    END IF;
    
	IF(_report_interval <> '') THEN
    UPDATE SystemParameter SET `Value` = _report_interval WHERE `Key` = 'report_interval';
    END IF;
    
END $$
DELIMITER ;
--
-- Procedure `sp_rdms_user_attempt_resume_time_get`
--
DROP PROCEDURE IF EXISTS `sp_rdms_user_attempt_resume_time_get`;
DELIMITER $$
CREATE PROCEDURE `sp_rdms_user_attempt_resume_time_get`(
	IN _userid VARCHAR(45)
)
BEGIN
	DECLARE _lockOutTime INT;
    
    SELECT CAST(`VALUE` AS DECIMAL) INTO _lockOutTime FROM SystemParameter WHERE `Key` = 'login_error_block_time';
    
	SELECT CASE 
		WHEN DATE_ADD(recordDt, INTERVAL _lockOutTime MINUTE) > NOW() THEN CAST(DATE_ADD(recordDt, INTERVAL _lockOutTime MINUTE) AS CHAR)
		ELSE '0' 
    END
    AS `resumeTime`
    FROM AuditLog 
    WHERE `action` = 'Login Attempt' 
    AND userid = _userid 
    ORDER BY recordDt DESC LIMIT 1;
END $$
DELIMITER ;
--
-- Procedure `sp_reset_password_check_new`
--
DROP PROCEDURE IF EXISTS `sp_reset_password_check_new`;
DELIMITER $$
CREATE PROCEDURE `sp_reset_password_check_new`(
    IN _userid VARCHAR(45),
    IN _password VARCHAR(45)
)
BEGIN
    DECLARE _password_reuse_period INT;
    SET _password_reuse_period = (SELECT Value FROM SystemParameter WHERE `Key` = 'password_reuse_period');
    
    IF EXISTS(
        SELECT 1 FROM LogUserPassword 
        WHERE userid = _userid
        AND password = md5(_password) 
        AND recordDt > DATE_ADD(NOW(), INTERVAL -_password_reuse_period MONTH))
    THEN
        -- FAIL
        SELECT 1 AS result;
    ELSE 
        IF EXISTS(
            SELECT 1 FROM SDM_Login_User 
            WHERE userid = _userid
            AND password = md5(_password))
            THEN
                -- FAIL
                SELECT 1 AS result;
            ELSE
                -- SUCCESS
                SELECT 0 AS result;
            END IF;
    END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_DisableUser_delete`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_DisableUser_delete`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_DisableUser_delete`(
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
		AND userid = _userid;
		IF ROW_COUNT() > 0 THEN
			SELECT 'SUCCESS' AS 'result';
		ELSE
			SELECT 'DBFAIL' AS 'result';
		END IF;
	ELSE
		SELECT 'FAIL' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_enableUser_delete`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_enableUser_delete`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_enableUser_delete`(
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
		AND userid = _userid;
		IF ROW_COUNT() > 0 THEN
			SELECT 'SUCCESS' AS 'result';
		ELSE
			SELECT 'DBFAIL' AS 'result';
		END IF;
	ELSE
		SELECT 'FAIL' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_GroupAdd`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_GroupAdd`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_GroupAdd`(
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
	
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_GroupDelete`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_GroupDelete`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_GroupDelete`(
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
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_GroupEdit`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_GroupEdit`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_GroupEdit`(
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
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_GroupEditUser`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_GroupEditUser`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_GroupEditUser`(
	IN _userid VARCHAR(45),
	IN _groupid INT(11),
	IN _action CHAR(1)
)
BEGIN
	IF(_action = 'A') THEN
		IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE userid = _userid AND status = 'A') THEN
			IF EXISTS(SELECT 1 FROM SDM_Login_Group WHERE groupID = _groupid AND status = 'A') THEN
				IF NOT EXISTS(SELECT 1 FROM SDM_Login_UserGroup WHERE groupID = _groupid AND userid = _userid) THEN
					INSERT INTO
						SDM_Login_UserGroup(groupID, userid)
					VALUES
						(_groupid, _userid);
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
		IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE userid = _userid AND status = 'A') THEN
			IF EXISTS(SELECT 1 FROM SDM_Login_Group WHERE groupID = _groupid AND status = 'A') THEN
				IF EXISTS(SELECT 1 FROM SDM_Login_UserGroup WHERE groupID = _groupid AND userid = _userid) THEN
					DELETE FROM
						SDM_Login_UserGroup
					WHERE
						userid = _userid
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
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_GroupShowAll`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_GroupShowAll`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_GroupShowAll`()
BEGIN
	SELECT
		groupID,
		groupShortName,
		groupDes
	FROM
		SDM_Login_Group;
END $$
DELIMITER ;

--
-- Procedure `sp_SDM_AccessControl_GroupShowAllUser`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_GroupShowAllUser`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_GroupShowAllUser`(
	IN _groupid INT(11)
)
BEGIN
	IF EXISTS(SELECT 1 FROM SDM_Login_Group WHERE groupID = _groupid) THEN
		SELECT
			LGROUP.groupShortName,
			LGROUP.groupDes,
			LGROUP.groupID,
			LUSERGROUP.userid,
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
			ON LU.userid = LUSERGROUP.userid
		WHERE
			LGROUP.groupID = _groupid
			AND LGROUP.status = 'A';
	ELSE
		SELECT 'INVALID_GROUPID' AS 'result';
	END IF;
END $$
DELIMITER ;

--
-- Procedure `sp_SDM_AccessControl_LoginSubmitChecking`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_LoginSubmitChecking`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_LoginSubmitChecking`(
	IN _userid VARCHAR(45),
	IN _password VARCHAR(45),
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
		SDM_Login_User WHERE userid = _userid
		AND	password = md5(_password)	AND status='A';
	SET _loginToken = md5(CONCAT(_userid, now()));
	UPDATE 
		SDM_Login_User 
	SET 
		lastLoginDt = NOW(),
		loginToken = _loginToken,
		lastAccessDt = now(),
		ipAddress = _ipAddress
	WHERE 
		userid = _userid
		AND	password = md5(_password)
		AND status='A';
	IF ROW_COUNT()>0 THEN
		SELECT 'SUCCESS' AS 'result' , _lastLoginSuccessTime AS 'lastSuccess',_lastLoginFailTime AS 'lastFail' , _loginToken AS 'loginToken';
	ELSE 
		UPDATE 
			SDM_Login_User 
		SET 
			lastFailLoginDt = NOW()
		WHERE 
			userid = _userid;
		SELECT 'FAIL' AS 'result' , _lastLoginSuccessTime AS 'lastSuccess',_lastLoginFailTime AS 'lastFail' , '' AS 'loginToken';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_LoginVerify`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_LoginVerify`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_LoginVerify`(
	IN _token VARCHAR(100),
	IN _sessionTimeOutLimit int,
	IN _extendSession int,
	IN _ipAddress VARCHAR(32)
)
BEGIN
	DECLARE _lastAccessDt TIMESTAMP;
	DECLARE _login_timeout int;
	SELECT `Value` into _login_timeout FROM SystemParameter where `key` = 'login_timeout' LIMIT 1;
	SELECT 
		lastAccessDt INTO _lastAccessDt
	FROM
		SDM_Login_User
	WHERE
		loginToken = _token;
	IF EXISTS (SELECT 1 FROM SDM_Login_User WHERE loginToken = _token AND ipAddress = _ipAddress) THEN
		IF ((_lastAccessDt + INTERVAL IFNULL(_login_timeout*60,_sessionTimeOutLimit) SECOND) < now()) THEN
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
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_LogoutSubmit`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_LogoutSubmit`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_LogoutSubmit`(
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
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_PermissionAdd`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_PermissionAdd`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_PermissionAdd`(
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
END $$
DELIMITER ;

--
-- Procedure `sp_SDM_AccessControl_PermissionAssignToUser`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_PermissionAssignToUser`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_PermissionAssignToUser`(
	IN _userid VARCHAR(45),
	IN _permissionKey VARCHAR(45),
	IN _accessType CHAR(1)
)
BEGIN
	IF EXISTS(SELECT 1 FROM SDM_Login_Permission WHERE permissionKey = _permissionKey) THEN
		IF (_accessType = 'A') OR (_accessType = 'D') THEN
			IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE userid = _userid) THEN
				IF EXISTS(SELECT 1 FROM SDM_Login_UserPermission WHERE userid = _userid AND permissionKey = _permissionKey) THEN
					UPDATE
						SDM_Login_UserPermission
					SET
						accessType = _accessType
					WHERE
						userid = _userid
					AND permissionKey = _permissionKey;
					SELECT 'SUCCESS' AS 'result';
				ELSE
					INSERT INTO
						SDM_Login_UserPermission(userid, permissionKey, accessType)
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
				userid = _userid
				AND permissionKey = _permissionKey;
			SELECT 'SUCCESS' AS 'result';
		ELSE
			SELECT 'FAIL' AS 'result';
		END IF;
	ELSE
		SELECT 'INVALID_PERMISSIONKEY' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_PermissionDelete`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_PermissionDelete`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_PermissionDelete`(
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
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_PermissionEdit`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_PermissionEdit`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_PermissionEdit`(
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
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_PermissionGrantToGroup`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_PermissionGrantToGroup`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_PermissionGrantToGroup`(
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
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_PermissionRemoveFromGroup`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_PermissionRemoveFromGroup`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_PermissionRemoveFromGroup`(
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
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_PermissionShowAll`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_PermissionShowAll`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_PermissionShowAll`()
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
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_PermissionShowAllOfGroup`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_PermissionShowAllOfGroup`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_PermissionShowAllOfGroup`(
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
	
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_PermissionShowAllOfUser`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_PermissionShowAllOfUser`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_PermissionShowAllOfUser`(
		IN _userid VARCHAR(45)
)
BEGIN
	IF EXISTS(SELECT 1 FROM SDM_Login_User Where userid = _userid) THEN
		SELECT
			'SUCCESS' AS 'result',
			permissionKey,
			'SYS' AS 'permissionType',
			accessType
		FROM
			SDM_Login_UserPermission
		WHERE
			userid = _userid
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
			userid = _userid
			AND permissionKey NOT LIKE 'SYS_SDM%';
	ELSE
		SELECT 'INVALID_USERID' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_PermissionVerify`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_PermissionVerify`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_PermissionVerify`(
	IN _token VARCHAR(100),
	IN _sessionTimeOutLimit int,
	IN _permissonKey VARCHAR(45)
)
BEGIN
	DECLARE _userid VARCHAR(45);
	DECLARE _groupID INT(11);
	DECLARE _login_timeout int;
	SELECT `Value` into _login_timeout FROM SystemParameter where `key` = 'login_timeout' LIMIT 1;
	IF EXISTS (SELECT 1 FROM SDM_Login_User WHERE loginToken = _token) Then
		IF NOT EXISTS (
						SELECT 
							1 
						FROM 
							SDM_Login_UserPermission LUSERPERMISSION
						INNER JOIN
							SDM_Login_User LUSER
							ON
								LUSER.userid = LUSERPERMISSION.userid
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
								LUSER.userid = LUSERPERMISSION.userid
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
						LUSER.userid = LGROUP.userid
						
					INNER JOIN
						SDM_Login_GroupPermission LPERMG
						ON
						LGROUP.groupID = LPERMG.groupID
						
					WHERE
						LUSER.loginToken = _token
						AND	(LUSER.lastAccessDt + INTERVAL IFNULL(_login_timeout*60,_sessionTimeOutLimit) SECOND) > now()
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
END $$
DELIMITER ;

--
-- Procedure `sp_SDM_AccessControl_UserAdd`
--
--  添加_parentid用户的_userid子用户
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_UserAdd`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_UserAdd`(
    IN _parentid VARCHAR(45),
	IN _userid VARCHAR(45),
	IN _password VARCHAR(45),
	IN _email VARCHAR(150),
	IN _status CHAR(1)
)
BEGIN
	IF NOT EXISTS(SELECT 1 FROM SDM_Login_User WHERE email = _email) THEN
		IF NOT EXISTS(SELECT 1 FROM SDM_Login_User WHERE userid = _userid) THEN
			IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE userid = _parentid) THEN
				START TRANSACTION;
				SELECT rgt - 1 INTO @newRight FROM SDM_Login_User WHERE userid = _parentid;
				UPDATE SDM_Login_User SET rgt = rgt + 2 WHERE rgt > @newRight;
				UPDATE SDM_Login_User SET lft = lft + 2 WHERE lft > @newRight;
				INSERT INTO
					SDM_Login_User (userid, password, email, status, lft, rgt)
				VALUES
					(_userid, md5(_password), _email, _status, @newRight + 1, @newRight + 2);
				
				IF ROW_COUNT() > 0 THEN
					SELECT 'SUCCESS' AS 'result';
				ELSE
					SELECT 'DB_FAIL' AS 'result';
				END IF;
				
				COMMIT;
			ELSE
				SELECT 'INVALID_PARENTID' AS 'result';
			END IF; 
		ELSE
			SELECT 'DUPLICATE_USERID' AS 'result';
		END IF;
	ELSE
		SELECT 'DUPLICATE_EMAIL' AS 'result';
	END IF;
END $$
DELIMITER ;

--
-- Procedure `sp_SDM_AccessControl_UserGet`
--
--  获取userid用户的数据
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_UserGet`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_UserGet`(
	IN _userid VARCHAR(45)
)
BEGIN
    IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE userid = _userid) THEN
        SELECT
            'SUCCESS' AS 'result',
            (select ifnull(group_concat(`G`.`groupShortName` separator ', '),'--') from (`SDM_Login_Group` `G` join `SDM_Login_UserGroup` `UG` on((`G`.`groupID` = `UG`.`groupID`))) where (`UG`.`userid` = _userid)) AS usertype,
            username,
            company,
            title,
            email,
            address,
            notes
            FROM
                SDM_Login_User
            WHERE
                userid = _userid;
    ELSE
        SELECT 'INVALID_USERID' AS 'result';
    END IF;
END $$
DELIMITER ;

--
-- Procedure `sp_SDM_AccessControl_UserForgetPassword`
--
--  通过用户名或邮箱地址找回用户名和密码的md5值
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_UserForgetPassword`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_UserForgetPassword`(
	IN _userid VARCHAR(45),
	IN _email VARCHAR(150)
)
BEGIN
IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE (_userid <> '' AND userid = _userid) OR (_email <> '' AND email = _email)) THEN
	SELECT
		'SUCCESS' AS 'result',
		userid,
		password,
		email
		FROM
			SDM_Login_User
		WHERE
			(_userid <> '' AND userid = _userid) OR (_email <> '' AND email = _email);
ELSE
	SELECT 'INVALID_USER' AS 'result';
END IF;
END $$
DELIMITER ;

--
-- Procedure `sp_SDM_AccessControl_UserEditPassword`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_UserEditPassword`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_UserEditPassword`(
	IN _token VARCHAR(100),
	IN _oldPassword VARCHAR(45),
	IN _newPassword VARCHAR(45),
	IN _extendSession int
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'DB FAIL' AS 'result';
    END;
	START TRANSACTION;
	IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE loginToken = _token AND status = 'A') THEN
		IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE password = md5(_oldPassword) AND loginToken = _token) THEN
			UPDATE
				SDM_Login_User
			SET
				password = md5(_newPassword)
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
			COMMIT;    
			SELECT 'SUCCESS' AS 'result'; 
		ELSE
			SELECT 'INVALID_OLDPASSWORD' AS 'result';
		END IF;
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_UserEditStatus`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_UserEditStatus`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_UserEditStatus`(
	IN _userid VARCHAR(45),
	IN _status CHAR(1)
)
BEGIN
	IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE userid = _userid) THEN
		UPDATE
			SDM_Login_User
		SET
			status = _status
		WHERE
			userid = _userid;
		SELECT 'SUCCESS' AS 'result';
		
	ELSE
		SELECT 'INVALID_USERID' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_UserShowAll`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_UserShowAll`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_UserShowAll`()
BEGIN
	SELECT
		userid,
		status
	FROM
		SDM_Login_User;
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_AccessControl_UserShowDetail`
--
DROP PROCEDURE IF EXISTS `sp_SDM_AccessControl_UserShowDetail`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_AccessControl_UserShowDetail`(
	IN _userid VARCHAR(45)
)
BEGIN
	IF EXISTS(SELECT 1 FROM SDM_Login_User WHERE userid = _userid) THEN
		IF NOT EXISTS(SELECT 1 FROM SDM_Login_UserGroup WHERE userid = _userid) THEN
			SELECT
				LUSER.userid,
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
				LUSER.userid = _userid;
		ELSE
			SELECT
				LUSER.userid,
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
					LUSERGROUP.userid = _userid
			INNER JOIN
				SDM_Login_Group LGROUP
				ON
					LGROUP.groupID = LUSERGROUP.groupID
			WHERE
				LUSER.userid = _userid;
		END IF;
	ELSE
		SELECT 'INVALID_USERID' AS 'result';
	END IF;
END $$
DELIMITER ;
--
-- Procedure `sp_SDM_GridView_GetGridPageFromView`
--
DROP PROCEDURE IF EXISTS `sp_SDM_GridView_GetGridPageFromView`;
DELIMITER $$
CREATE PROCEDURE `sp_SDM_GridView_GetGridPageFromView`(
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
    PREPARE stmt_select FROM @statement;
    EXECUTE stmt_select;
END $$
DELIMITER ;
--
-- Procedure `sp_tmp_OutgoingCommand_to_OutgoindCommand`
--
DROP PROCEDURE IF EXISTS `sp_tmp_OutgoingCommand_to_OutgoindCommand`;
DELIMITER $$
CREATE PROCEDURE `sp_tmp_OutgoingCommand_to_OutgoindCommand`()
BEGIN
	INSERT INTO OutgoingCommand (
		`serialNo`,
		`command`,
		`message`,
		`status`,
		`createDt`,
		`lastUpdate`,
		`expiryDt`,
		`scheduleDt`,
		`processTimeout`,
		`clientProcessInterval`
	)
	SELECT
		`serialNo`,
		`command`,
		`message`,
		`status`,
		`createDt`,
		`lastUpdate`,
		`expiryDt`,
		`scheduleDt`,
		`processTimeout`,
		`clientProcessInterval`
	FROM tmp_OutgoingCommand;
	DELETE FROM tmp_OutgoingCommand;
END $$
DELIMITER ;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;