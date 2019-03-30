var idb=window.indexedDB || window.mozIndexedDB ||window.msIndexedDB ||window.webkitIndexedDB ;
if(!idb in window){
  console.log("indexedDB is not supported");
}
// indexed db creation
var request;
var store;
var open=idb.open("storeData",1);
console.log("IndexedDb is created");
open.onupgradeneeded=function (e){
request= e.target.result;
store=request.createObjectStore("formdata",{keyPath:"id",autoIncrement:true});
// request createObjectStore
console.log("store is created");
}
open.onerror=function(error){
  console.log("error is created");
}
open.onsuccess=function(e){
  request=e.target.result;
  var transaction=request.transaction("formdata","readwrite");
  store=transaction.objectStore("formdata");
  var info=store.getAll();
  info.onsuccess=function(data){
    console.log(data.target.result);
    display(data.target.result);
  }

}
var parent=document.querySelector(".parent");
function display(d){
  for(var i=0;i<d.length;i++){
    var child=document.createElement("div");
    child.classList.add("child");
    var image=document.createElement("img");
    image.src="images/i.png";
    image.alt=d[i].name;
    var name=document.createElement("h2");
    name.textContent=d[i].name;
    var link=document.createElement("a");
    link.classList.add("link");
    link.href="resume.html?id="+d[i].id;
    // link.href="resume.html";
    link.textContent="view profile";
      child.append(image);
      child.append(name);

      parent.append(child);
      var mobile=document.createElement("h2");
      mobile.textContent=d[i].mobile;
      child.append(mobile);
      var emailid=document.createElement("h2");
      emailid.textContent=d[i].emailid;
      child.append(emailid);
      var address=document.createElement("h2");
      address.textContent=d[i].address;
      child.append(address);
        child.append(link);

  }
}
