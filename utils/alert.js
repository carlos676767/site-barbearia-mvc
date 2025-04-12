function Alert(text, id, idText) {
  const div = document.getElementById(id)
  const textValue = document.getElementById(idText)


  textValue.innerText = text

  div.classList.remove(`hidden`)

  setTimeout(() => {
    div.classList.add(`hidden`)
  }, 3000);
}




