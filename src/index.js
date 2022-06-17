//synchronous/blocking(menunggu tiap proses selesai, baru proses selanjutnya dikerjakan) => baris selanjutnya akan dieksekusi setelah baris sebelumnya selesai dikerjakan
//asynchronous/nonblocking => tanpa menunggu baris sebelumnya

//ASYNC METHOD
console.info("\nASYNC METHOD");
setTimeout(() => {
  const header = document.createElement("h3");
  header.textContent = "Arfian";
  document.getElementById("header").append(header);
}, 1000);
setInterval(() => {
  const header = document.getElementById("header");
  header.textContent = new Date().toString();
}, 1000);

//AJAX
console.info("\nAJAX");
const ajax = new XMLHttpRequest();
ajax.open("get", "api/data.json");
ajax.onload = () => {
  if (ajax.status === 200) {
    // console.info(JSON.parse(ajax.responseText));
  } else console.info("error");
};
ajax.onreadystatechange = () => {
  /**
   * 0=>unsent              client has been created. open() not called yet
   * 1=>opened              open() has been called.
   * 2=>headers_received    send() has been called, and headers and status are available.
   * 3=>loading             downloading; responsetext holds partial data.
   * 4=>done                the operation is complete.
   */
  //   console.info("ready state change " + ajax.readyState);
};
ajax.send();
// function loadDoc() {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//           document.getElementById("demo").innerHTML =
//           this.responseText;
//      }
//   };
//   xhttp.open("GET", "ajax_info.txt", true);
//   xhttp.send();
// }

//MENGIRIM DATA DENGAN AJAX
console.info("\nMENGIRIM DATA DENGAN AJAX");
document.forms["login"].onsubmit = (e) => {
  e.preventDefault();

  const ajax = new XMLHttpRequest();
  const param = new URLSearchParams();
  param.append("search", document.forms["login"]["search"].value);
  ajax.open("post", "https://hookb.in/OekqMenpyBfqOdYYxeYZ/?" + param.toString());
  ajax.onload = () => {
    console.info(ajax.responseText);
  };
  //   ajax.setRequestHeader("Content-Type", "application/json");
  //   ajax.send(
  //     JSON.stringify({
  //       username: document.forms["login"]["username"].value,
  //       password: document.forms["login"]["password"].value,
  //     })
  //   );
  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  const form = new FormData();
  form.append("username", document.forms["login"]["username"].value);
  form.append("password", document.forms["login"]["password"].value);
  form.append("profile", document.forms["login"]["profile"].files.item(0));
  //   ajax.send(form);
};

//PROMISE
console.info("\nPROMISE");
const promise = (kondisi, time = 1000) => {
  return new Promise((resolve, reject) => {
    if (kondisi) setTimeout(() => resolve(kondisi), time);
    else reject("error");
  });
};
promise(1 == "1")
  .then((r) => console.info("true " + r))
  .catch((e) => console.info("false " + e))
  .finally(() => console.info("selesai"));
//staticMethod
const response = Promise.any([promise(1 == "2", 1000), promise(1 == "1", 2000), promise(2 === "2", 500)]);
// Promise.all() digunakan untuk mengeksekusi beberapa promise sekaligus dan menunggu semua hasil promise nya
// Promise.any() digunakan untuk mengeksekusi beberapa promise sekaligus dan mengambil hasil promise paling cepat
response
  .then((r) => console.info("true " + r))
  .catch((e) => console.info("false " + e))
  .finally(() => console.info("selesai"));

//FETCH
console.info("\nFETCH");
const request = new Request("https://hookb.in/OekqMenpyBfqOdYYxeYZ", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    name: "diky",
  }),
});
fetch(request)
  .then((r) => r.json())
  .then((r) => console.info(r))
  .catch((e) => console.info(e.message));
fetch("https://hookb.in/OekqMenpyBfqOdYYxeYZ", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    name: "diky",
  }),
})
  .then((r) => r.json())
  .then((r) => console.info(r))
  .catch((e) => console.info(e.message));

//ASYNC AWAIT
setTimeout(async () => {
  console.info("\nASYNC AWAIT");
  //error handler
  try {
    const hasil = await promise(7 == 7, 1000);
    console.info(hasil);
  } catch (e) {
    console.info(e);
  }
  console.info("start");
}, 2000);

//WEB WORKER
console.info("\nWEB WORKER");
// function showLog(total) {
//   for (let i = 0; i < total; i++) {
//     console.info(i);
//   }
// }
// document.getElementById("btnTask").onclick = () => {
//   console.info("start log");
//   showLog(100000);
//   console.info("end log");
// };
const worker = new Worker("src/worker.js");
worker.addEventListener("message", (m) => {
  console.info(m.data);
});
document.getElementById("btnTask").onclick = () => {
  worker.postMessage(100000);
};
