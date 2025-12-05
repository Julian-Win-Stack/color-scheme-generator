const colorBtn = document.getElementById('color-btn')
const colorBox = document.querySelectorAll('.color-box')
const colorCode = document.querySelectorAll('.color-codes')



colorBtn.addEventListener('click', function(){
    const colorPick = document.getElementById('color-pick').value
    const colorScheme = document.getElementById('color-scheme').value
    generate(colorPick,colorScheme)
    .then(hex => {
        hex.forEach((color,index)=>{
            colorBox[index].style.backgroundColor = color
            colorBox[index].textContent = 'Click the block to copy the code!'
            colorCode[index].innerHTML = `${color}<br><p>Click here to copy the color hex code!</p>`
            colorCode[index].dataset.hex = color
        })
        
    })

   
})

colorBox.forEach((cBox,index)=>{
    const cCode = colorCode[index] 

    function handleClick(){
        timer("Copied to clipboard!")
        navigator.clipboard.writeText(colorCode[index].dataset.hex)
    }

    cBox.addEventListener('click',handleClick)
    cCode.addEventListener('click',handleClick)
})




function generate (pick,scheme){
     return fetch(`https://www.thecolorapi.com/scheme?hex=${pick.slice(1)}&mode=${scheme}&count=5`)
    .then(res => res.json())
    .then(data => data.colors.map(color => color.hex.value))
}

function timer(message){
    const copyMessage = document.getElementById('copy-message')
    copyMessage.textContent = message
    copyMessage.style.opacity = '1'
    setTimeout(() => {
        copyMessage.style.opacity = '0'
    }, 1500);
}


