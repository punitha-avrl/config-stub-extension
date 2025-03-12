chrome.runtime.onInstalled.addListener(() => {
  // Create an alarm that triggers every 15 minutes
  chrome.alarms.create("popupAlarm", { periodInMinutes: 15 });
  chrome.alarms.create("showTableAlarm", { periodInMinutes: 15 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "popupAlarm") {
    // Retrieve saved values from Chrome storage
    chrome.storage.sync.get("stub_tree_list", (data) => {
      if (data.stub_tree_list && data.stub_tree_list.length > 0) {
        const treeValues = data.stub_tree_list
          .map((value) => value.tree)
          .join(", ");
        const notificationOptions = {
          type: "basic",
          iconUrl: "assets/letter-c.png",
          title: "Trees in stub Config",
          message: `Trees: ${treeValues}`,
        };
        // const notificationId = `popupNotification_${Date.now()}`;
        // chrome.notifications.create(notificationId, notificationOptions);
        const notificationId = "popupNotification_";
        chrome.notifications.clear("popupNotification_", function () {
          chrome.notifications.create(notificationId, notificationOptions);
        });
      }
    });
  } else if (alarm.name === "showTableAlarm") {
    // Send a message to the content script to create and display the table
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log("tabs", tabs[0].id);
      if (tabs[0].id) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "showTable" },
          (response) => {
            if (chrome.runtime.lastError) {
              console.log(chrome.runtime.lastError.message);
            }
          }
        );
      } else {
        console.log("No active tab found.");
      }
    });
  }
});

