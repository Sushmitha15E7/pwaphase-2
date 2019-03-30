var para;
var paravalue;
var query=window.location.search.substring(1).split("?");
for(var i in query){
  para=query[i].split("=");
  paravalue=parseInt(para[1]);
}

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
// window.open("index.html");
open.onerror=function(error){
  console.log("error is created");
}
open.onsuccess=function(e){
  // console.log(data);
  // personalinfo(data.target.result);
  request=e.target.result;
  var transaction=request.transaction("formdata","readwrite");
  store=transaction.objectStore("formdata");
  var info=store.get(paravalue);
  info.onsuccess=function(data){
    console.log(data);
    personalinfo(data.target.result);
  }
}
var left=document.querySelector(".left");
var right=document.querySelector(".right");
function personalinfo(pi) {
  var image=document.createElement("img");
  image.src="images/i.png";
  image.alt=pi.name;
  left.append(image);
  var n=document.createElement("h1");
  n.textContent=pi.name;
  left.append(n);
  var m=document.createElement("h1");
  m.textContent=pi.mobile;
  left.append(m);
  var e=document.createElement("h1");
  e.textContent=pi.emailid;
  left.append(e);
  var a=document.createElement("h1");
  a.textContent=pi.address;
  left.append(a);
  // career
  var h=document.createElement("h1");
  h.textContent="Career";
  right.append(h);
  var hr=document.createElement("hr")
  right.append(hr);
  var h7=document.createElement("h4");
  h7.textContent=pi.career;
  right.append(h7);
  // edu details
  var h8=document.createElement("h2");
  h8.textContent="Education details";
  right.append(h8);
  var hr=document.createElement("hr");
  right.append(hr);
  var tb=document.createElement("table");
  var tr1="<tr><th>institute</th><th>branch</th><th>per</th><th>year</th></tr>";
  var tr2=" ";
  for(var i in pi.education)
  {
    tr2=tr2+"<tr><td>"+pi.education[i].institute+"</td><td>"+pi.education[i].branch+"</td><td>"+pi.education[i].per+"</td><td>"+pi.education[i].year+"</td></tr>";
  }
  tb.innerHTML=tr1+tr2;
  right.append(tb);
  // skills
  var h9=document.createElement("h2");
  h9.textContent="Skills";
  right.append(h9);
  var hr=document.createElement("hr");
  right.append(hr);
  var ul=document.createElement("p");
  ul.textContent=pi.skills;
right.append(ul);

}
