var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var dataCol = document.getElementById("dataCol");
var dataList = [];
if (localStorage.getItem("information")) {
  dataList = JSON.parse(localStorage.getItem("information"));
  display();
}

function submit() {
  if (nameValidation() & emailValidation()) {
    var dataObj = {
      id : Date.now(),
      siteN: siteName.value,
      siteU: siteUrl.value,
    };

    dataList.push(dataObj);
    localStorage.setItem("information", JSON.stringify(dataList));
    clear();
    display();
  }
}

function display() {
  var box = `  <tr>
                        <th scope="col">index</th>
                        <th scope="col">Website Name</th>
                        <th scope="col">Visit</th>
                        <th scope="col">Delete</th>
                    </tr>`;
  for (var i = 0; i < dataList.length; i++) {
    box += ` <tr>
               <th scope="row">${i+1}</th>
                <td>${dataList[i].siteN}</td>
                 <td><a href="${dataList[i].siteU}" target="_blank"><button type="button" class="btn btn-success"><span class="mx-1"><i class="fa-solid fa-eye"></i></span>Visit</button></a></td>
                <td> <button type="button" class="btn btn-danger" onclick="deleteObj(${dataList[i].id})"><span class="mx-1"><i class="fa-solid fa-trash-can"></i></span>Delete</button></td>
            </tr>`;
    dataCol.innerHTML = box ;
  }
}

function deleteObj(id) {
  // dataList.splice(index,1);
  dataList = dataList.filter(function(ele){return ele.id !== id});
  localStorage.setItem("information", JSON.stringify(dataList));
  display();
}

function clear() {
  siteName.value = null;
  siteUrl.value = null;
}

function nameValidation() {
  var Regex = /^[A-Za-z]{3,}$/gim;
  if (Regex.test(siteName.value)) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    return true;
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    return false;
  }
}

function emailValidation() {
  var Regex =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/gim;
  if (Regex.test(siteUrl.value)) {
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    return true;
  } else {
    siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
    return false;
  }
}
