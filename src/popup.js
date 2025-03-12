document.addEventListener("DOMContentLoaded", function () {
  const treeInput = document.getElementById("tree");
  const ticketIdInput = document.getElementById("ticket-id");
  const saveButton = document.getElementById("save-btn");
  const tableBody = document.querySelector("tbody");

  // Load saved values from Chrome storage and add them to the table
  chrome.storage.sync.get("stub_tree_list", function (data) {
    if (data.stub_tree_list) {
      data.stub_tree_list.forEach((value) => {
        addToTable(value);
      });
    }
  });

  // Save the input values to Chrome storage and add them to the table
  saveButton.addEventListener("click", function () {
    const treeValue = treeInput.value;
    const ticketLink = ticketIdInput.value;
    if (treeValue && ticketLink) {
      chrome.storage.sync.get("stub_tree_list", function (data) {
        const stub_tree_list = data.stub_tree_list || [];
        const newValue = { tree: treeValue, ticketId: ticketLink };
        stub_tree_list.push(newValue);
        chrome.storage.sync.set(
          { stub_tree_list: stub_tree_list },
          function () {
            addToTable(newValue);
            treeInput.value = ""; // Clear the input fields
            ticketIdInput.value = "";
          }
        );
      });
    }
  });

  // Function to add a value to the table
  function addToTable(value) {
    const row = document.createElement("tr");
    const treeCell = document.createElement("td");
    const ticketIdCell = document.createElement("td");
    const deleteButtonCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    const ticketLink = document.createElement("a");
    ticketLink.href = value.ticketId;
    ticketLink.target = "_blank";
    let ticketId=value.ticketId.split('/');
    ticketLink.textContent = ticketId[ticketId.length-1];
    ticketLink.style.textDecoration = "none";
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButtonCell.appendChild(deleteButton);
    treeCell.textContent = value.tree;
    ticketIdCell.appendChild(ticketLink);
    row.appendChild(ticketIdCell);
    row.appendChild(treeCell);
    row.appendChild(deleteButtonCell);
    console.log("Created link:", ticketLink.href);
    deleteButton.addEventListener("click", function () {
      chrome.storage.sync.get("stub_tree_list", function (data) {
        const stub_tree_list = data.stub_tree_list || [];
        const index = stub_tree_list.findIndex(
          (v) => v.tree === value.tree && v.ticketId === value.ticketId
        );
        if (index !== -1) {
          stub_tree_list.splice(index, 1);
          chrome.storage.sync.set(
            { stub_tree_list: stub_tree_list },
            function () {
              row.remove();
            }
          );
        }
      });
    });
    tableBody.appendChild(row);
  }
});
