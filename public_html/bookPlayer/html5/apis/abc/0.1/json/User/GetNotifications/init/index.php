<?php
header('Content-type: application/json');
$json = '{
	"success": "TRUE",
	"payload": {
		"parent_homepage": {
			"total_notifications": 0
		},
		"assessments": {
			"notification_ids": null,
			"notification_info": null,
			"assessment_info": null,
			"assessment_group_info": null,
			"user_info": null
		},
		"total_notifications": 0
	}
}'
echo $json;
?>