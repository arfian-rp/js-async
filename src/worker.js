addEventListener("message", (e) => {
  for (let i = 0; i < e.data; i++) {
    postMessage(i);
  }
});
