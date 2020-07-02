function show() {
    const text = document.getElementById("my-input").value;
    document.getElementById("show").innerText = text;
  }
  
  function add() {
    const newValue = parseInt(document.getElementById("my-input2").value);
    const showElement = document.getElementById("show-sum");
    const oldValue = parseInt(showElement.innerText) || 0;
  
    if (!isNaN(newValue)) {
      showElement.innerText = newValue + oldValue;
    }
  }
  
  function addTwo() {
    const a = parseInt(document.getElementById("sum-a").value);
    const b = parseInt(document.getElementById("sum-b").value);
    const showElement = document.getElementById("result");
  
    if (!isNaN(a) && !isNaN(b)) {
      showElement.innerText = a + b;
    }
  }