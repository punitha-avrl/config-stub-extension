// Function to create and populate the table
function createTable(data) {
  // Create table elements
  const table = document.createElement("table");
  table.id = "stub-treeList-table";
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const headerRow = document.createElement("tr");

  // Create table headers
  const headers = ["Ticket-id", "Trees in Stub Config"];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    th.style.border = "1px solid black";
    th.style.backgroundColor = "lightgray";
    th.style.fontWeight = "bold";
    th.style.whiteSpace = "nowrap";
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Populate table rows with data
  data.forEach((item) => {
    const row = document.createElement("tr");
    const treeCell = document.createElement("td");
    const ticketIdCell = document.createElement("td");
    const ticketLink= document.createElement("a");
    ticketLink.href = item.ticketId;
    ticketLink.target = "_blank";
    let temp = item.ticketId.split('/');
    ticketLink.textContent = temp[temp.length-1];
    ticketLink.style.textDecoration = "none";
    console.log("Created link:", ticketLink.href);
    treeCell.textContent = item.tree;
    treeCell.style.border = "1px solid black";
    ticketIdCell.style.border = "1px solid black";
    ticketIdCell.appendChild(ticketLink);
    row.appendChild(ticketIdCell);
    row.appendChild(treeCell);
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);

  // Style the table
  table.style.position = "fixed";
  table.style.top = "10px";
  table.style.right = "10px";
  table.style.boxShadow= "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px";
  table.style.backgroundColor = "white";
  table.style.zIndex = "1000";
  table.style.width = "300px";
  table.style.maxHeight = "200px";
  table.style.overflowY = "auto";

  const closeButton = document.createElement("button");
  closeButton.classList.add("btn", "btn-danger");
  closeButton.textContent = "×";
  closeButton.style.position = "fixed";
  closeButton.style.top = "5px";
  closeButton.style.right = "5px";
  closeButton.style.backgroundColor = "transparent";
  closeButton.style.color = "black";
  closeButton.style.border = "none";
  closeButton.style.cursor = "pointer";
  closeButton.style.fontSize = "30px";
  closeButton.style.zIndex = "1001";

  // Add close button functionality
  closeButton.addEventListener("click", () => {
    document.body.removeChild(table);
    document.body.removeChild(closeButton);
  });
  // Append the table to the body
  document.body.appendChild(table);
  document.body.appendChild(closeButton);
}

// Retrieve saved values from Chrome storage and create the table
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showTable") {
    chrome.storage.sync.get("stub_tree_list", function (data) {
      if (
        data.stub_tree_list &&
        data.stub_tree_list.length > 0 &&
        !document.getElementById("stub-treeList-table")
      ) {
        createTable(data.stub_tree_list);
      }
      else if( data.stub_tree_list &&
        data.stub_tree_list.length > 0 && document.getElementById("stub-treeList-table")){
        document.body.removeChild(document.getElementById("stub-treeList-table"));
        document.body.removeChild(document.querySelector(".btn-danger"));
        createTable(data.stub_tree_list);
      }
    });
  }
});



const supergen_eng=["amannagle@avrl.io","kartikkoul@avrl.io","rishabh@avrl.io","rohit@avrl.io","shivani@avrl.io","vardhaman@avrl.io"]

const supergen_eng_ele=document.createElement("div");
const table=document.createElement("table");
const tbody=document.createElement("tbody");
supergen_eng.forEach((value)=>{
    const row=document.createElement("tr");
    const cell=document.createElement("td");
    cell.textContent=value;
    row.appendChild(cell);
    tbody.appendChild(row);
});
table.appendChild(tbody);
supergen_eng_ele.appendChild(table);
// Add the created div to the body

    if(location.href=="https://delhi.fir3bo1t.com/approvals"){
document.body.appendChild(supergen_eng_ele);}