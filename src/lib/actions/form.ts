export const enhance = (form: HTMLFormElement, {result}) => {

  const handleSubmit = async (event: Event) => {
    event.preventDefault()

    try {
      const body = new FormData(form)
      const res = await fetch(form.action, {
        method: form.method,
        headers: {
          accept: "application/json"
        },
        body
      })

      if (res.ok) {
        result(res, form)
      } else {
        console.log("ERROR ", await res.text());
        
      }

    } catch (error) {
      console.log('Could not submit: ', error);    
    }
  }
  

  form.addEventListener("submit", handleSubmit)

  return {
    destroy() {
      form.removeEventListener("submit", handleSubmit)
    }
  }
}