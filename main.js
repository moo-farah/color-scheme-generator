fetch("https://www.thecolorapi.com/scheme?hex=FF0&mode=monochrome&count=5")
 .then(res => res.json())
 .then(data => console.log(data))