const wrapper = document.querySelector(".wrapper"),
form = document.querySelector("form"),
fileInp = form.querySelector("input"),
infoText = form.querySelector("p"),
closeBtn = document.querySelector(".close"),
copyBtn = document.querySelector(".copy")


function fetchRequest(formData, file) {
    infoText.innerText = "Escaneando QR Code..."
    /* sending post request to qr server api with passing 
    form data as body and getting response from it */
    fetch("https://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data
        infoText.innerText = result ? "Carregue seu QR Code para leitura" : "Não foi possível ler o seu QR Code"
        if(!result) return
        document.querySelector("textarea").innerText = result
        form.querySelector("img").src = URL.createObjectURL(file)
        wrapper.classList.add("active")
    }).catch(() => {
        infoText.innerText = "Não foi possível ler o seu QR Code"
    })
}

fileInp.addEventListener("change", async e => {
    let file = e.target.files[0] // getting user selected files
    if(!file) return
    let formData = new FormData() // creatind a new FormData object
    formData.append("file", file) // adding selected file to formData
    fetchRequest(formData, file)
})

copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent
    navigator.clipboard.writeText(text)
})

form.addEventListener("click", () => fileInp.click())
closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("active")
    // document.location.reload() Comando para recarregar a página
})