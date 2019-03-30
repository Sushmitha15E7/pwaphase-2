function submitData(){
  var career=document.querySelector("#career").value;
  var name=document.querySelector("#name").value;
  var mobile=document.querySelector("#mobile").value;
  var emailid=document.querySelector("#emailid").value;
  var address=document.querySelector("#address").value;
  var ginstitute=document.querySelector("#ginstitute").value;
  var gbranch=document.querySelector("#gbranch").value;
  var gyear=document.querySelector("#gyear").value;
  var gper=document.querySelector("#gper").value;
  var iinstitute=document.querySelector("#iinstitute").value;
  var ibranch=document.querySelector("#ibranch").value;
  var iyear=document.querySelector("#iyear").value;
  var iper=document.querySelector("#iper").value;
  var sinstitute=document.querySelector("#sinstitute").value;
  var syear=document.querySelector("#syear").value;
  var sper=document.querySelector("#sper").value;
  var skills=document.querySelector("#skills").value;
  // indexed db implementation
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
  window.open("index.html");
  open.onerror=function(error){
    console.log("error is created");
  }
  open.onsuccess=function(e){
    request=e.target.result;
    var transaction=request.transaction("formdata","readwrite");
    store=transaction.objectStore("formdata");
    store.put({
      career:career,
      name:name,
      mobile:mobile,
      emailid:emailid,
      address:address,
      education:[
        {
          institute:ginstitute,
          branch:gbranch,
          year:gyear,
          per:gper
        },
        {
          institute:iinstitute,
          branch:ibranch,
          year:iyear,
          per:iper
        },
        {
          institute:sinstitute,
          year:syear,
          per:sper
        }
      ],
        skills:skills
    });
  }
  }
