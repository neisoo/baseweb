var assessmentNotification = {
	init: function init() {
		this.getNumberOfNotification();
	},

	getNumberOfNotification: function getNumberOfNotification() {
		var apiEndPoint = 'user_get_notifications';
		var apiParams = new Object();
		apiParams.arguments = '[["parent_homepage"]]';
		// Making the API call 
		ApiService.call(apiEndPoint, apiParams, function(respond){
			if(respond.success !== "FALSE"){
				this.createNotification(formatResponse(respond.payload));
			}
		}.bind(this));
	},

	assessmentNotificationIsActive: function assessmentNotificationIsActive() {
		return true;
	},

	createNotification: function createNotification(notificationData) {
		this.removeNotification();
		var numberOfNotification = 0;
		if (notificationData.totalNotifications != null && Number.isInteger(notificationData.totalNotifications)) {
			numberOfNotification = notificationData.totalNotifications;
		}
		if (numberOfNotification > 0) {
			this.createNotificationBadgeOnShell(numberOfNotification);
			this.createNotificationBadgeOnList(notificationData);
		} else {
			this.removeNotification();
			return;
		}
	},

	createNotificationBadgeOnShell: function createNotificationBadgeOnShell(numberOfNotification) {
		var btnShellOptions = document.getElementById('btn-shell-options');
		if (btnShellOptions && Number.isInteger(numberOfNotification) && numberOfNotification>0) {
			var shellOptionAssessmentNotificationBadge = document.createElement('div');
			shellOptionAssessmentNotificationBadge.id = 'shellOptionAssessmentNotificationBadge';
			
			if (numberOfNotification > 99) {
				shellOptionAssessmentNotificationBadge.style.width = '30px';
				shellOptionAssessmentNotificationBadge.innerHTML = '99+';
			} else if (numberOfNotification > 9) {
				shellOptionAssessmentNotificationBadge.style.width = '24px';
				shellOptionAssessmentNotificationBadge.innerHTML = numberOfNotification;
			} else {
				shellOptionAssessmentNotificationBadge.innerHTML = numberOfNotification;
			}
			btnShellOptions.appendChild(shellOptionAssessmentNotificationBadge);
		}
		return;
	},

	createNotificationBadgeOnList: function createNotificationBadgeOnList(notificationData) {
		var btnAssessments = document.getElementById('btn-assessments');
		var btnParentSection = document.getElementById('btn-parents');
		var assessmentNotificationCount = notificationData.assessments.notification_ids !== null
		  ? notificationData.assessments.notification_ids.length
		  : 0;
		var subscriptionNotificationCount = typeof notificationData.parent_homepage !== 'undefined'
		  ? notificationData.parent_homepage.total_notifications
		  : 0;

		createBadgeFor(btnAssessments, assessmentNotificationCount, 'shellAssessmentNotificationBadge');
		createBadgeFor(btnParentSection, subscriptionNotificationCount, 'parentNotificationBadge');
		return;
	},

	removeNotification: function removeNotification() {
		this.removeDiv('shellOptionAssessmentNotificationBadge');
		this.removeDiv('shellAssessmentNotificationBadge');
		this.removeDiv('parentNotificationBadge');
		return;
	},

	refreshNotification: function refreshNotification() {
		this.createNotification();
		return;
	},

	removeDiv: function removeDiv(divID) {
		var targetDiv = document.getElementById(divID);
		if (targetDiv) {
			targetDiv.parentNode.removeChild(targetDiv);
		}
		return;
	}
};

Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};

function formatResponse(data) {
  var res = {};
  for (var key in data) {
    res[key] = data[key];
  }
  res.totalNotifications = data.total_notifications;
  return res;
}

function createBadgeFor(HTMLElement, count, id) {
		if (!Number.isInteger(count) || HTMLElement === null) {
		    return;
		}
		if (count >0) {
			var shellAssessmentNotificationBadge = document.createElement('div');
			shellAssessmentNotificationBadge.id = id;
			
			if (count > 99) {
				shellAssessmentNotificationBadge.style.width = '30px';
				shellAssessmentNotificationBadge.innerHTML = '99+';
			} else if (count > 9) {
				shellAssessmentNotificationBadge.style.width = '24px';
				shellAssessmentNotificationBadge.innerHTML = count;
			} else {
				shellAssessmentNotificationBadge.innerHTML = count;
			}
			HTMLElement.appendChild(shellAssessmentNotificationBadge);
    }
  return HTMLElement;
}

// Adding function to the global listener to allow angular iframe message services to call this function - iframeMsg.broadcast()
window.updateAssessmentNotifcations = function(inValue) {
	assessmentNotification.createNotification(inValue);
};
