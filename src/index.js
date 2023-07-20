const wrapper = document.querySelector(".wrapper");
const form = document.querySelectorAll("form");
const fileInp = document.querySelectorAll("input");
const infoText = document.querySelectorAll("p");
const closeBtn = document.querySelectorAll(".close");
const copyBtn = document.querySelectorAll(".copy");


// Fecth Data From Api

function fetchRequest(file, formData){
    infoText.innerText = "Scanning QR Code...";
    fetch("http://api.qrserver.com/v1/read-qr-code/",{
        method: 'POST', body: formData
    }).then(res=> res.json()).then(result =>{
        result =[0].symbol[0].data;
        inforText.innerText = result ? "Upload QR Code To Scan" : "Couldn't Scan QR Code";
        if (!result) return;
        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
            }).catch(() =>{
                infoText.innerText = "Couldn't Scan QR Code...";
            })
}


// Enviar arquivo de código QR com solicitação para API
fileInp.addEventListener("change", async e =>{
    let file = e.target.files[0];
    if (!file) return;
    let formData = new FormData();
    formData.append('file', file);
    fetchRequest(file, formData);
});

//Copy Text to ClipBoard
copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});
