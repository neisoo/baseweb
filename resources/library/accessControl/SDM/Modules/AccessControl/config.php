<?php
//set SDM Access Control time out time in second eg:60 = 1 min
$SDMAccessControlTimeOut = 60;

//set SDM Access Control if true then user status auto "A" else user status to be "P" 
$SDMAccessControlAutoActiveNewRegister = true;


// API action addUser

// Add User
// System default: SYS_SDM_USER_ADD
// $SDMAccessControlAPIRequestPermission["addUser"] = "SYS_SDM_USER_ADD"; 

// Enable and disbale User
// System default: SYS_SDM_USER_ENABLE_DISABLE
// $SDMAccessControlAPIRequestPermission["userEnableDisable"] = "SYS_SDM_USER_ENABLE_DISABLE";

// Add Group
// System default: SYS_SDM_GROUP_ADD
$SDMAccessControlAPIRequestPermission["addGroup"] = "SYS_SDM_GROUP_ADD";

// Delete Group
// System default: SYS_SDM_GROUP_DEL
$SDMAccessControlAPIRequestPermission["deleteGroup"] = "SYS_SDM_GROUP_DEL";

// Edit Group
// System default: SYS_SDM_GROUP_EDIT
$SDMAccessControlAPIRequestPermission["editGroup"] = "SYS_SDM_GROUP_EDIT";

// Show All Group Of User
// System default: SYS_SDM_GROUP_SHOWALLOFUSER
//$SDMAccessControlAPIRequestPermission["showAllGroupUser"] = "SYS_SDM_GROUP_SHOWALLUSER";

//Edit Group of User
//System default: SYS_SDM_GROUP_EDIT_USER
// $SDMAccessControlAPIRequestPermission["editGroupUser"] = "SYS_SDM_GROUP_EDITUSER";

// Add Permission
// System default: SYS_SDM_PERMISSION_ADD
$SDMAccessControlAPIRequestPermission["addPermission"] = "SYS_SDM_PERMISSION_ADD";

// Delete Permission
// System default: SYS_SDM_PERMISSION_DEL
$SDMAccessControlAPIRequestPermission["deletePermission"] = "SYS_SDM_PERMISSION_DEL";

// Edit Permission
// System default: SYS_SDM_PERMISSION_EDIT
$SDMAccessControlAPIRequestPermission["editPermission"] = "SYS_SDM_PERMISSION_EDIT";

// View Other Permission
// System default: SYS_SDM_PERMISSION_VIEWOTHER
//$SDMAccessControlAPIRequestPermission["showAllPermissionOfUser"] = "SYS_SDM_PERMISSION_VIEWOTHER";

// Assign Permission
// System default: SYS_SDM_PERMISSION_ASSIGN
$SDMAccessControlAPIRequestPermission["assignPermissionToUser"] = "SYS_SDM_PERMISSION_ASSIGN";

//Assign Permission To Group
//System default: SYS_SDM_PERMISSION_ASSIGN
$SDMAccessControlAPIRequestPermission["assignPermissionToGroup"] = "SYS_SDM_PERMISSION_ASSIGN";

//view User Detail
//System default: SYS_SDM_USER_VIEWDETAIL
// $SDMAccessControlAPIRequestPermission["showUserDetail"] = "SYS_SDM_USER_SHOWDETAIL";

//show All User
//System default: SYS_SDM_USER_SHOWALL
// $SDMAccessControlAPIRequestPermission["showAllUser"] = "SYS_SDM_USER_SHOWALL";

//show Permission Group
//Sysytem default: SYS_SDM_PERMISSION_VIEWOTHER
//$SDMAccessControlAPIRequestPermission["showALLPermissionofGroup"] = "SYS_SDM_PERMISSION_VIEWOTHER";
?>